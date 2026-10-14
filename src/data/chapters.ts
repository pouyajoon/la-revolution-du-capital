import type { Locale } from '../i18n/locales';

/** Stable chapter id (ASCII). URL slugs are localized per locale. */
export type ChapterDef = {
  id: string;
  readingMinutes: number;
  slugs: Record<Locale, string>;
};

export const chapterSection: Record<Locale, string> = {
  fr: 'chapitres',
  fa: 'فصل',
};

export const chapters: ChapterDef[] = [
  {
    id: 'le-capital-nest-pas-seulement-de-largent',
    readingMinutes: 5,
    slugs: {
      fr: 'le-capital-nest-pas-seulement-de-largent',
      fa: 'سرمایه-فقط-پول-نیست',
    },
  },
  {
    id: 'pourquoi-le-vote-ne-suffit-pas',
    readingMinutes: 5,
    slugs: {
      fr: 'pourquoi-le-vote-ne-suffit-pas',
      fa: 'چرا-رای-کافی-نیست',
    },
  },
  {
    id: 'trois-preceptes-majeurs',
    readingMinutes: 8,
    slugs: {
      fr: 'trois-preceptes-majeurs',
      fa: 'سه-اصل-بنیادین',
    },
  },
  {
    id: 'du-capitalisme-des-humains-au-capitalisme-des-machines',
    readingMinutes: 9,
    slugs: {
      fr: 'du-capitalisme-des-humains-au-capitalisme-des-machines',
      fa: 'از-سرمایه-داری-انسانها-تا-سرمایه-داری-ماشینها',
    },
  },
  {
    id: 'la-proposition-concrete',
    readingMinutes: 9,
    slugs: {
      fr: 'la-proposition-concrete',
      fa: 'پیشنهاد-مشخص',
    },
  },
  {
    id: 'attaquer-le-capital-par-le-capital',
    readingMinutes: 7,
    slugs: {
      fr: 'attaquer-le-capital-par-le-capital',
      fa: 'حمله-به-سرمایه-با-سرمایه',
    },
  },
  {
    id: 'financer-un-patrimoine-citoyen',
    readingMinutes: 6,
    slugs: {
      fr: 'financer-un-patrimoine-citoyen',
      fa: 'تامین-مالی-دارایی-شهروندی',
    },
  },
  {
    id: 'rachat-de-la-dette-et-creation-monetaire',
    readingMinutes: 8,
    slugs: {
      fr: 'rachat-de-la-dette-et-creation-monetaire',
      fa: 'بازخرید-بدهی-و-خلق-پول',
    },
  },
  {
    id: 'entreprises-strategiques-et-pouvoir-de-decision',
    readingMinutes: 6,
    slugs: {
      fr: 'entreprises-strategiques-et-pouvoir-de-decision',
      fa: 'شرکتهای-راهبردی-و-قدرت-تصمیم',
    },
  },
  {
    id: 'gouvernance-transparence-echelle-mondiale',
    readingMinutes: 7,
    slugs: {
      fr: 'gouvernance-transparence-echelle-mondiale',
      fa: 'حکمرانی-شفافیت-مقیاس-جهانی',
    },
  },
  {
    id: 'objections-risques-et-conditions-de-reussite',
    readingMinutes: 8,
    slugs: {
      fr: 'objections-risques-et-conditions-de-reussite',
      fa: 'ایرادها-ریسکها-و-شرایط-موفقیت',
    },
  },
  {
    id: 'accumuler-dabord-orienter-ensuite',
    readingMinutes: 9,
    slugs: {
      fr: 'accumuler-dabord-orienter-ensuite',
      fa: 'نخست-انباشت-سپس-جهتدهی',
    },
  },
  {
    id: 'faisabilite-du-fonds-citoyen',
    readingMinutes: 12,
    slugs: {
      fr: 'faisabilite-du-fonds-citoyen',
      fa: 'امکان-پذیری-صندوق-شهروندی',
    },
  },
];

export function getChapterById(id: string): ChapterDef | undefined {
  return chapters.find((c) => c.id === id);
}

export function getChapterBySlug(
  locale: Locale,
  slug: string,
): ChapterDef | undefined {
  const decoded = decodeURIComponent(slug);
  return chapters.find(
    (c) => c.slugs[locale] === slug || c.slugs[locale] === decoded,
  );
}

export function chapterPath(locale: Locale, id: string): string {
  const chapter = getChapterById(id);
  if (!chapter) throw new Error(`Unknown chapter id: ${id}`);
  const section = chapterSection[locale];
  const slug = chapter.slugs[locale];
  if (locale === 'fr') return `/${section}/${slug}`;
  return `/${locale}/${section}/${slug}`;
}

export function chapterOrder(id: string): number {
  return chapters.findIndex((c) => c.id === id);
}

export function adjacentChapters(id: string): {
  prev?: ChapterDef;
  next?: ChapterDef;
} {
  const i = chapterOrder(id);
  if (i < 0) return {};
  return {
    prev: i > 0 ? chapters[i - 1] : undefined,
    next: i < chapters.length - 1 ? chapters[i + 1] : undefined,
  };
}
