import type { Money, Price } from '@/types/models'

const mxn = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

export const formatMoney = (value: Money | number) => mxn.format(typeof value === 'number' ? value : value.amount)

export function formatPriceUnit(price: Price): string {
  switch (price.unit) {
    case 'person': return 'por persona'
    case 'group': return `por ${price.guests} personas`
    case 'night': return `por noche · ${price.guests} personas`
    case 'session': return `por sesión · hasta ${price.guests} personas`
    case 'experience': return 'por experiencia'
  }
}

export const SCHEDULE_LABEL = { am: 'a.m.', pm: 'p.m.' } as const
