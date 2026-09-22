# Auditoría de contenido

Fuentes: `CABAÑAS SIMA DEL CIELO 2026.pdf`, `PAQ. SIMA DEL CIELO 2026.pdf`, `MENUSIMA2026.pdf`, `ROMANTICO DECORACIÓN 2026.pdf`, logo PNG.

## Disponible (de los documentos)

- Descripción del parque, 6 cabañas con precios, camas, baños y equipamiento, qué incluye la tarifa, persona extra ($140), check-in/out, reglamento completo.
- 11 paquetes (Senderos a.m./p.m., Explorador a.m./p.m., Rappel romántico, Romántico exclusivo, Recorrido, Rappel, Camping, Sesión de fotos clásica/aventura) con precio y lo que incluyen. Recomendaciones de visita.
- 2 experiencias románticas (Completa $1,600, Básica $700).
- Menú completo de cocina, bebidas y productos para llevar.
- Teléfono/WhatsApp 961 459 0262, Instagram @sima.delcielo.chiapas.
- ~50 fotografías extraídas de los PDFs (`public/media`).

## Por confirmar con el cliente

- **Dirección exacta y coordenadas.** Los PDFs sólo dicen "San Fernando, Chiapas". La dirección usada (Carretera Tuxtla–Chicoasén km 20.5, Col. Juárez, 29120) proviene de fuentes públicas en internet → `location.verified: false`.
- **URL de Instagram** derivada del usuario que aparece en los PDFs.
- **Horario de atención del parque** — no aparece en los documentos; no se muestra (`hours: null`).
- **Precios del menú**: el PDF tiene los precios en una columna separada; algunos se asignaron por orden y deben revisarse: Desayunos, Sabores que abren camino, Entre brasas (Tampiqueña sin precio → "Consultar"), Del horno, Postres, Bohemia Cristal (sin precio → "Consultar").
- **Descripción individual de cada cabaña** y **capacidad máxima** — no existen en los documentos (`description: null`, `maxGuests: null`).
- **Asignación de fotos a cabañas** — se tomó según la página del PDF donde aparecen.

## Faltante

- Video del hero (se usará `public/media/video/`).
- Fotografías en alta resolución: las extraídas de PDFs comprimidos miden ≤1200 px; para el hero y pantallas grandes se necesitan originales (≥2400 px).
- Fotos de platillos del restaurante (sólo hay 3 dentro del PDF de paquetes).
- Favicon / isotipo simplificado (el logo completo es muy detallado para 32 px).
- Textos legales (aviso de privacidad, políticas de cancelación) si se requieren.
