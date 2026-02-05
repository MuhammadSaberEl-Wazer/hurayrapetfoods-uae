# Locales – Translation Files

Translation data is stored in **JSON files by language and namespace** so you can quickly open the right file for the page or feature you’re editing.

## Structure

```
src/locales/
├── README.md           ← This file
├── en/                 ← English
│   ├── common.json     ← Nav, footer, buttons, validation (used everywhere)
│   ├── home.json       ← Home page
│   ├── products.json   ← Products listing
│   ├── productDetail.json
│   ├── cart.json
│   ├── checkout.json
│   ├── about.json
│   ├── whyHalal.json
│   ├── contact.json
│   ├── blog.json
│   ├── blogPost.json
│   ├── auth.json       ← Login, Signup, Account
│   ├── legal.json      ← Privacy, Terms, Shipping, Returns
│   ├── notFound.json
│   ├── admin-common.json   ← Admin sidebar & header
│   ├── admin-dashboard.json
│   ├── admin-login.json
│   └── (admin-products, admin-orders, etc. as needed)
└── ar/                 ← Arabic (same file names)
    ├── common.json
    ├── home.json
    └── ...
```

## How to find the right file

| Where in the site        | Open file(s)                    |
|--------------------------|----------------------------------|
| Header, footer, nav      | `common.json`                   |
| Home page                | `home.json`                     |
| Products list / filters  | `products.json`                 |
| Single product page      | `productDetail.json`            |
| Cart                     | `cart.json`                     |
| Checkout                 | `checkout.json`                 |
| About                    | `about.json`                    |
| Why Halal                | `whyHalal.json`                 |
| Contact                  | `contact.json`                  |
| Blog list / post         | `blog.json`, `blogPost.json`    |
| Login / Signup / Account | `auth.json`                     |
| Privacy, Terms, etc.     | `legal.json`                    |
| 404 page                 | `notFound.json`                 |
| Admin panel              | `admin-common.json`, `admin-dashboard.json`, `admin-login.json`, etc. |

## Usage in code

Use the `useTranslation` hook with the **namespace** (filename without `.json`):

```tsx
import { useTranslation } from 'react-i18next';

// For common (nav, footer, buttons): namespace "common"
const { t } = useTranslation('common');
t('nav.home');        // → "Home"
t('footer.quickLinks'); // → "Quick Links"

// For a page: use that page's namespace
const { t } = useTranslation('home');
t('hero.title');
t('hero.subtitle');
```

For **nested keys** use dot notation: `t('hero.title')` reads `hero.title` from the JSON.

## Adding a new language

1. Duplicate the `en/` folder (e.g. `fr/` for French).
2. Translate all JSON files in the new folder.
3. Register the language in `src/i18n.ts` (add to `supportedLngs` and `resources`).
