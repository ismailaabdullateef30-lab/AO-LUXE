# AO Luxe Events

The AO Luxe Events website. Plain HTML, CSS and JavaScript, with no
build step and no server.

*...Class, Value & Elegance*

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new> and import that repository.
3. Vercel detects a static site on its own. Leave every setting alone
   and press Deploy.

Every push to `main` then goes live by itself.

`vercel.json` tells Vercel to cache everything in `assets/` for a
year, which is safe because those files only change when their names
do.

Links are written as plain file names such as `about.html`, so the
exact same files work three ways: opened straight from your computer,
on GitHub Pages, and on Vercel. Clean URLs are deliberately left off,
because turning them on would break the version you open locally.

## Deploying to GitHub Pages instead

Settings, then Pages, then set Source to the `main` branch and the
root folder. The `.nojekyll` file is already here, which stops GitHub
running the site through Jekyll.

Nothing extra to change. The links already use plain file names, so
this works as it stands.

## Looking at it locally

Double-click `index.html`. That is all. Every page, photograph and the
hero animation work straight from the file.

---

## The files

```
index.html       Homepage
about.html       Founder and team
services.html    The four planning tiers
book.html        Booking form
contact.html     Contact details, map, message form

assets/
  css/styles.css Every style on the site
  js/script.js   Menu and both forms
  images/        Logo, gallery, team photos, caustic textures

vercel.json      Clean URLs and caching
```

## How enquiries reach you

There is no server, so nothing is submitted anywhere. Instead:

**Send on WhatsApp** opens WhatsApp with every answer already written
into the message. The client presses send. This works everywhere and
needs nothing set up.

**Send by Email** opens whatever email program the visitor uses, with
the booking already filled in and addressed to you.

Both check the form is complete first.

The honest limitation: the email button depends on the visitor having
an email program configured. On a phone that is usually fine. On a
shared computer it sometimes is not. WhatsApp has no such problem,
which is why it is the gold button.

---

## Changing things

The text lives directly in the HTML files. Open one in any text
editor, find the words, change them, save.

| To change | Open |
| --- | --- |
| Prices | `services.html`, search for `NGN XXX` |
| Service descriptions | `services.html` |
| Founder name and bio | `about.html` |
| Homepage wording | `index.html` |

### Phone number or email

These appear on more than one page, so search every `.html` file and
also `assets/js/script.js`:

- `07087054909` the WhatsApp number shown to visitors
- `2347087054909` the same number in international form, used by the
  WhatsApp links
- `07035543697` the phone number
- `aoluxeevents@gmail.com` the email address

### Photographs

Replace the file in `assets/images/`, keeping the same name. Resize
large photographs first. Anything much over 400KB is slow on mobile
data.

---

## The hero

The homepage hero puts light, water and typography on one clock. Two
caustic sheets drift in opposite directions behind the logo, which
blends into them so the light appears to pass through the artwork,
and the editorial line wipes open on the same timeline.

The caustics are `assets/images/caustic-a.svg` and `caustic-b.svg`.
Each is fractal noise with a single narrow contour band sliced out of
it, which is what leaves thin filaments rather than marbling. Both
files carry comments explaining the technique.

To calm the effect down, lower these two numbers in
`assets/css/styles.css`:

```css
@keyframes hero-light-rise      { ... to { opacity: 0.30 } }
@keyframes hero-light-rise-soft { ... to { opacity: 0.15 } }
```

Visitors who ask their system for reduced motion get the finished
frame with the water held still.

### The logo

`assets/images/logo.jpg` is the original supplied file and should
never be redrawn or recoloured. It has a solid `#0C0C0C` background,
a shade darker than the page, which would otherwise show as a faint
dark rectangle. The `mix-blend-mode: lighten` on each logo drops that
black so the gold sits directly on the page.

---

## About the business

AO Luxe Events is a **planning house**. It does not decorate or cater
itself; it sources, negotiates with and manages the specialists who
do. The wording across the site is careful about that, so please keep
it when editing.
