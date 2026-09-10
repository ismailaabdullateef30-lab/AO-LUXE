# AO Luxe Events

The AO Luxe Events website in PHP, HTML, CSS and JavaScript.
No build step, no Node, no npm, no database. Upload it and it runs.

*...Class, Value & Elegance*

---

## Putting it on InfinityFree

1. Sign in to InfinityFree and open the **Control Panel** for your account.
2. Open **File Manager** (or connect with FTP using the details on the
   account page).
3. Go into the **htdocs** folder. This is the one that is published.
   Delete the placeholder file InfinityFree puts there.
4. Upload everything in this folder into **htdocs**, keeping the
   structure: `index.php` at the top, with `includes/` and `assets/`
   beside it.
5. Visit your address. New InfinityFree accounts can take up to an
   hour before the domain starts working, so do not worry if the
   first attempt fails.

Uploading is faster if you zip this folder first, upload the one zip,
then use the File Manager's Extract option.

The files must sit **directly in htdocs**, not in a folder inside it.
If extracting creates a folder, move the contents up one level.

### PHP version

InfinityFree lets you choose a PHP version in the control panel. This
site only needs **PHP 7.0 or newer**, so anything on offer will work.
Choose 8.1 or 8.2 if you are given the option.

### HTTPS

InfinityFree provides free SSL, but it is not switched on by default.
In the control panel find **Free SSL Certificates**, request one for
your domain, and follow the steps. Browsers now warn visitors on sites
without it.

---

## How enquiries reach you

**Everything goes through WhatsApp on 07087054909.**

On the booking page, the client fills in the form and presses **Send on
WhatsApp**. Their answers are written into the message for them, so all
they do is press send. The contact page's short message form works the
same way.

The form checks it is complete first, so you never receive a half
filled request.

### Why there is no email option

InfinityFree blocks PHP's `mail()` function completely. No email
hosting, no `mail()`, no cron jobs. An email button would look like it
worked and quietly lose enquiries, so there is not one.

Your email address is still shown on the contact page, so anyone who
prefers to write can.

If you later move to a host that allows `mail()`, such as ByetHost or
any paid cPanel host, an email route can be added back.

---

## The files

```
index.php        Homepage
about.php        Founder and team
services.php     The four planning tiers
book.php         Booking form
contact.php      Contact details, map, message form

includes/
  config.php     Phone numbers, email, Instagram, brand details
  services.php   The four services, what each includes, prices
  team.php       Founder, team photo, gallery, homepage text
  header.php     Navigation, shared by every page
  footer.php     Footer, shared by every page
  cta.php        The gold call to action strip
  icon.php       The service icons

assets/
  css/styles.css Every style on the site, already built
  js/script.js   Menu, film player, WhatsApp sending
  images/        Logo, gallery, team photos, film poster
  videos/        The showreel
```

## What to change, and where

| To change | Edit |
| --- | --- |
| Phone, WhatsApp, email, Instagram, address | `includes/config.php` |
| Service names, what is included, **prices** | `includes/services.php` |
| Founder name, role, bio | `includes/team.php` |
| Team photo and caption | `includes/team.php` |
| Recent Work photographs | `includes/team.php` |
| Menu links | `includes/config.php` |
| Event types on the booking form | `book.php`, near the top |

Every price currently reads `Starting from NGN XXX,XXX`. Replace those
with real figures in `includes/services.php`.

The founder is listed as "Founder & Lead Designer" rather than by name.
Change that in `includes/team.php`.

### Photographs

Put the new file in `assets/images/` and point the entry at it. Resize
large photographs first. Anything much over 400KB is slow for visitors
on mobile data.

---


## Styling

`assets/css/styles.css` holds every style. It was generated with
Tailwind and contains only the classes this site uses. Edit it directly.

| Colour | Value |
| --- | --- |
| Gold | `#B8952A` |
| Black | `#111111` |
| Off-white | `#F5F0E8` |

### The logo

`assets/images/logo.jpg` is the original supplied file and should never
be redrawn or recoloured. It has a solid `#0C0C0C` background, a shade
darker than the page, which would otherwise show as a faint dark
rectangle. The `mix-blend-lighten` class on each logo drops that black
so the gold sits directly on the page. If you put the logo on a light
background, remove that class.

---

## About the business

AO Luxe Events is a **planning house**. It does not decorate or cater
itself; it sources, negotiates with and manages the specialists who do.
The wording across the site is careful about that, so please keep it.
