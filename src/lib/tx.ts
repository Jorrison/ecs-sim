export type Lang = "en" | "zh";

export function tx(lang: Lang, en: string, zh: string) {
  return lang === "zh" ? zh : en;
}
