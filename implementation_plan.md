# 📋 Plan de Implementación — Tours Machu Picchu

> **Objetivo**: Llevar el proyecto al nivel de calidad y funcionalidad de [incarail.com](https://incarail.com/)  
> **Basado en**: Auditoría completa de Ingeniería Senior (Mayo 2026)  
> **Estado**: 🟡 En progreso (Fase M: Optimizaciones Móviles y de Responsividad planificadas)  
> **Progreso detallado**: Ver [task.md](./task.md)

---

## Resumen de Fases

| Fase | Descripción | Estimado | Estado |
|------|-------------|----------|--------|
| **Fase 0** | Bug Fixes Críticos | 2-3 días | ⬜ Pendiente |
| **Fase 1** | Impacto Visual (Homepage) | 1-2 semanas | ⬜ Pendiente |
| **Fase 2** | Contenido y Confianza | 2-3 semanas | ⬜ Pendiente |
| **Fase 3** | SEO y Polish Final | 1-2 semanas | ⬜ Pendiente |

---

## ⚫ Fase 0 — Bug Fixes Críticos (URGENTE)

> Estos bugs rompen funcionalidad core. Deben resolverse ANTES de cualquier mejora visual.

### 0.1 Renombrar `proxy.ts` → `middleware.ts`

**Problema**: Next.js solo ejecuta middleware desde el archivo `middleware.ts` en la raíz de `src/`. El archivo actual `src/proxy.ts` nunca se ejecuta, dejando las rutas admin sin protección.

**Archivos a modificar**:
- `[RENAME]` `src/proxy.ts` → `src/middleware.ts`
- Verificar que el `matcher` config proteja `/admin/*`

**Verificación**: Intentar acceder a `/admin` sin autenticación → debe redirigir a `/login`.

---

### 0.2 Fix `Array.fill()` en Checkout

**Problema**: `Array(maxAdults).fill({ name: '', document: '' })` comparte la misma referencia de objeto. Editar un pasajero corrompe todos los demás.

**Archivo**: `src/app/(public)/checkout/page.tsx`

**Solución**:
```typescript
// ❌ ANTES (bug)
Array(maxAdults).fill({ name: '', lastName: '', document: '', documentType: 'DNI' })

// ✅ DESPUÉS (correcto)
Array.from({ length: maxAdults }, () => ({ name: '', lastName: '', document: '', documentType: 'DNI' }))
```

**Verificación**: Agregar 2+ pasajeros → editar nombre del pasajero 1 → pasajero 2 NO debe cambiar.

---

### 0.3 Fix Checkout Multi-tour

**Problema**: `registerBooking` solo procesa `items[0]` del carrito, perdiendo los demás tours.

**Archivo**: `src/app/(public)/checkout/page.tsx`

**Solución**: Iterar sobre todos los items del carrito al registrar bookings, o crear un booking por item.

**Verificación**: Agregar 2 tours al carrito → completar checkout → ambos bookings deben aparecer en admin.

---

### 0.4 Conectar BookingWidget → ToursPageClient

**Problema**: `BookingWidget` envía params (`q`, `date`, `passengers`) a `/tours` pero `ToursPageClient` los ignora.

**Archivos**:
- `src/components/home/BookingWidget.tsx` (emisor — ya funciona)
- `src/app/(public)/tours/page.tsx` (receptor — debe leer searchParams)
- `src/components/tours/ToursPageClient.tsx` (debe recibir y aplicar filtros iniciales)

**Solución**: Leer `searchParams` en la page y pasarlos como props al client component. Aplicar filtros iniciales basados en estos params.

---

### 0.5 Implementar Filtros Funcionales

**Problema**: Los filtros en `TourFilters.tsx` (búsqueda, categoría, duración, destino) son puramente visuales — no tienen handlers ni state.

**Archivos**:
- `src/components/tours/TourFilters.tsx` — agregar state + callbacks
- `src/components/tours/ToursPageClient.tsx` — recibir filtros y filtrar tours
- `src/app/(public)/tours/page.tsx` — pasar categorías/destinos reales desde DB

**Solución**:
1. Fetch categorías y destinos desde Supabase en `page.tsx`
2. Pasar como props a `TourFilters`
3. Implementar `onChange` callbacks que actualicen state en `ToursPageClient`
4. Filtrar array de tours en client-side basado en filtros activos
5. Implementar sorting funcional

**Verificación**: Seleccionar categoría "Aventura" → solo mostrar tours de aventura. Buscar "Machu" → solo tours que contengan "Machu".

---

### 0.6 Fix Cart "Edit" Link

**Problema**: El link "Editar" en el carrito usa `tourId` (UUID) en vez de `tourSlug`, generando URLs como `/tours/uuid-here` que dan 404.

**Archivos**:
- `src/store/useCartStore.ts` — agregar `tourSlug` al tipo `CartItem`
- `src/components/tours/BookingSidebar.tsx` — pasar slug al agregar al carrito
- `src/app/(public)/cart/page.tsx` — usar `item.tourSlug` en el link

---

### 0.7 Conectar BookingSidebar a API de Disponibilidad

**Problema**: `BookingSidebar` genera fechas mockeadas con `addDays()` en vez de consultar `/api/availability`.

**Archivos**:
- `src/components/tours/BookingSidebar.tsx` — fetch real a API
- `src/app/api/availability/route.ts` (ya existe — solo conectar)

**Solución**: `useEffect` que haga `fetch('/api/availability?tour_id=...')` al montar el componente. Usar los slots reales para el calendario.

---

### 0.8 Fix Precio Niño Hardcodeado

**Problema**: `const priceChild = priceAdult * 0.7` ignora `price_child` de la DB.

**Archivo**: `src/components/tours/BookingSidebar.tsx`

**Solución**: Usar `tour.price_child` si existe, fallback a `tour.price * 0.7`.

---

### 0.9 Fix `revalidate` en Componente

**Problema**: `export const revalidate = 60` en `FeaturedTours.tsx` no funciona — solo es válido en `page.tsx`/`layout.tsx`.

**Archivos**:
- `src/components/home/FeaturedTours.tsx` — eliminar `revalidate` export
- `src/app/(public)/page.tsx` — agregar `export const revalidate = 60`

---

### 0.10 Fix Footer Links Muertos

**Problema**: Footer linkea a `/condiciones`, `/politicas`, `/faq`, `/contacto` que no existen. Social links son `href="#"`.

**Archivo**: `src/components/layout/Footer.tsx`

**Solución temporal**: Cambiar links a `#` con `aria-disabled` o crear placeholder pages. Actualizar social links con URLs reales del negocio.

---

## 🔴 Fase 1 — Impacto Visual Inmediato

> Transformar la homepage de 3 secciones a 8+, creando una primera impresión al nivel de incarail.com.

### 1.1 Hero Slider con Embla Carousel

**Descripción**: Reemplazar la imagen estática del hero con un carrusel profesional de 3-5 slides.

**Archivos**:
- `[NEW]` `src/components/home/HeroSlider.tsx` — Carrusel con Embla Carousel (lightweight, accessible)
- `[MODIFY]` `src/components/home/Hero.tsx` — Reemplazar background-image CSS con HeroSlider
- `[MODIFY]` `src/app/(public)/page.tsx` — Actualizar imports

**Especificaciones**:
- Autoplay con pause on hover/focus
- Indicadores de paginación (dots)
- Cada slide: Next `<Image>` con `priority` en slide 1, `loading="lazy"` en los demás
- Responsive: `<picture>` con breakpoints mobile (4:5) / desktop (8:3)
- CTAs overlay por slide con texto + botón
- Transición fade o slide suave
- Imágenes de alta calidad del negocio (no Unsplash genérico)

**Dependencia**: `npm install embla-carousel-react embla-carousel-autoplay`

---

### 1.2 Migrar Hero a Next `<Image>`

**Descripción**: Eliminar CSS `background-image` y usar `<Image>` de Next.js para optimización LCP.

**Archivo**: `src/components/home/Hero.tsx`

**Beneficios**: Automatic WebP/AVIF, responsive srcSet, lazy loading, priority LCP.

---

### 1.3 Sección "¿Por qué Elegirnos?"

**Descripción**: Grid de 4-6 ventajas con iconos Lucide, similar a "Why Inca Rail?".

**Archivo**: `[NEW]` `src/components/home/WhyChooseUs.tsx`

**Contenido sugerido**:
- 🏔️ Experiencia local certificada
- 💳 Pagos seguros (Culqi + PayPal)
- 📋 Todo incluido (entradas + transporte)
- ⭐ +500 viajeros satisfechos
- 🔄 Cancelación flexible
- 📞 Soporte 24/7

**Diseño**: Background gris alternado (`#F5F5E9`), iconos con color primary, grid responsive 2→3→4 columnas.

---

### 1.4 Sección de Testimonios

**Descripción**: Carrusel horizontal de reviews de clientes.

**Archivos**:
- `[NEW]` `src/components/home/Testimonials.tsx` — Carrusel con Embla
- `[NEW]` `supabase/migrations/0003_testimonials.sql` — Tabla testimonials (opcional, puede ser hardcoded inicialmente)

**Diseño**:
- Cards con: foto avatar, nombre, país/bandera, título review, texto, rating (estrellas)
- Background con color primario oscuro para contraste
- Autoplay pausable
- 1 card mobile → 2 tablet → 3 desktop

---

### 1.5 Sección CTA / Newsletter (Dark Section)

**Descripción**: Sección full-width con fondo oscuro y CTA prominente.

**Archivo**: `[NEW]` `src/components/home/CTASection.tsx`

**Diseño**:
- Background: gradiente de color primario oscuro (`#049993` → `#06C0B8`)
- Heading serif grande en blanco
- Texto descriptivo
- Botón CTA grande (blanco sobre oscuro)
- Opcional: campo de email para newsletter

---

### 1.6 Sección SEO H1

**Descripción**: Bloque de texto con H1 optimizado para SEO, similar al de Incarail.

**Archivo**: `[NEW]` `src/components/home/SEOBlock.tsx`

**Contenido**: H1 con keyword principal + párrafo descriptivo centrado. Background gris suave.

---

### 1.7 Alternancia de Backgrounds

**Descripción**: Aplicar backgrounds alternados entre secciones de la homepage.

**Archivo**: `src/app/(public)/page.tsx`

**Patrón**: blanco → gris (`accent: #F5F5E9`) → blanco → oscuro (`primary-dark`) → blanco → gris

---

### 1.8 Mejorar FeaturedTours como Carrusel

**Descripción**: Convertir el grid estático en un carrusel horizontal scroll-snap o Embla.

**Archivo**: `src/components/home/FeaturedTours.tsx`

**Diseño**: Scroll horizontal con peek (mostrar borde de la siguiente card), snap points, flecha prev/next en desktop.

---

## 🟡 Fase 2 — Contenido y Confianza

### 2.1 FAQ Accordion

**Archivo**: `[NEW]` `src/components/home/FAQ.tsx`

**Especificaciones**:
- 6-8 preguntas frecuentes relevantes
- Animación con CSS Grid (`grid-template-rows: 0fr → 1fr`)
- Icono chevron con rotación
- Accesible con `<details>`/`<summary>` o ARIA
- Solo una pregunta abierta a la vez

---

### 2.2 Badges de Descuento en Tour Cards

**Archivo**: `src/components/tours/TourCard.tsx`

**Agregar**: Badge posicionado absoluto con "% OFF" si el tour tiene `discount_percentage` o `original_price`.

**Diseño**: Badge naranja/rojo en esquina superior derecha, bordes redondeados.

---

### 2.3 Rating y Estrellas en Tours

**Archivos**:
- `[NEW]` `src/components/ui/StarRating.tsx` — Componente reutilizable de estrellas
- `src/components/tours/TourCard.tsx` — Agregar rating
- `supabase/migrations/0003_tour_reviews.sql` — Agregar campo `average_rating` y `review_count` a tours (o tabla separada de reviews)

---

### 2.4 Footer Enriquecido

**Archivo**: `src/components/layout/Footer.tsx`

**Mejoras**:
- Links reales a todas las páginas existentes
- Social links con URLs reales
- Payment method logos reales (SVG de Visa, Mastercard, PayPal, etc.)
- Certificaciones/badges de seguridad
- Newsletter mini-form
- Map embed o dirección
- Número de teléfono/WhatsApp
- 4 columnas responsive → 2 en tablet → 1 en mobile

---

### 2.5 Mega Menu con Submenús

**Archivo**: `src/components/layout/Navbar.tsx`

**Mejoras**:
- Dropdown "Tours" con subcategorías reales (fetch de DB)
- Dropdown "Destinos" con lista de destinos
- Iconos Lucide en cada sección del menu
- Animación de apertura suave
- Mega menu en desktop (grid), accordion en mobile

---

### 2.6 Paginación Real

**Archivos**:
- `[NEW]` `src/components/ui/Pagination.tsx`
- `src/components/tours/ToursPageClient.tsx` — Implementar paginación client-side (o server-side con searchParams)

**Especificaciones**: 12 tours por página, botones prev/next, números de página, scroll to top al cambiar.

---

### 2.7 Loading y Error States

**Archivos**:
- `[NEW]` `src/app/(public)/loading.tsx` — Skeleton loader
- `[NEW]` `src/app/(public)/error.tsx` — Error boundary con retry
- `[NEW]` `src/app/(public)/tours/loading.tsx`
- `[NEW]` `src/app/(public)/tours/[slug]/loading.tsx`
- `[NEW]` `src/app/not-found.tsx` — Custom 404

---

### 2.8 Contenido de Páginas Placeholder

**Archivos**:
- `src/app/(public)/nosotros/page.tsx` — Página "Sobre Nosotros" con historia, equipo, misión
- `src/app/(public)/rutas/page.tsx` — Página de rutas con mapa visual
- `src/app/(public)/blog/page.tsx` — Blog con posts desde Supabase

---

### 2.9 Admin Mobile Layout

**Archivo**: `src/app/admin/layout.tsx`

**Agregar**: Hamburger button para mobile, sidebar como drawer/overlay, toggle state.

---

### 2.10 Reemplazar Google Translate

**Archivos**:
- `[DELETE]` `src/components/layout/LanguageSwitcher.tsx` (versión Google Translate)
- `[NEW]` `src/components/layout/LanguageSwitcher.tsx` (versión con banderas + ruta)
- Considerar `next-intl` o manejo manual con carpeta `[locale]`

**Nota**: i18n completo es un proyecto grande. Como mínimo, reemplazar Google Translate con un switcher ES/EN que cambie contenido hardcoded por ahora.

---

## 🟢 Fase 3 — SEO y Polish Final

### 3.1 Schema.org JSON-LD

**Archivos**:
- `[NEW]` `src/components/seo/JsonLd.tsx` — Componente reutilizable
- `src/app/(public)/page.tsx` — Agregar Organization + LocalBusiness
- `src/app/(public)/tours/[slug]/page.tsx` — Agregar Product schema por tour
- Homepage — FAQPage schema (cuando se implemente FAQ)

**Tipos**:
```json
{
  "@type": "Organization",
  "name": "Machu Picchu Travel Adventures",
  "url": "https://...",
  "logo": "https://..."
}
```

---

### 3.2 Meta Tags Completos

**Archivos**:
- `src/app/layout.tsx` — metadata global mejorada
- `src/app/(public)/page.tsx` — metadata de homepage
- Cada `page.tsx` — metadata específica

**Agregar**: `title`, `description`, `keywords`, `openGraph`, `twitter`, `robots`, `alternates`.

---

### 3.3 WhatsApp Button Flotante

**Archivo**: `[NEW]` `src/components/ui/WhatsAppButton.tsx`

**Diseño**: Botón circular verde WhatsApp, fixed bottom-right, con tooltip "¿Necesitas ayuda?", pulse animation.

---

### 3.4 Sitemap y Robots

**Archivos**:
- `[NEW]` `src/app/sitemap.ts` — Generación dinámica con tours desde DB
- `[NEW]` `src/app/robots.ts` — Configuración de robots

---

### 3.5 Gallery Modal Funcional

**Archivo**: `src/app/(public)/tours/[slug]/page.tsx` o nuevo componente

**Descripción**: Modal lightbox para las imágenes del tour con navegación prev/next.

---

### 3.6 Success Page Funcional

**Archivo**: `src/app/(public)/success/page.tsx`

**Agregar**: Funcionalidad real para "Descargar PDF" y "Agregar al Calendario" (generar .ics).

---

### 3.7 Limpiar Dependencias Muertas

**Archivo**: `package.json`

**Acción**: Evaluar si `framer-motion`, `clsx`, `tailwind-merge` se usarán. Si no, eliminar. Si sí, integrar donde corresponda (animaciones, className merging).

---

### 3.8 Fix Supabase Client SSR

**Archivos**:
- `src/lib/supabase.ts` — Evaluar si se puede eliminar en favor de `src/lib/supabase/server.ts`
- Asegurar que server components usen el client SSR-safe con cookies

---

### 3.9 Sanitizar `dangerouslySetInnerHTML`

**Archivo**: `src/components/home/FeaturedTours.tsx`

**Solución**: Usar una librería de sanitización como `DOMPurify` (server-side) o validar el contenido antes de renderizar.

---

## 📁 Resumen de Archivos

### Archivos Nuevos (17+)
```
src/components/home/HeroSlider.tsx
src/components/home/WhyChooseUs.tsx
src/components/home/Testimonials.tsx
src/components/home/CTASection.tsx
src/components/home/SEOBlock.tsx
src/components/home/FAQ.tsx
src/components/ui/StarRating.tsx
src/components/ui/Pagination.tsx
src/components/ui/WhatsAppButton.tsx
src/components/seo/JsonLd.tsx
src/app/(public)/loading.tsx
src/app/(public)/error.tsx
src/app/(public)/tours/loading.tsx
src/app/(public)/tours/[slug]/loading.tsx
src/app/not-found.tsx
src/app/sitemap.ts
src/app/robots.ts
```

### Archivos a Modificar (15+)
```
src/proxy.ts → src/middleware.ts (RENAME)
src/app/(public)/checkout/page.tsx
src/app/(public)/cart/page.tsx
src/app/(public)/page.tsx
src/app/layout.tsx
src/components/home/Hero.tsx
src/components/home/FeaturedTours.tsx
src/components/home/BookingWidget.tsx
src/components/tours/TourFilters.tsx
src/components/tours/ToursPageClient.tsx
src/components/tours/BookingSidebar.tsx
src/components/tours/TourCard.tsx
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/components/layout/LanguageSwitcher.tsx
src/store/useCartStore.ts
src/app/admin/layout.tsx
```

---

## 📱 Fase M — Optimización Móvil y Responsividad (Vista Móvil)

> Esta fase se enfoca en resolver bugs de solapamiento, elementos inaccesibles en pantallas táctiles (hover-only), desbordamiento horizontal y problemas de scroll en dispositivos móviles.

### M.1 Resolver solapamiento del Buscador Flotante (BookingWidget)
- **Problema**: El buscador flotante (`BookingWidget`) está posicionado como `absolute` en el Hero con `translate-y-1/2`. En mobile (vertical), se estira a ~400px de altura, solapando el contenido posterior (`SEOBlock`) debido a un espaciador rígido insuficiente (`h-40`).
- **Solución**:
  - En `src/components/home/Hero.tsx`, cambiar a flujo `relative` en móviles y `absolute` en desktop (`xl:absolute xl:bottom-0 xl:translate-y-1/2`).
  - En `src/app/[locale]/(public)/page.tsx`, ajustar el espaciador a `h-6 sm:h-8 xl:h-32` para eliminar el espacio vacío gigante en móviles y mantener la separación adecuada en desktop.

### M.2 Eliminar solapamiento/doble recuadro en Formulario de Contacto
- **Problema**: En `/contacto`, la página envuelve a `<ContactForm />` en una tarjeta blanca con sombras (`bg-white rounded-3xl p-6 sm:p-10 border...`), y el componente interno vuelve a envolverse en un recuadro idéntico con doble título. Esto desperdicia 48px de ancho útil en teléfonos.
- **Solución**:
  - En `src/app/[locale]/(public)/contacto/page.tsx`, eliminar el recuadro contenedor y el título duplicado, permitiendo que el `<ContactForm />` renderice su propio contenedor directamente.

### M.3 Revelar información oculta detrás de estados Hover
- **Problema**: Varios bloques usan `opacity-0 group-hover:opacity-100` para mostrar información crítica. En teléfonos, como no hay hover, esta información queda permanentemente invisible.
- **Solución**:
  - En `src/components/home/PromotionsSlider.tsx` (Cupones) y `src/components/tours/ToursPageClient.tsx` (CTA de WhatsApp del Tren), cambiar la opacidad de los overlays y textos a `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` para que estén siempre visibles en móviles y mantengan el efecto hover en desktop.
  - En carruseles (`src/components/ui/HeroCarousel.tsx`, `src/components/experiencias/PassengerGallery.tsx`), hacer que las flechas de navegación sean siempre visibles en mobile (`opacity-100 lg:opacity-0 lg:group-hover:opacity-100`).

### M.4 Optimizar menú de navegación móvil (Navbar)
- **Problema**: El menú móvil (`lg:hidden fixed inset-0`) tiene un `paddingTop` rígido de 80px y su contenedor interno `<nav>` tiene un alto `h-full`. Esto hace que el menú supere el alto de la pantalla en 80px, cortando los enlaces y detalles del pie del menú.
- **Solución**:
  - En `src/components/layout/Navbar.tsx`, agregar `flex flex-col` al contenedor del menú móvil y cambiar `h-full` por `flex-1` en el `<nav>` interno para que el scroll se restrinja correctamente al área visible del viewport.

### M.5 Optimizar barra de búsqueda mock y badge de TripAdvisor
- **Problema**: 
  - La barra de búsqueda mock en `BlogPageClient.tsx` muestra botones de voz e imagen no funcionales junto al botón "Modo IA", dejando poco espacio para escribir en móviles.
  - El badge de TripAdvisor en `Testimonials.tsx` causa desbordamiento horizontal en pantallas angostas (~320px).
- **Solución**:
  - En `src/components/blog/BlogPageClient.tsx`, ocultar los botones de micrófono y cámara en móviles (`hidden sm:inline-block`).
  - En `src/components/home/Testimonials.tsx`, usar `flex-wrap` en el badge de TripAdvisor y permitir saltos de línea fluidos.

### M.6 Scroll interactivo al calendario en BookingSidebar
- **Problema**: Al presionar el botón pegajoso de "Reservar ahora" en mobile sin haber elegido una fecha, el error se muestra de forma silenciosa en el sidebar original en la parte inferior, y el usuario no se entera del problema.
- **Solución**:
  - En `src/components/tours/BookingSidebar.tsx`, si se hace click en reservar sin seleccionar fecha en móviles, desplazar la ventana suavemente (`scrollIntoView`) hasta el selector de fecha.

### M.7 Corregir ruta de imagen rota en Nosotros
- **Problema**: En `nosotros/page.tsx` línea 69, la imagen del fondo de valores apunta a `/public/tours/...`, lo que genera un 404 en Next.js.
- **Solución**: Cambiar la ruta a `/tours/...` omitiendo la palabra `/public`.

### M.8 Incrementar altura del Hero / Carousel en Homepage
- **Problema**: Las imágenes del Hero Slider se ven demasiado recortadas en sentido horizontal.
- **Solución**:
  - En `src/components/home/Hero.tsx`, incrementar las alturas en todas las resoluciones a: `h-[60vh] sm:h-[70vh] md:h-[75vh] xl:h-[90vh] xl:min-h-[750px]` (antes `h-[80vh]` pero de flujo rígido).
  - Asegurar que la grilla del carrusel interno tenga el tamaño correcto en flujo normal en mobiles y absoluto en desktop.

### M.9 Usar imagen clásica de Machu Picchu
- **Problema**: La imagen actual de Machu Picchu no convence tanto como la versión clásica del sitio web previo.
- **Solución**:
  - En `src/components/home/HeroSlider.tsx`, actualizar la primera imagen a: `https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop`.

### M.10 Rediseñar contenedor del CTA de Tren a Machu Picchu
- **Problema**: La sección de trenes en `ToursPageClient.tsx` se deforma y expande a pantalla completa, estirando la imagen y recortando el tren y paisajes.
- **Solución**:
  - En `src/components/tours/ToursPageClient.tsx` (sección Tren CTA), cambiar el contenedor externo para usar un ancho máximo de tarjeta centrada con su resolución de aspecto original: `max-w-4xl mx-auto w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden mt-16 md:mt-24 group flex items-center justify-center shadow-md`.
  - Asegurar que el overlay y el botón de WhatsApp se posicionen exactamente al centro del card.

### M.11 Incrementar tamaño y contraste del Logo corporativo
- **Problema**: El logotipo en el Navbar es pequeño y pierde total contraste al hacer scroll, volviéndose negro (`brightness-0`) sobre el fondo azul verde oscuro (`bg-primary-dark`).
- **Solución**:
  - Incrementar un 20% el tamaño del contenedor del logotipo en `src/components/layout/Navbar.tsx` a: `w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] lg:w-[78px] lg:h-[78px]`.
  - Corregir el contraste en el estado de scroll: cambiar `brightness-0` (negro) a `brightness-0 invert` (blanco puro) para que destaque perfectamente sobre el fondo oscuro de navegación.

---

## Verificación Global

Después de cada fase, verificar:

- [ ] `npm run build` compila sin errores
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO, Best Practices)
- [ ] Responsive en 320px, 768px, 1024px, 1440px
- [ ] Todos los links funcionales (no `href="#"`)
- [ ] Formularios funcionales (búsqueda, filtros, checkout)
- [ ] Admin protegido por middleware
- [ ] Imágenes optimizadas (WebP, lazy loading)

