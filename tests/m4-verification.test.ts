/**
 * Milestone 4 Verification Test Suite:
 * Visual Asset & Media Gallery Distribution
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import dotenv from 'dotenv';
import { parseHeroSlidesJson, getFallbackHeroSlides, DEFAULT_HERO_SLIDES, HeroSlide } from '../src/lib/visual-assets';
import { reorderGalleryImages, assertValidGallery } from '../src/lib/gallery';
import { assertValidImageUrl } from '../src/lib/validation';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const require = createRequire(import.meta.url);
const nextHeaders = require('next/headers');

// Mock cookie store returning no session token (simulating unauthenticated request)
const mockCookieStore = {
  get: () => undefined,
  getAll: () => [],
  set: () => {},
  delete: () => {},
  has: () => false,
};

nextHeaders.cookies = async () => mockCookieStore;

describe('Milestone 4 Verification: Visual Asset & Media Gallery Distribution', () => {
  it('Test 1: TourForm.tsx contains comprehensive Media Gallery UI and FormData serialization', () => {
    const tourFormCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/TourForm.tsx'), 'utf8');

    // Gallery state and handlers
    assert.ok(tourFormCode.includes('images'), 'TourForm must maintain images state');
    assert.ok(tourFormCode.includes('addGalleryImage'), 'TourForm must have addGalleryImage handler');
    assert.ok(tourFormCode.includes('removeGalleryImage'), 'TourForm must have removeGalleryImage handler');
    assert.ok(tourFormCode.includes('moveGalleryImage'), 'TourForm must have moveGalleryImage handler');
    assert.ok(tourFormCode.includes('reorderGalleryImages'), 'TourForm must use reorderGalleryImages utility');

    // Serialization
    assert.ok(tourFormCode.includes('name="images"'), 'TourForm must include hidden images input');
    assert.ok(tourFormCode.includes("formData.set('images', JSON.stringify(images))"), 'TourForm must serialize images in handleSubmit');

    // UI presentation
    assert.ok(tourFormCode.includes('Galería de Fotos del Tour'), 'TourForm must have Gallery Section header');
    assert.ok(tourFormCode.includes('<img'), 'TourForm must render thumbnail preview');
    assert.ok(tourFormCode.includes('Agregar Foto'), 'TourForm must have button to add photo');
  });

  it('Test 2: Tour actions parse, validate, and persist images TEXT[]', async () => {
    const actionsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/actions.ts'), 'utf8');

    // Inspection of parseTourFormData
    assert.ok(actionsCode.includes("formData.get('images')"), 'actions.ts must parse images from formData');
    assert.ok(actionsCode.includes('JSON.parse(rawImages)'), 'actions.ts must safely parse rawImages JSON');
    assert.ok(actionsCode.includes('images,'), 'actions.ts must return images in tourData object');

    // Image URL validation
    assert.ok(actionsCode.includes('validateImageUrl'), 'actions.ts must validate image URLs');
    assert.ok(actionsCode.includes('for (const imgUrl of tourData.images)'), 'actions.ts must validate each gallery image');

    // Dynamic import to test unauthenticated rejection
    const { createTour, updateTour } = await import('../src/app/admin/tours/actions');
    const dummyFormData = new FormData();
    dummyFormData.set('title', 'Unauthorized Test Tour');
    dummyFormData.set('slug', 'unauth-test-tour');
    dummyFormData.set('images', JSON.stringify(['https://images.unsplash.com/test-1']));

    await assert.rejects(
      async () => {
        await createTour(dummyFormData);
      },
      (err: any) => err.message === 'Unauthorized',
      'createTour must enforce auth guard'
    );

    await assert.rejects(
      async () => {
        await updateTour('test-id', dummyFormData);
      },
      (err: any) => err.message === 'Unauthorized',
      'updateTour must enforce auth guard'
    );
  });

  it('Test 3: HeroSlidesManager provides dedicated Hero Slider CMS per brand', () => {
    const heroSlidesManagerCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/HeroSlidesManager.tsx'), 'utf8');

    // Brand context and state
    assert.ok(heroSlidesManagerCode.includes('activeBrand'), 'HeroSlidesManager must accept activeBrand prop');
    assert.ok(heroSlidesManagerCode.includes('initialSlides'), 'HeroSlidesManager must accept initialSlides prop');
    assert.ok(heroSlidesManagerCode.includes('DEFAULT_HERO_SLIDES'), 'HeroSlidesManager must support fallback defaults');

    // Handlers
    assert.ok(heroSlidesManagerCode.includes('addSlide'), 'HeroSlidesManager must have addSlide handler');
    assert.ok(heroSlidesManagerCode.includes('removeSlide'), 'HeroSlidesManager must have removeSlide handler');
    assert.ok(heroSlidesManagerCode.includes('moveSlide'), 'HeroSlidesManager must have moveSlide handler');
    assert.ok(heroSlidesManagerCode.includes('resetToDefaults'), 'HeroSlidesManager must have resetToDefaults handler');
    assert.ok(heroSlidesManagerCode.includes('handleSave'), 'HeroSlidesManager must have handleSave handler');

    // UI elements
    assert.ok(heroSlidesManagerCode.includes('Banners Principales (Hero Slider)'), 'HeroSlidesManager must render title');
    assert.ok(heroSlidesManagerCode.includes('Vista Previa'), 'HeroSlidesManager must render live preview');
  });

  it('Test 4: Settings actions enforce session auth guard and safe upsert for home_hero_slides', async () => {
    const settingsActionsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/settings/actions.ts'), 'utf8');

    // Upsert on conflict tenant,key
    assert.ok(settingsActionsCode.includes("onConflict: 'tenant,key'"), 'settings actions must upsert onConflict tenant,key');
    assert.ok(settingsActionsCode.includes('home_hero_slides'), 'settings actions must handle home_hero_slides key');
    assert.ok(settingsActionsCode.includes('parseHeroSlidesJson'), 'settings actions must validate slides JSON schema');

    // Dynamic import to test auth guards
    const { updateHeroSlides, saveHeroSlidesDirect, updateSettings } = await import('../src/app/admin/settings/actions');

    const testFormData = new FormData();
    testFormData.set('tenant', 'mta');
    testFormData.set('home_hero_slides', JSON.stringify(DEFAULT_HERO_SLIDES.mta));

    await assert.rejects(
      async () => {
        await updateHeroSlides(testFormData);
      },
      (err: any) => err.message === 'Unauthorized',
      'updateHeroSlides must throw Unauthorized when unauthenticated'
    );

    await assert.rejects(
      async () => {
        await saveHeroSlidesDirect('mta', DEFAULT_HERO_SLIDES.mta);
      },
      (err: any) => err.message === 'Unauthorized',
      'saveHeroSlidesDirect must throw Unauthorized when unauthenticated'
    );

    await assert.rejects(
      async () => {
        await updateSettings(testFormData);
      },
      (err: any) => err.message === 'Unauthorized',
      'updateSettings must throw Unauthorized when unauthenticated'
    );
  });

  it('Test 5: Public homepage, Hero, and HeroSlider dynamically consume brand hero slides', () => {
    // 1. Public page.tsx inspection
    const pageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/[locale]/(public)/page.tsx'), 'utf8');
    assert.ok(pageCode.includes("eq('key', 'home_hero_slides')"), 'page.tsx must query home_hero_slides setting');
    assert.ok(pageCode.includes("eq('tenant', brand.id)"), 'page.tsx must filter hero slides by active brand tenant');
    assert.ok(pageCode.includes('parseHeroSlidesJson'), 'page.tsx must parse slides using visual assets parser');
    assert.ok(pageCode.includes('getFallbackHeroSlides'), 'page.tsx must fall back to brand default slides');
    assert.ok(pageCode.includes('<Hero slides={heroSlides} />'), 'page.tsx must pass slides to Hero component');

    // 2. Hero.tsx inspection
    const heroCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/home/Hero.tsx'), 'utf8');
    assert.ok(heroCode.includes('HeroProps'), 'Hero.tsx must define HeroProps');
    assert.ok(heroCode.includes('slides?: HeroSlide[]'), 'Hero.tsx must accept optional slides prop');
    assert.ok(heroCode.includes('<HeroSlider slides={slides} />'), 'Hero.tsx must forward slides to HeroSlider');

    // 3. HeroSlider.tsx inspection
    const sliderCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/home/HeroSlider.tsx'), 'utf8');
    assert.ok(sliderCode.includes('HeroSliderProps'), 'HeroSlider must define HeroSliderProps');
    assert.ok(sliderCode.includes('hasDynamicSlides'), 'HeroSlider must detect dynamic slides prop');
    assert.ok(sliderCode.includes('slide.title'), 'HeroSlider must render dynamic slide title');
    assert.ok(sliderCode.includes('slide.subtitle'), 'HeroSlider must render dynamic slide subtitle');
    assert.ok(sliderCode.includes('slide.image'), 'HeroSlider must render dynamic slide image');
    assert.ok(sliderCode.includes('slide.cta'), 'HeroSlider must render dynamic CTA button text');
    assert.ok(sliderCode.includes('slide.link'), 'HeroSlider must support dynamic slide link');
  });

  it('Test 6: Gallery and visual assets domain logic and boundary resilience', () => {
    // Reorder gallery images
    const initialImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    const reordered = reorderGalleryImages(initialImages, 2, 0);
    assert.deepStrictEqual(reordered, ['img3.jpg', 'img1.jpg', 'img2.jpg']);
    assertValidGallery(reordered);

    // Reorder out of bounds returns copy without throwing
    const outOfBounds = reorderGalleryImages(initialImages, -1, 5);
    assert.deepStrictEqual(outOfBounds, initialImages);

    // Hero slides JSON parser
    const validJson = JSON.stringify([
      { title: 'Test Slide', image: 'https://images.unsplash.com/test', subtitle: 'Sub', link: '/tours', cta: 'Ver' }
    ]);
    const parsed = parseHeroSlidesJson(validJson);
    assert.strictEqual(parsed.length, 1);
    assert.strictEqual(parsed[0].title, 'Test Slide');

    // Fallback slides
    const mtaFallback = getFallbackHeroSlides('mta');
    const sonqoFallback = getFallbackHeroSlides('sonqo');
    assert.ok(mtaFallback.length > 0);
    assert.ok(sonqoFallback.length > 0);
    assert.notStrictEqual(mtaFallback[0].title, sonqoFallback[0].title, 'MTA and Sonqo fallbacks must be distinct');

    // Image URL validation for remote and local
    assert.doesNotThrow(() => assertValidImageUrl('https://images.unsplash.com/photo-1'));
    assert.doesNotThrow(() => assertValidImageUrl('/tours/cusco/machu-picchu/01.jpg'));
    assert.throws(() => assertValidImageUrl(''), /non-empty string/);
    assert.throws(() => assertValidImageUrl('javascript:alert(1)'), /Invalid URL protocol/);
  });
});
