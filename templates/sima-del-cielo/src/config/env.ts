export const env = {
  dataSource: import.meta.env.VITE_DATA_SOURCE ?? 'local',
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  cloudinaryCloud: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? '',
} as const
