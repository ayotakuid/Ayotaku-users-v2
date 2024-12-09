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

export function formatDateLastUpdate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}