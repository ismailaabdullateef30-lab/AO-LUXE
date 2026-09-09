# AO Luxe Events - HTML, CSS and JavaScript

The AO Luxe Events website as plain files. No PHP, no Node, no build
step, no database and nothing to install.

*...Class, Value & Elegance*

---

## Looking at it

**Double-click `index.html`.** That is the whole thing. It opens in your
browser and every page, photograph and the film all work.

## Putting it online

### GitHub Pages, free

This folder is already a git repository with everything committed, and
it already contains the `.nojekyll` file GitHub Pages needs.

Every file is now small, so you can either push with git or drag the
files straight into GitHub's web uploader.

To push with git, once you are signed in to GitHub on this computer:

```bash
cd "~/Desktop/AO LUXE /ao-luxe-html"
git remote add origin https://github.com/YOURNAME/REPONAME.git
git push -u origin main
```

Then in the repository on github.com go to **Settings**, then **Pages**,
set Source to **Deploy from a branch**, choose **main** and the **/ (root)**
folder, and Save. The site is live a few minutes later at
`https://YOURNAME.github.io/REPONAME`.

GitHub Pages allows roughly 1GB per repository and around 100GB of
traffic a month, which is comfortable for a site this size.

### Ordinary web hosting

Upload everything into `public_html` using File Manager or FTP. Done.

Both work because these are just files. Any host anywhere will serve
them.

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
  js/script.js   Menu and forms
  images/        Logo, gallery photographs, team photographs
```

Five pages, one stylesheet, one script. Nothing hidden.

---

## Changing things

Because there is no server, the text lives directly in the HTML files.
Open one in any text editor, find the words, change them, save.

| To change | Open |
| --- | --- |
| Prices | `services.html`, search for `NGN XXX` |
| Service descriptions | `services.html` |
| Founder name and bio | `about.html` |
| Phone, WhatsApp, email | see the note below |
| Homepage wording | `index.html` |

### Changing the phone number or email

These appear on more than one page, so search every `.html` file for
the old number and replace it. There are four places that matter:

- `07087054909` is the WhatsApp number shown to visitors
- `2347087054909` is the same number in international form, used by the
  WhatsApp links, and in `assets/js/script.js`
- `07035543697` is the phone number
- `aoluxeevents@gmail.com` is the email, also in `assets/js/script.js`

### Changing photographs

Put the new file in `assets/images/`, keeping the same name as the one
it replaces, and it appears automatically. Resize large photographs
first. Anything much over 400KB is slow on mobile data.

---

## How the forms send

There is no server, so nothing is submitted anywhere. Instead:

**Send on WhatsApp** opens WhatsApp with every answer already written
into the message. The client presses send. This is the better button,
it works everywhere and needs nothing.

**Send by Email** opens whatever email program the visitor uses, with
the booking already filled in, addressed to you. They press send.

Both check the form is complete first.

The honest limitation: the email button depends on the visitor having
an email program set up. On a phone that is usually fine. On a shared
computer it sometimes is not, and nothing happens when they press it.
WhatsApp has no such problem, which is why it leads.

If you would rather email arrived automatically without the visitor
doing anything, that needs a server, and the PHP version in
`ao-luxe-php` does exactly that.

---

## Styling

`assets/css/styles.css` holds every style. It was generated with
Tailwind and contains only the classes this site uses, which is why it
is small. Edit it directly if you want to change something.

| Colour | Value |
| --- | --- |
| Gold | `#B8952A` |
| Black | `#111111` |
| Off-white | `#F5F0E8` |

Fonts are Cormorant Garamond for headings and Inter for body text,
loaded from Google Fonts in the top of each HTML file.

### The logo

`assets/images/logo.jpg` is the original supplied file and should never
be redrawn or recoloured. It has a solid `#0C0C0C` background, a shade
darker than the page, which would otherwise show as a faint dark
rectangle around it. The `mix-blend-lighten` class on each logo drops
that black so the gold sits directly on the page. If you ever put the
logo on a light background, remove that class.

---

## About the business

AO Luxe Events is a **planning house**. It does not decorate or cater
itself; it sources, negotiates with and manages the specialists who do.
The wording across the site is careful about that, so please keep it.
