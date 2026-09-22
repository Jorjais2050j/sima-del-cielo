import { onMounted, ref, shallowRef } from 'vue'

/** Carga asíncrona genérica para cualquier servicio (local o API). */
export function useAsyncData<T>(loader: () => Promise<T>) {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<Error | null>(null)
  const pending = ref(true)

  async function load() {
    pending.value = true
    error.value = null
    try {
      data.value = await loader()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
      console.error(e)
    } finally {
      pending.value = false
    }
  }

  onMounted(load)
  return { data, error, pending, reload: load }
}
