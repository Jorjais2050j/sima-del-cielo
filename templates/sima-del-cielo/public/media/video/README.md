# Video del hero

Coloca aquí los archivos y regístralos en `src/content/site.json → hero.video.sources`:

```json
"sources": [
  { "src": "/media/video/hero-mobile.mp4", "type": "video/mp4", "media": "mobile" },
  { "src": "/media/video/hero-desktop.webm", "type": "video/webm", "media": "desktop" },
  { "src": "/media/video/hero-desktop.mp4", "type": "video/mp4", "media": "desktop" }
]
```

Recomendado: 10–20 s en loop, sin audio. Móvil 720×1280 (vertical) ≤ 2.5 MB; escritorio 1920×1080 ≤ 5 MB (H.264 + WebM/VP9). El póster actual se mantiene como fallback y como LCP.
