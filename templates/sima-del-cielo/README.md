# Sima del Cielo · Sitio web (Fase 1)

Página informativa premium construida como base de un futuro sistema de reservas / e-commerce.

**Stack:** Vue 3 · Vite · TypeScript · Tailwind CSS v4 · Motion for Vue · Vue Router · Pinia · Zod · Lucide · simple-icons

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
npm run build      # typecheck + build a /dist (Vercel / Firebase Hosting)
```

## Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| Teléfono, WhatsApp (número y mensaje), Instagram, dirección, mapa, SEO, horarios, reglamento | `src/content/site.json` |
| Paquetes | `src/data/packages.json` |
| Cabañas | `src/data/cabins.json` |
| Experiencias románticas | `src/data/cabin-experiences.json` |
| Menú | `src/data/menu.json` |
| Galería | `src/data/gallery.json` |
| Video del hero | `public/media/video/` + `site.json → hero.video.sources` |
| Colores / tipografía | `src/assets/styles/main.css` (`@theme`) |
| Fuente de datos local ↔ API | `.env → VITE_DATA_SOURCE` |

Las constantes `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `INSTAGRAM_URL`, `GOOGLE_MAPS_URL`… se exportan desde `src/config/site.ts` (leen `site.json`; no editar valores ahí).

Ver `docs/ARCHITECTURE.md` (arquitectura y fases) y `docs/CONTENT-AUDIT.md` (contenido disponible / faltante).
