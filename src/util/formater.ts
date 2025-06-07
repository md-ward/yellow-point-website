export function localeBasedDir(locale: string): string {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}
