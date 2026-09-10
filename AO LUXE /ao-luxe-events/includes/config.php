<?php
/**
 * BRAND AND CONTACT DETAILS
 *
 * Everything about how AO Luxe Events is named and reached lives here.
 * Change a phone number once in this file and it updates on every page,
 * in the navigation and in the footer automatically.
 */

$SITE = [
    'name'    => 'AO Luxe Events',
    'tagline' => '...Class, Value & Elegance',
    'blurb'   => 'Luxury event planning and coordination across Nigeria.',

    // The exact logo file supplied by the client.
    // Do not redraw, recolour or replace it.
    'logo'    => 'assets/images/logo.jpg',

    // Displayed exactly as written locally.
    'whatsapp_display' => '07087054909',
    // International format, digits only. Required by wa.me links.
    'whatsapp_intl'    => '2347087054909',
    'phone_display'    => '07035543697',
    'phone_intl'       => '+2347035543697',
    'email'            => 'aoluxeevents@gmail.com',
    'instagram_handle' => '@aoluxe_events',
    'instagram_url'    => 'https://instagram.com/aoluxe_events',
    'location'         => 'Lagos, Nigeria',
];

/** Main navigation. Add a page here and it appears in the nav and footer. */
$NAV = [
    'index.php'    => 'Home',
    'about.php'    => 'About',
    'services.php' => 'Services',
    'book.php'     => 'Book',
    'contact.php'  => 'Contact',
];

/** Builds a WhatsApp link with a message already typed in. */
function whatsapp_link($message = 'Hello AO Luxe Events, I would like to enquire about booking an event.')
{
    global $SITE;
    return 'https://wa.me/' . $SITE['whatsapp_intl'] . '?text=' . rawurlencode($message);
}

/** Shorthand for escaping anything printed into the page. */
function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/** True when $file is the page currently being viewed. */
function is_current($file)
{
    return basename($_SERVER['PHP_SELF']) === $file;
}
