import { onBeforeUnmount, watch, type Ref } from 'vue'

/** Bloquea el scroll del body mientras `active` sea true (menú móvil, lightbox). */
export function useScrollLock(active: Ref<boolean>) {
  const set = (on: boolean) => { document.body.style.overflow = on ? 'hidden' : '' }
  watch(active, set)
  onBeforeUnmount(() => set(false))
}
