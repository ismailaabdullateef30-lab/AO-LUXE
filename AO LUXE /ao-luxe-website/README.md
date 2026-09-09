# AO Luxe Events

The official website for **AO Luxe Events** - *...Class, Value & Elegance*.

Built with Next.js 14 (App Router), Tailwind CSS and TypeScript. Clients can
send a booking straight to WhatsApp on 07087054909, or by email to
`aoluxeevents@gmail.com`.

**AO Luxe Events is a planning house.** It does not provide decoration or
catering itself - it sources, negotiates with and manages the specialists who
do. The copy across the site is written to keep that distinction clear, so
please preserve it when editing `lib/services.ts` and the page text.

---

## Running it on any computer

You need **Node.js** installed once, from <https://nodejs.org> (take the
"LTS" button). After that, three commands:

```bash
git clone https://github.com/ismailaabdullateef30-lab/AO-LUXE.git
cd AO-LUXE
npm install
npm run dev
```

Then open <http://localhost:3000> in your browser.

`npm install` only needs running the first time, or after someone changes
`package.json`. From then on, `npm run dev` is the only command you need.

This has been tested from a completely fresh clone: install, build and
every page loading. Nothing else needs configuring to see the site.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site locally while you work on it |
| `npm run build` | Check the whole site compiles with no errors |
| `npm run start` | Run the built site, as it behaves when live |
| `npm run lint` | Check the code for problems |

**Note:** don't run `npm run build` while `npm run dev` is running. They
share the same `.next` folder and will interfere with each other. Stop
one before starting the other.

---

## Before the site goes public

Two things still need doing.

### 1. Email for the booking form

The booking form has two buttons. **"Send on WhatsApp" already works** and
needs nothing set up. **"Send by Email"** needs a key:

1. Create a free account at <https://resend.com> and verify your domain.
2. Copy `.env.example` to `.env.local` and paste the key into
   `RESEND_API_KEY`.
3. Add the same variable in Vercel under Settings, Environment Variables.

Until then, the email button shows "Email is not configured on the server
yet." The WhatsApp button is unaffected.

### 2. Real prices and the founder's name

Every service still reads `Starting from NGN XXX,XXX` in
`lib/services.ts`, and the founder is listed as "Founder & Lead Designer"
rather than her actual name in `lib/team.ts`.

---

## What to edit, and where

Everything the client is likely to change lives in plain data files -
no page layouts need touching.

| To change… | Edit this file |
| --- | --- |
| Phone numbers, WhatsApp, email, Instagram, address | `lib/site.ts` |
| Service tiers, descriptions, what's included, **prices** | `lib/services.ts` |
| Founder name, photo, bio | `lib/team.ts` |
| Team members - add, remove, edit | `lib/team.ts` |
| Menu links | `lib/site.ts` (the `navLinks` list) |
| Homepage gallery photos | `app/page.tsx` (the `galleryTeaser` list) |
| Event types in the booking dropdown | `components/BookingForm.tsx` (`EVENT_TYPES`) |
| Brand colours and fonts | `tailwind.config.ts` |

### Prices

Every service currently reads `Starting from ₦XXX,XXX`. Replace those with
real figures in `lib/services.ts`.

### Photos

Drop image files into `public/images/team/` and `public/images/gallery/`,
then point the matching entry at them. See `public/images/README.md` for
the expected file names and shapes. Missing photos show a tasteful gold
placeholder rather than a broken image.

---

## Pages

| Page | Path | What's on it |
| --- | --- | --- |
| Home | `/` | Hero, brand statement, service previews, why choose us, gallery, booking CTA |
| About | `/about` | Founder, team, how we work |
| Services | `/services` | Four planning tiers with pricing and CTAs |
| Book | `/book` | Full booking form → emails the enquiry |
| Contact | `/contact` | WhatsApp / phone / email / Instagram, map, short message form |

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
   Vercel detects Next.js automatically - no build settings to change.
3. Under **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `BOOKING_FROM_EMAIL` (optional)
   - `NEXT_PUBLIC_SITE_URL` - the live domain, e.g. `https://aoluxeevents.com`
4. Deploy.

### Branches

- `main` - the live site. Every push here deploys to production.
- `dev` - for testing. Pushes here get a private preview URL. Merge `dev`
  into `main` when you're happy with it.

```bash
git checkout dev          # switch to the testing branch
# ...make changes...
git add -A && git commit -m "Update prices"
git push origin dev       # check the Vercel preview URL

git checkout main
git merge dev
git push origin main      # goes live
```

---

## Brand rules

These are deliberate and shouldn't be changed casually:

- The logo is always the supplied `logo.jpg`. Never an SVG recreation.
- Gold `#B8952A`, black `#111111`, off-white `#F5F0E8`. No white backgrounds.
- Headings in Cormorant Garamond, body text in Inter.
- Nothing rounder than a 4px corner.
- Generous spacing - luxury feels unhurried.

---

## Project structure

```
app/
  layout.tsx        Fonts, navbar and footer wrapper for every page
  page.tsx          Homepage
  about/            About page
  services/         Services page
  book/             Booking page
  contact/          Contact page
  api/booking/      Receives the booking form, sends the email
  api/contact/      Receives the contact form, sends the email
components/         Navbar, Footer, forms, cards, icons
lib/                site.ts, services.ts, team.ts, mail.ts  ← edit these
public/images/      logo.jpg, team/, gallery/
```
