import { env } from '@/config/env'
import { apiSource } from './api'
import { localSource } from './local'
import type { DataSource } from './types'

export const dataSource: DataSource = env.dataSource === 'api' ? apiSource : localSource
export type { DataSource }
