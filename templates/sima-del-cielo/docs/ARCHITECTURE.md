# Arquitectura

## Capas

```
UI (components/, views/, layouts/)
   │  sólo reciben datos por props o vía composables
   ▼
services/  getCabins(), getPackages(), getMenu()…
   │
   ▼
services/data-source/  ── local.ts  (Fase 1: JSON en src/data, import dinámico)
                       └─ api.ts    (Fase 2+: fetch → Node/Express → MySQL)
   │
   ▼
schemas/ (Zod)  valida JSON local y respuestas de API con el mismo contrato
types/          tipos TS derivados de los esquemas (una sola definición)
```

Cambiar de JSON a API = `VITE_DATA_SOURCE=api`. Ningún componente cambia.

## Estructura

```
src/
  assets/styles/main.css      tokens (@theme) + utilidades
  config/site.ts              constantes con nombre (WHATSAPP_NUMBER…) desde content/site.json
  config/env.ts               variables de entorno
  content/site.json           datos del negocio (contacto, ubicación, SEO, reglamento)
  data/*.json                 catálogo: paquetes, cabañas, experiencias, menú, galería
  schemas/                    Zod
  types/models.ts             tipos + entidades futuras documentadas
  services/                   API pública de datos para la UI
  composables/                useAsyncData, useScrollLock
  utils/                      format (moneda/unidades), whatsapp, image (Cloudinary)
  router/                     rutas actuales + futuras comentadas
  layouts/DefaultLayout.vue   Header + Footer + botones flotantes
  views/                      Home + páginas independientes (/cabanas, /paquetes…)
  components/
    layout/    AppHeader, AppFooter
    home/      HeroVideo, IntroStatement
    packages/  PackageCard, PackagesSection
    cabins/    CabinCard, CabinGallery, CabinsSection
    menu/      MenuSection, MenuCard, MenuItemRow
    gallery/   GalleryGrid, GalleryLightbox
    contact/   ContactSection, LocationMap
    social/    FloatingSocialButtons
    ui/        SectionTitle, BaseButton, SegmentedControl, ResponsiveImage, Reveal, Accordion, BrandIcon
  stores/                     vacío en Fase 1 (ver README)
```

## Puntos de extensión ya preparados

- **PackageCard**: prop `selectable` + evento `@select` (Fase 2: abrir selector de fecha/disponibilidad). Sirve también para experiencias románticas.
- **CabinCard**: slot `actions` para reemplazar el CTA de WhatsApp por el selector de reserva en `/reservar/cabana/:slug`.
- **MenuItemRow**: lugar único para añadir "Agregar al carrito".
- **Precios** modelados como `{ amount, currency, unit, guests }` → el cálculo de total (Fase 2) no requiere reinterpretar texto. `stay.extraGuestFee` ya es un `Money`.
- **Capacidad** separada en `baseGuests` / `maxGuests` (máximo aún desconocido → `null`).
- **http.ts**: punto único para el header `Authorization` (Fase 3, JWT).
- **router**: rutas futuras comentadas; guard de auth previsto en `beforeEach`.
- **Imágenes**: `ResponsiveImage` + `utils/image.ts` activan Cloudinary (f_auto, q_auto, srcset) con sólo definir `VITE_CLOUDINARY_CLOUD_NAME`.

## Fases

1. **Informativa (actual)** — Inicio, Paquetes, Cabañas (+Románticos), Menú, Galería, Contacto, WhatsApp/Instagram flotantes, Google Maps.
2. **Reservaciones** — `/reservar`, store `booking`, entidad `Availability`, `Reservation`; CTAs pasan de WhatsApp a flujo propio.
3. **Usuarios** — `/login`, `/registro`, `/perfil`, `/mis-reservas`; store `auth`; JWT + bcrypt en backend.
4. **Pagos** — Mercado Pago (Checkout Pro / Bricks); entidad `Payment` con estados; webhooks en backend.
5. **Admin** — `/admin` con `AdminLayout` propio y rutas hijas; CRUD de las mismas entidades que hoy son JSON.

## Backend futuro (no implementado)

`server/` (hermano de este proyecto o monorepo `apps/web` + `apps/api`): Express + MySQL.
Tablas previstas: users, cabins, cabin_images, packages, package_items, cabin_experiences, menu_categories, menu_items, gallery_images, availability, reservations, reservation_extras, payments, orders. Los JSON actuales equivalen a los seeds iniciales.

## Rendimiento

- LCP: póster del hero como `<img fetchpriority="high">` precargado; el video se monta después y nunca con Save-Data / reduced-motion; se pausa fuera de pantalla.
- CLS: todas las imágenes llevan `width`/`height` desde los datos.
- JS: datos por import dinámico; rutas secundarias lazy; iconos tree-shaken; el mapa es un iframe `loading="lazy"`.
- Animaciones: Motion (`whileInView`, una sola vez) + un único efecto CSS con scroll timeline (apertura circular), ambos desactivados con `prefers-reduced-motion`.
