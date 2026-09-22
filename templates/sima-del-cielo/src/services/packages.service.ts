import { dataSource } from './data-source'

export const getPackages = () => dataSource.getPackages()

export async function getPackageBySlug(slug: string) {
  return (await getPackages()).find((p) => p.slug === slug) ?? null
}
