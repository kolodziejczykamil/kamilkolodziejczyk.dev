const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
