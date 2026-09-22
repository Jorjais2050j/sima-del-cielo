import type { ZodType } from 'zod'
import { env } from '@/config/env'

/** Cliente HTTP mínimo. En Fase 3 aquí se agrega el header Authorization (JWT). */
async function request<T>(path: string, schema: ZodType<T>, init?: RequestInit): Promise<T> {
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${path}`)
  return schema.parse(await res.json())
}

export const http = {
  get: <T>(path: string, schema: ZodType<T>) => request(path, schema),
  post: <T>(path: string, body: unknown, schema: ZodType<T>) =>
    request(path, schema, { method: 'POST', body: JSON.stringify(body) }),
}
