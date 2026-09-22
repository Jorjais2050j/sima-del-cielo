import { dataSource } from './data-source'

export const getCabins = async () => (await dataSource.getCabins()).filter((c) => c.isActive)
export const getCabinExperiences = () => dataSource.getCabinExperiences()

export async function getCabinBySlug(slug: string) {
  return (await getCabins()).find((c) => c.slug === slug) ?? null
}
