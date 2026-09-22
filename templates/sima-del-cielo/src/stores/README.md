# stores/ (Pinia)

Pinia ya está registrado en `main.ts`, pero la Fase 1 no necesita estado global.
Cuando llegue cada fase, crear aquí un store por dominio:

- `booking.ts` — Fase 2: cabaña/paquete elegido, fechas, huéspedes, extras, total calculado.
- `auth.ts` — Fase 3: sesión (JWT), usuario actual; lo consume el guard del router.
- `cart.ts` — si se habilitan órdenes del restaurante.

Regla: los stores llaman a `services/`, nunca a `fetch` directamente.
