# La révolution du capital

Traité citoyen — site statique **Astro**, contenu Markdown, français + farsi.

## Développement

```bash
npm install
npm run dev
```

- Accueil FR : http://localhost:4321/
- Accueil FA : http://localhost:4321/fa
- Ex. chapitre FA : http://localhost:4321/fa/فصل/پیشنهاد-مشخص

## Build / Netlify

```bash
npm run build
```

Publish directory : `dist/`. Les anciennes URLs `/chapitres/*.html` redirigent en 301.

## Contenu

| Chemin | Rôle |
|--------|------|
| `src/content/pages/{fr,fa}/` | Pages (accueil…) |
| `src/content/chapters/{fr,fa}/` | Chapitres |
| `src/data/chapters.ts` | Ids stables + slugs FR / FA (persan) |
| `src/i18n/` | Chaînes UI + locales |
| `legacy/` | Ancien site HTML (archive) |

URLs : `/chapitres/{slug-fr}` · `/fa/فصل/{slug-fa}`
