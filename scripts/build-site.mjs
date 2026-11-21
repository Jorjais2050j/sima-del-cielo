// Arma dist/ con sólo lo que el sitio publica: index.html + los datos y medios que carga.
// Vercel lo ejecuta en cada deploy (ver vercel.json). Local: node scripts/build-site.mjs
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://simadelcielochiapas.com'
const APP = 'templates/sima-del-cielo'
const OUT = 'dist'

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT)

const copy = (p) => cpSync(p, join(OUT, p), { recursive: true })
copy('index.html')
copy(`${APP}/public`)
copy(`${APP}/src/content`)
copy(`${APP}/src/data`)
// README de carpetas de medios: no se publican
rmSync(join(OUT, APP, 'public/media/video/README.md'), { force: true })

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`)
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc></url>\n</urlset>\n`,
)

console.log(`dist/ listo`)
