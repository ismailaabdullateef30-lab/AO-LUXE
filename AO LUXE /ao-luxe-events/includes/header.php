<?php
/**
 * HEADER
 *
 * Included at the top of every page. Set $PAGE_TITLE and
 * $PAGE_DESCRIPTION before including this file.
 */
require_once __DIR__ . '/config.php';

$PAGE_TITLE = $PAGE_TITLE ?? ($SITE['name'] . ' | Class, Value & Elegance');
$PAGE_DESCRIPTION = $PAGE_DESCRIPTION ?? $SITE['blurb'];
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($PAGE_TITLE) ?></title>
<meta name="description" content="<?= e($PAGE_DESCRIPTION) ?>">
<link rel="icon" href="<?= e($SITE['logo']) ?>">

<meta property="og:title" content="<?= e($PAGE_TITLE) ?>">
<meta property="og:description" content="<?= e($PAGE_DESCRIPTION) ?>">
<meta property="og:image" content="<?= e($SITE['logo']) ?>">
<meta property="og:type" content="website">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="flex min-h-screen flex-col bg-ink font-body text-cream antialiased">

<header id="site-header" class="sticky top-0 z-50 border-b border-transparent bg-ink transition-colors duration-300">
  <nav class="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">

    <!--
      The logo file has a solid #0C0C0C background, a shade darker than
      the page. mix-blend-lighten drops that black so the gold sits
      directly on the page. The artwork itself is never altered.
    -->
    <a href="index.php" aria-label="<?= e($SITE['name']) ?> home" class="block w-[86px] sm:w-[104px]">
      <img src="<?= e($SITE['logo']) ?>" alt="<?= e($SITE['name'] . ', ' . $SITE['tagline']) ?>"
           width="1190" height="935" class="h-auto w-full mix-blend-lighten">
    </a>

    <ul class="hidden items-center gap-9 md:flex">
      <?php foreach ($NAV as $file => $label): ?>
        <li>
          <a href="<?= e($file) ?>"
             class="font-body text-[13px] uppercase tracking-[0.16em] transition-colors duration-200 <?= is_current($file) ? 'text-gold' : 'text-cream hover:text-gold-light' ?>">
            <?= e($label) ?>
          </a>
        </li>
      <?php endforeach; ?>
      <li>
        <a href="book.php" class="border border-gold bg-gold px-5 py-2.5 font-body text-[12px] uppercase tracking-[0.16em] text-ink transition-all duration-200 hover:bg-gold-light">
          Book Your Event
        </a>
      </li>
    </ul>

    <button type="button" id="menu-toggle" aria-expanded="false" aria-label="Open menu"
            class="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden">
      <span class="block h-px w-6 bg-gold transition-transform duration-300"></span>
      <span class="block h-px w-6 bg-gold transition-opacity duration-200"></span>
      <span class="block h-px w-6 bg-gold transition-transform duration-300"></span>
    </button>
  </nav>

  <div id="mobile-menu" class="hidden border-t border-ink-line bg-ink md:hidden">
    <ul class="flex flex-col px-6 py-2">
      <?php foreach ($NAV as $file => $label): ?>
        <li class="border-b border-ink-line last:border-0">
          <a href="<?= e($file) ?>" class="block py-4 font-body text-sm uppercase tracking-[0.16em] <?= is_current($file) ? 'text-gold' : 'text-cream' ?>">
            <?= e($label) ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
    <div class="px-6 pb-6">
      <a href="book.php" class="block bg-gold px-5 py-3 text-center font-body text-[12px] uppercase tracking-[0.16em] text-ink">Book Your Event</a>
    </div>
  </div>
</header>

<main class="flex-1">
