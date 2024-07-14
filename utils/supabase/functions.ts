export function formatDate(date: string): string {
  const asDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return asDate.toLocaleDateString(undefined, options);
}

export function getName(preferred: string | null, fallback: string): string {
  return preferred || fallback;
}
