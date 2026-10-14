import type { Locale } from './locales';

type UiStrings = {
  brand: string;
  siteTag: string;
  homeLabel: string;
  readingTime: (minutes: number) => string;
  ctaProposition: string;
  ctaPreceptes: string;
  chaptersIntro: string;
  chapterLink: string;
  footerLine: string;
  footerNote: string;
  langSwitchAria: string;
  allChapters: string;
  bookMode: string;
  downloadPdf: string;
  printBook: string;
  bookFormatsIntro: string;
  fontSmaller: string;
  fontLarger: string;
  fontSizeLabel: string;
};

export const ui: Record<Locale, UiStrings> = {
  fr: {
    brand: 'La révolution du capital',
    siteTag: 'Traité citoyen',
    homeLabel: 'Page d’accueil',
    readingTime: (minutes) => `Temps de lecture\u00a0: ${minutes}\u00a0min`,
    ctaProposition: 'La proposition concrète',
    ctaPreceptes: 'Les préceptes',
    chaptersIntro:
      'Ces idées sont développées en textes indépendants, chacun avec son propre temps de lecture — pour lire, discuter et affiner chaque point comme un traité.',
    chapterLink: 'Lire le chapitre',
    footerLine: 'La révolution du capital — traité citoyen.',
    footerNote:
      'Les idées sont humaines. Une IA a aidé à fabriquer ce site et à mettre sur papier des transcriptions de voix.',
    langSwitchAria: 'Choisir la langue',
    allChapters: 'Tous les chapitres',
    bookMode: 'Lire en mode livre',
    downloadPdf: 'Télécharger le PDF',
    printBook: 'Imprimer',
    bookFormatsIntro:
      'Pour lire sur papier : version livre (tous les chapitres à la suite) ou PDF prêt à imprimer.',
    fontSmaller: 'Réduire la taille du texte',
    fontLarger: 'Agrandir la taille du texte',
    fontSizeLabel: 'Taille du texte',
  },
  fa: {
    brand: 'انقلاب سرمایه',
    siteTag: 'رسالهٔ شهروندی',
    homeLabel: 'صفحهٔ اصلی',
    readingTime: (minutes) => `زمان مطالعه: ${minutes} دقیقه`,
    ctaProposition: 'پیشنهاد مشخص',
    ctaPreceptes: 'اصول بنیادین',
    chaptersIntro:
      'این ایده‌ها در متن‌های مستقل بسط یافته‌اند؛ هر کدام با زمان مطالعهٔ خود — برای خواندن، گفت‌وگو و پالایش هر نقطه همچون یک رساله.',
    chapterLink: 'خواندن فصل',
    footerLine: 'انقلاب سرمایه — رسالهٔ شهروندی.',
    footerNote:
      'ایده‌ها انسانی‌اند. یک هوش مصنوعی در ساخت این سایت و پیاده‌کردن رونوشت‌های گفتار کمک کرده است.',
    langSwitchAria: 'انتخاب زبان',
    allChapters: 'همهٔ فصل‌ها',
    bookMode: 'خواندن در حالت کتاب',
    downloadPdf: 'دانلود PDF',
    printBook: 'چاپ',
    bookFormatsIntro:
      'برای خواندن روی کاغذ: نسخهٔ کتاب (همهٔ فصل‌ها پشت‌سرهم) یا PDF آمادهٔ چاپ.',
    fontSmaller: 'کوچک‌تر کردن متن',
    fontLarger: 'بزرگ‌تر کردن متن',
    fontSizeLabel: 'اندازهٔ متن',
  },
};

export function t(locale: Locale): UiStrings {
  return ui[locale];
}
