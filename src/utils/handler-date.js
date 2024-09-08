export function formatDateToString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  
  //  Minggu, 1 September 2024
  return new Date(date).toLocaleDateString("id-ID", options)
}