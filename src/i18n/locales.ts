export const locales = ['fr', 'fa'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeMeta: Record<
  Locale,
  { lang: string; dir: 'ltr' | 'rtl'; ogLocale: string; label: string }
> = {
  fr: {
    lang: 'fr',
    dir: 'ltr',
    ogLocale: 'fr_FR',
    label: 'Français',
  },
  fa: {
    lang: 'fa',
    dir: 'rtl',
    ogLocale: 'fa_IR',
    label: 'فارسی',
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Home path for a locale (FR has no prefix). */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}`;
}

export {
  chapterPath,
  chapterSection,
  getChapterById,
  getChapterBySlug,
} from '../data/chapters';

export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean === '' ? '/' : clean;
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}
