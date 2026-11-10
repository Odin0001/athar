export const CASE_STUDIES_BUCKET = 'case-studies'
export const LOGOS_BUCKET = 'logos'

// Converts a public Storage URL back to the object path inside the bucket
export function storagePathFromUrl(url, bucket = CASE_STUDIES_BUCKET) {
  const marker = `/storage/v1/object/public/${bucket}/`
  const index = url.indexOf(marker)
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length))
}
