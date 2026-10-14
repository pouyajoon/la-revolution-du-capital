import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chapters } from '../data/chapters';
import type { Locale } from '../i18n/locales';

export type Edition = {
  /** Short content fingerprint (8 hex chars). */
  hash: string;
  /** ISO date of build (YYYY-MM-DD). */
  date: string;
  /** Locale-formatted date for display. */
  dateLabel: string;
  /** Full edition line for cover / footer. */
  label: string;
};

const contentRoot = join(process.cwd(), 'src', 'content');

function readLocaleSources(locale: Locale): string {
  const parts: string[] = [];
  parts.push(
    readFileSync(join(contentRoot, 'pages', locale, 'accueil.md'), 'utf8'),
  );
  for (const chapter of chapters) {
    parts.push(
      readFileSync(
        join(contentRoot, 'chapters', locale, `${chapter.id}.md`),
        'utf8',
      ),
    );
  }
  return parts.join('\n---\n');
}

export function formatEditionDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function computeEdition(locale: Locale, at: Date = new Date()): Edition {
  const hash = createHash('sha256')
    .update(readLocaleSources(locale))
    .digest('hex')
    .slice(0, 8);
  const date = at.toISOString().slice(0, 10);
  const dateLabel = formatEditionDate(at, locale);
  const label =
    locale === 'fa'
      ? `ویرایش ${hash} — ${dateLabel}`
      : `Édition ${hash} — ${dateLabel}`;
  return { hash, date, dateLabel, label };
}

export function bookPath(locale: Locale): string {
  return locale === 'fr' ? '/livre' : '/fa/livre';
}

export function pdfPath(locale: Locale): string {
  return `/pdf/la-revolution-du-capital-${locale}.pdf`;
}

export function pdfFilename(locale: Locale): string {
  return `la-revolution-du-capital-${locale}.pdf`;
}
