export const PROTECTED_IMAGE_QUALITY = 82

export const PROTECTED_IMAGE_SIZES = '(max-width: 768px) 100vw, 1200px'

export function getProtectedImageProps() {
  return {
    quality: PROTECTED_IMAGE_QUALITY,
    sizes: PROTECTED_IMAGE_SIZES,
  } as const
}
