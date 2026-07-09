// Format ISO date jadi format Indonesia yang mudah dibaca, misal "9 Juli 2026"
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}