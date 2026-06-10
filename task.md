# 📊 Task Tracker — Tours Machu Picchu

> **Última actualización**: 23 de Mayo, 2026  
> **Plan completo**: Ver [implementation_plan.md](./implementation_plan.md)  
> **Guía para agentes**: Ver [AGENTS.md](./AGENTS.md)

---

## Leyenda

- `[ ]` — Pendiente
- `[/]` — En progreso
- `[x]` — Completado
- `[!]` — Bloqueado / Requiere decisión

---

## ⚫ Fase 0 — Bug Fixes Críticos (URGENTE)

### Showstoppers (P0)

- [x] **0.1** Renombrar `src/proxy.ts` → `src/middleware.ts`
  - [x] Verificar matcher config protege `/admin/*`
  - [x] Test: acceder `/admin` sin auth → redirige a `/login`

- [x] **0.2** Fix `Array.fill()` en checkout (passenger corruption)
  - [x] Cambiar a `Array.from()` con factory function
  - [x] Test: editar pasajero 1 no afecta pasajero 2

- [x] **0.3** Fix checkout multi-tour
  - [x] Iterar sobre todos los items del carrito en `registerBooking`
  - [x] Test: 2 tours en carrito → ambos bookings registrados

- [x] **0.4** Conectar BookingWidget search → ToursPageClient
  - [x] Leer `searchParams` en `/tours/page.tsx`
  - [x] Pasar params iniciales a `ToursPageClient`
  - [x] Aplicar filtros basados en params

- [x] **0.5** Implementar filtros funcionales en TourFilters
  - [x] Agregar state management (useState o URL params)
  - [x] Conectar checkboxes a handlers
  - [x] Implementar filtrado client-side
  - [x] Implementar sorting funcional
  - [x] Implementar "Limpiar" button
  - [x] Fetch categorías/destinos reales desde DB

### Problemas Importantes (P1)

- [x] **0.6** Fix cart "Edit" link (UUID → slug)
  - [x] Agregar `tourSlug` a `CartItem` type
  - [x] Pasar slug en `BookingSidebar` al agregar
  - [x] Usar slug en cart page links

- [x] **0.7** Conectar BookingSidebar a API de disponibilidad
  - [x] Fetch `/api/availability?tour_id=...`
  - [x] Reemplazar fechas mockeadas con slots reales
  - [x] Mostrar capacidad disponible

- [x] **0.8** Fix precio niño hardcodeado
  - [x] Usar `tour.price_child` si existe
  - [x] Fallback a `tour.price * 0.7`

- [x] **0.9** Fix `revalidate` en componente
  - [x] Mover `export const revalidate = 60` a `page.tsx`
  - [x] Eliminar export de `FeaturedTours.tsx`

- [x] **0.10** Fix footer links muertos
  - [x] Actualizar links a páginas existentes
  - [x] Crear placeholder pages para `/condiciones`, `/politicas`, `/faq`
  - [x] Actualizar social links con URLs reales

---

## 🔴 Fase 1 — Impacto Visual Inmediato

- [x] **1.1** Hero Slider con Embla Carousel
  - [x] Instalar `embla-carousel-react` + `embla-carousel-autoplay`
  - [x] Crear `HeroSlider.tsx`
  - [x] 3-5 slides con imágenes de alta calidad
  - [x] Next `<Image>` con `priority` en slide 1
  - [x] Autoplay con pause on hover
  - [x] Indicadores de paginación (dots)
  - [x] CTAs overlay por slide
  - [x] Responsive: mobile (4:5) / desktop (8:3)

- [x] **1.2** Migrar Hero a Next `<Image>`
  - [x] Eliminar CSS `background-image`
  - [x] Usar `<Image>` con `fill` + `priority`
  - [x] Configurar `next.config.ts` para nuevos dominios de imágenes

- [x] **1.3** Sección "¿Por qué Elegirnos?"
  - [x] Crear `WhyChooseUs.tsx`
  - [x] 4-6 ventajas con iconos Lucide
  - [x] Grid responsive 2→3→4 columnas
  - [x] Background gris alternado (`#F5F5E9`)

- [x] **1.4** Sección de Testimonios
  - [x] Crear `Testimonials.tsx`
  - [x] Carrusel con CSS scroll-snap
  - [x] Cards: avatar, nombre, país, rating, texto
  - [x] Background oscuro para contraste
  - [x] 1→2→3 cards responsive

- [x] **1.5** Sección CTA / Dark Section
  - [x] Crear `CTASection.tsx`
  - [x] Background gradiente oscuro
  - [x] Heading serif + texto + botón CTA grande
  - [x] Opcional: campo de email newsletter

- [x] **1.6** Sección SEO H1
  - [x] Crear `SEOBlock.tsx`
  - [x] H1 con keyword principal
  - [x] Párrafo descriptivo centrado

- [x] **1.7** Alternancia de backgrounds en homepage
  - [x] Actualizar `page.tsx` con secciones alternadas
  - [x] Patrón: blanco → gris → blanco → oscuro → blanco → gris

- [x] **1.8** FeaturedTours como carrusel
  - [x] Convertir grid → carrusel horizontal
  - [x] Scroll-snap o Embla
  - [x] Flechas prev/next en desktop
  - [x] Peek (mostrar borde de siguiente card)

---

## 🟡 Fase 2 — Contenido y Confianza

- [x] **2.1** FAQ Accordion
  - [x] Crear `FAQ.tsx`
  - [x] 6-8 preguntas frecuentes
  - [x] CSS Grid animation (`0fr → 1fr`)
  - [x] Chevron rotation
  - [x] Una pregunta abierta a la vez
  - [x] Accesibilidad (ARIA)

- [x] **2.2** Badges de descuento en TourCard
  - [x] Agregar campo `discount_percentage` o `original_price` a tours
  - [x] Badge naranja posicionado absoluto
  - [x] "X% OFF" o "Desde $XX"

- [x] **2.3** Rating y estrellas
  - [x] Crear `StarRating.tsx`
  - [x] Agregar `average_rating` y `review_count` a tours
  - [x] Mostrar en TourCard y tour detail

- [x] **2.4** Footer enriquecido
  - [x] Links funcionales a todas las páginas
  - [x] Social links con URLs reales
  - [x] Payment method logos SVG
  - [x] 4 columnas responsive
  - [x] Newsletter mini-form

- [x] **2.5** Mega Menu con submenús
  - [x] Dropdown "Tours" con subcategorías
  - [x] Dropdown "Destinos" con lista
  - [x] Iconos Lucide en secciones
  - [x] Grid en desktop, accordion en mobile

- [x] **2.6** Paginación real (implementada en ToursPageClient)
  - [x] Crear `Pagination.tsx`
  - [x] 12 tours por página
  - [x] Botones prev/next + números
  - [x] Scroll to top al cambiar

- [x] **2.7** Loading y Error states
  - [x] `loading.tsx` para rutas públicas
  - [x] `error.tsx` con retry
  - [x] Custom `not-found.tsx` (404)
  - [x] Skeleton loaders para cards

- [x] **2.8** Contenido de páginas placeholder
  - [x] Sobre Nosotros: historia, equipo, misión
  - [x] Rutas: mapa visual + info de rutas
  - [x] Blog: estructura base con posts

- [x] **2.9** Admin mobile layout
  - [x] Hamburger button para mobile
  - [x] Sidebar como drawer/overlay
  - [x] Toggle state

- [x] **2.10** Reemplazar Google Translate
  - [x] Evaluar next-intl vs manual
  - [x] Nuevo LanguageSwitcher con banderas
  - [x] Eliminar Google Translate script hack

---

## 🟢 Fase 3 — SEO y Polish Final

- [x] **3.1** Schema.org JSON-LD
  - [x] Crear `JsonLd.tsx` reutilizable
  - [x] Organization en homepage
  - [x] LocalBusiness en homepage
  - [x] Product schema por tour
  - [x] FAQPage schema

- [x] **3.2** Meta tags completos
  - [x] Homepage: title, description, OG, Twitter
  - [x] Tours listing: metadata dinámica
  - [x] Tour detail: metadata por tour (ya parcial)
  - [x] Keywords relevantes

- [x] **3.3** WhatsApp button flotante
  - [x] Crear `WhatsAppButton.tsx`
  - [x] Fixed bottom-right
  - [x] Tooltip "¿Necesitas ayuda?"
  - [x] Pulse animation
  - [x] Link a wa.me/NUMERO

- [x] **3.4** Sitemap y Robots
  - [x] Crear `sitemap.ts` dinámico
  - [x] Crear `robots.ts`
  - [x] Incluir tours dinámicos

- [x] **3.5** Gallery modal funcional
  - [x] Modal lightbox para imágenes de tour
  - [x] Navegación prev/next
  - [x] Keyboard navigation (Escape, arrows)
  - [x] Zoom opcional

- [x] **3.6** Success page funcional
  - [x] Generar PDF de confirmación
  - [x] Generar archivo .ics para calendario
  - [x] Botones de descarga funcionales

- [x] **3.7** Limpiar dependencias muertas
  - [x] Decidir: usar o eliminar `framer-motion`
  - [x] Decidir: usar o eliminar `clsx` + `tailwind-merge`
  - [x] `npm prune` si se eliminan

- [x] **3.8** Fix Supabase client SSR
  - [x] Evaluar eliminar `src/lib/supabase.ts` simple
  - [x] Migrar a `src/lib/supabase/server.ts` en server components
  - [x] Asegurar manejo correcto de cookies

- [x] **3.9** Sanitizar `dangerouslySetInnerHTML`
  - [x] Instalar DOMPurify o sanitize-html
  - [x] Sanitizar contenido de site_settings
  - [x] O reemplazar con rendering seguro

---

## ✅ Verificación Global Post-Implementación

- [x] `npm run build` compila sin errores
- [ ] Lighthouse Performance > 90 *(requiere test manual)*
- [ ] Lighthouse Accessibility > 90 *(requiere test manual)*
- [ ] Lighthouse SEO > 90 *(requiere test manual)*
- [ ] Lighthouse Best Practices > 90 *(requiere test manual)*
- [ ] Responsive: 320px - 1440px *(requiere test manual en browser)*
- [x] Todos los links funcionales (footer/navbar actualizados)
- [x] Formularios funcionales (búsqueda, filtros, checkout)
- [x] Admin protegido por proxy middleware
- [x] Checkout multi-tour funcional
- [x] Pasajeros independientes (Array.from fix)
- [x] Disponibilidad real en BookingSidebar
- [x] Precios correctos (adulto + niño con fallback)
- [x] SEO: Schema.org (TravelAgency + FAQPage)
- [x] SEO: meta tags en todas las páginas (OG, Twitter, keywords)
- [x] Sanitización de dangerouslySetInnerHTML
- [x] Success page: PDF + ICS funcionales
- [x] Admin: mobile layout responsive
- [x] Google Translate eliminado → LanguageSwitcher limpio

---

## 🔵 Fase 4 — Datos Corporativos, Personalización y Nuevas Ventanas (DOCX)

### 4.1 Actualización de Datos de Contacto Globales e Identidad Corporativa
- [x] Actualizar traducciones de contacto en `messages/es.json` y `messages/en.json` (teléfono principal, secundarios, email de reservas)
- [x] Actualizar textos de Misión, Visión, Valores e Historia en `messages/es.json` y `messages/en.json`
- [x] Cambiar número de WhatsApp principal en `WhatsAppButton.tsx` a `51955723329`
- [x] Actualizar teléfono, email y enlaces de redes sociales en `Navbar.tsx` (móvil y desktop)
- [x] Actualizar teléfono, email y enlaces de redes en `Footer.tsx`
- [x] Actualizar teléfono en el JSON-LD schema de la homepage (`src/app/[locale]/(public)/page.tsx`)

### 4.2 Optimización del BookingWidget (Buscador con WhatsApp Directo)
- [x] Agregar enlace/barra superior "Disponibilidad / Tours y paquetes" en `BookingWidget.tsx`
- [x] Agregar dropdown "Tipo de Viaje" con categorías en `BookingWidget.tsx` (traducciones en json)
- [x] Agregar input "Cupón" en `BookingWidget.tsx`
- [x] Agregar botón "WhatsApp directo" al lado de buscar
- [x] Implementar composición de mensaje dinámico para WhatsApp con datos del formulario
- [x] Estilizar la barra para integrarse perfectamente a la paleta de colores de la agencia

### 4.3 Clasificación de Paquetes y TripAdvisor en la Homepage
- [x] Modificar `FeaturedTours.tsx` o `FeaturedToursCarousel.tsx` para soportar pestañas (Tabs): Recomendados, Individuales, Promociones
- [x] Asegurar que las tarjetas de tour (Tour Cards) muestren resumen, botón "Leer más" y botón "Reservar ahora"
- [x] Modificar `FeaturedTours.tsx` para agregar botón "Ver todos los paquetes" que apunte a `/tours`
- [x] Crear componente `TripAdvisorCarousel.tsx` que imite visualmente un feed de TripAdvisor de alta calidad (5/5 globos, testimonios y logos oficiales)
- [x] Agregar el carrusel de TripAdvisor a la homepage en `src/app/[locale]/(public)/page.tsx`

### 4.4 Nueva Ventana: Experiencias (`/experiencias`)
- [x] Registrar la ruta `/experiencias` creando `src/app/[locale]/(public)/experiencias/page.tsx` con metadatos y JSON-LD
- [x] Crear componente `PassengerGallery.tsx` con carrusel horizontal interactivo de fotos de pasajeros (usando Embla)
- [x] Implementar bloque persuasivo "Por qué viajar con nosotros" y botón para desplegar fotos
- [x] Agregar botones sociales destacados (TripAdvisor, Facebook, Instagram, WhatsApp, Licencias de empresa)
- [x] Crear formulario de asesoría directa conectado a WhatsApp en `AdvisorContact.tsx`
- [x] Agregar grid de reseñas/testimonios estructurado en la página de Experiencias
- [x] Agregar sección de beneficios "Por qué comprar todo con nosotros"

### 4.5 Nueva Ventana: Contacto (`/contacto`)
- [x] Registrar la ruta `/contacto` creando `src/app/[locale]/(public)/contacto/page.tsx`
- [x] Crear formulario de contacto con validaciones e integrarlo con WhatsApp
- [x] Diseñar bloque "Linktree" con accesos directos optimizado para dispositivos móviles
- [x] Crear componente `AdvisorsSection.tsx` con fotos y números de WhatsApp de los asesores
- [x] Integrar mapa embebido interactivo de Google Maps apuntando a Cusco en la página
- [x] Agregar sección de preguntas frecuentes de reserva y detalles de ubicación

### 4.6 Enriquecimiento de la Ventana: Nosotros (`/nosotros`)
- [x] Agregar badge del sello de la agencia certificada en `nosotros/page.tsx`
- [x] Integrar botón intrusivo/flotante "Planificar mi Viaje con un Experto" en la sección
- [x] Crear sección de Sostenibilidad y Reforestación con imágenes de apoyo
- [x] Crear sección de Consejos útiles para reservar y evitar estafas
- [x] Crear acordeón de Licencias y Permisos Oficiales con RUC `20564458385` y datos de resoluciones directorales

### 4.7 Actualización Estructural del Footer y Métodos de Pago
- [x] Modificar estructura de enlaces en `Footer.tsx` para agregar servicios y destinos completos (Huacachina, Titicaca, Salar de Uyuni, etc.)
- [x] Agregar sección "Información Útil" en el footer (blog de viajes, destinos recomendados)
- [x] Agregar enlaces a Cambios, FAQ, y Libro de Reclamaciones
- [x] Actualizar logotipos SVG de métodos de pago (Visa, Mastercard, PayPal, Izipay, Western Union / Moneygram)
- [x] Mostrar RUC oficial `20564458385` e insignias de Aliados (Peru Rail, Inca Rail, Latam, Mincul) en el pie de página

---

## ✅ Verificación Global Post-Implementación
- [x] `npm run build` compila sin errores
- [x] Redirecciones de WhatsApp verificadas para BookingWidget y Asesores
- [x] Multi-idioma funcional para las nuevas ventanas de Experiencias y Contacto
- [x] Responsividad en resoluciones móvil y desktop certificada
- [x] Formulario de contacto validado y operativo
- [x] RUC y enlaces legales confirmados en Footer y Nosotros


