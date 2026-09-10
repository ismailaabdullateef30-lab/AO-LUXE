<?php
/**
 * HOMEPAGE
 *
 *   1. Hero, with the staged reveal
 *   2. Introduction
 *   3. Services, four cards
 *   4. Why Choose Us
 *   5. Recent Work, five photographs
 *   6. Call to action banner
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/services.php';
require_once __DIR__ . '/includes/team.php';

$PAGE_TITLE = $SITE['name'] . ' | Class, Value & Elegance';
$PAGE_DESCRIPTION = 'AO Luxe Events plans and coordinates luxury weddings, birthdays and corporate occasions across Nigeria. Class, value and elegance from first idea to final flourish.';
require __DIR__ . '/includes/header.php';
?>

<!--
  1. HERO
  Light, water and typography on one clock. The caustic sheets drift
  behind the mark; the logo blends into them rather than sitting on
  top, so the light appears to pass through the artwork. Timings and
  the full timeline are documented in assets/css/styles.css.
-->
<section class="hero">
  <div class="hero-water hero-water--a" aria-hidden="true"></div>
  <div class="hero-water hero-water--b" aria-hidden="true"></div>
  <div class="hero-pool" aria-hidden="true"></div>
  <div class="hero-vignette" aria-hidden="true"></div>

  <div class="hero-copy">
    <div class="hero-mark">
      <img src="<?= e($SITE['logo']) ?>" alt="<?= e($SITE['name'] . ', ' . $SITE['tagline']) ?>"
           width="1190" height="935">
    </div>

    <p class="hero-line">Weddings, milestones and private occasions</p>

    <div class="hero-rule">
      <span aria-hidden="true"></span>
      <span class="hero-place">Nigeria</span>
      <span aria-hidden="true"></span>
    </div>

    <a href="book.php" class="btn-gold hero-cta">Book Your Event</a>
  </div>
</section>

<!-- 2. INTRODUCTION -->
<section class="section text-center">
  <p class="eyebrow">Welcome to AO Luxe Events</p>
  <h1 class="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.15] text-cream sm:text-5xl">
    Occasions worth remembering, planned with care from the very first idea.
  </h1>
  <p class="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
    AO Luxe Events is an event planning house working across Nigeria. We take on
    weddings, milestone birthdays, private dinners and corporate occasions,
    building the concept, holding the budget, sourcing and managing every vendor,
    and running the day itself, so you can arrive as a guest at your own celebration.
  </p>
  <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
    <a href="services.php" class="btn-outline">Explore Our Services</a>
    <a href="about.php" class="btn-outline">Meet The Team</a>
  </div>
</section>

<!-- 3. SERVICES -->
<section class="border-y border-ink-line bg-ink-soft/40">
  <div class="section">
    <div class="max-w-2xl">
      <p class="eyebrow">What We Do</p>
      <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">Four ways to work with us</h2>
      <p class="mt-5 font-body text-base leading-relaxed text-cream-muted">
        Hand us the whole occasion, or just the part you would rather not carry.
        Either way, the same team and the same standard see it through.
      </p>
    </div>

    <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <?php foreach ($SERVICES as $service): ?>
        <article class="group flex h-full flex-col border border-ink-line bg-ink-soft p-8 transition-all duration-300 hover:border-gold/50">
          <div class="h-9 w-9 text-gold"><?php include __DIR__ . '/includes/icon.php'; ?></div>
          <h3 class="mt-6 font-display text-2xl text-cream"><?= e($service['title']) ?></h3>
          <p class="mt-3 flex-1 font-body text-sm leading-relaxed text-cream-muted"><?= e($service['short']) ?></p>
          <a href="services.php#<?= e($service['id']) ?>" class="mt-6 inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.16em] text-gold transition-colors duration-200 hover:text-gold-light">
            Learn More <span aria-hidden="true">&rarr;</span>
          </a>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 4. WHY CHOOSE US -->
<section class="section">
  <div class="max-w-2xl">
    <p class="eyebrow">Why Choose Us</p>
    <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">Three words we actually hold ourselves to</h2>
  </div>
  <div class="mt-14 grid gap-10 md:grid-cols-3">
    <?php foreach ($PILLARS as $i => $pillar): ?>
      <div class="border-t border-gold/30 pt-7">
        <span class="font-body text-[11px] tracking-[0.2em] text-gold/60">0<?= $i + 1 ?></span>
        <h3 class="mt-3 font-display text-3xl text-cream"><?= e($pillar['title']) ?></h3>
        <p class="mt-4 font-body text-sm leading-relaxed text-cream-muted"><?= e($pillar['body']) ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- 5. RECENT WORK -->
<section id="recent-work" class="border-t border-ink-line bg-ink-soft/40">
  <div class="section">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="max-w-xl">
        <p class="eyebrow">Recent Work</p>
        <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">A look at days we have planned</h2>
      </div>
      <a href="<?= e($SITE['instagram_url']) ?>" target="_blank" rel="noopener" class="font-body text-[12px] uppercase tracking-[0.16em] text-gold transition-colors duration-200 hover:text-gold-light">
        See more on Instagram &rarr;
      </a>
    </div>

    <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <?php foreach ($GALLERY as $photo): ?>
        <div class="aspect-[3/4] w-full overflow-hidden border border-ink-line bg-ink-soft">
          <img src="<?= e($photo['src']) ?>" alt="<?= e($photo['alt']) ?>" loading="lazy"
               class="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]">
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/cta.php'; ?>
<?php require __DIR__ . '/includes/footer.php'; ?>
