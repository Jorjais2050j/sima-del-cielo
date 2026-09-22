import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/config/site'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  // Páginas independientes: reutilizan las mismas secciones que la home (carga diferida).
  { path: '/paquetes', name: 'packages', component: () => import('@/views/PackagesView.vue'), meta: { title: 'Paquetes' } },
  { path: '/cabanas', name: 'cabins', component: () => import('@/views/CabinsView.vue'), meta: { title: 'Cabañas' } },
  { path: '/menu', name: 'menu', component: () => import('@/views/MenuView.vue'), meta: { title: 'Menú' } },
  { path: '/galeria', name: 'gallery', component: () => import('@/views/GalleryView.vue'), meta: { title: 'Galería' } },
  { path: '/contacto', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { title: 'Contacto' } },

  // ── Fases futuras (no implementadas) ───────────────────────────────
  // Fase 2  { path: '/reservar', ... }, { path: '/reservar/cabana/:slug', ... }  → reutiliza CabinCard
  // Fase 3  { path: '/login' }, { path: '/registro' }, { path: '/perfil', meta: { requiresAuth: true } }, { path: '/mis-reservas', ... }
  // Fase 5  { path: '/admin', component: AdminLayout, meta: { requiresAuth: true, role: 'admin' }, children: [...] }

  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'Página no encontrada' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const t = to.meta.title as string | undefined
  document.title = t ? `${t} · ${site.business.name}` : site.seo.title
})

// Fase 3: router.beforeEach(authGuard) — lee la sesión desde un store Pinia.
