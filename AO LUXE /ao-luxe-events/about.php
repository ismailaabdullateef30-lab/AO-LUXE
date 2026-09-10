<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/team.php';
$PAGE_TITLE = 'About | ' . $SITE['name'];
$PAGE_DESCRIPTION = 'Meet the founder and team behind AO Luxe Events, a Nigerian luxury event planning house built on class, value and elegance.';
require __DIR__ . '/includes/header.php';
?>

<section class="border-b border-ink-line">
  <div class="section text-center">
    <p class="eyebrow">Our Story</p>
    <h1 class="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">The people behind the evenings you remember</h1>
    <p class="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
      <?= e($SITE['name']) ?> is a small, deliberate team. The same people who take
      your first call are the ones standing in the room on the day, which is exactly how we like it.
    </p>
  </div>
</section>

<section class="section">
  <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5">
      <div class="aspect-[4/5] w-full overflow-hidden border border-ink-line bg-ink-soft">
        <img src="<?= e($OWNER['photo']) ?>" alt="<?= e($OWNER['name'] . ', ' . $OWNER['role'] . ' of ' . $SITE['name']) ?>" class="h-full w-full object-cover">
      </div>
    </div>
    <div class="lg:col-span-6 lg:col-start-7">
      <p class="eyebrow">Founder</p>
      <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl"><?= e($OWNER['name']) ?></h2>
      <?php if ($OWNER['name'] !== $OWNER['role']): ?>
        <p class="mt-3 font-body text-[11px] uppercase tracking-[0.18em] text-gold"><?= e($OWNER['role']) ?></p>
      <?php endif; ?>
      <p class="mt-7 font-body text-base leading-relaxed text-cream-muted"><?= e($OWNER['bio']) ?></p>
      <p class="mt-8 border-l-2 border-gold pl-5 font-display text-2xl italic text-gold"><?= e($SITE['tagline']) ?></p>
    </div>
  </div>
</section>

<section class="border-y border-ink-line bg-ink-soft/40">
  <div class="section grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-6">
      <p class="eyebrow">The Team</p>
      <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">Specialists, not generalists</h2>
      <p class="mt-5 font-body text-base leading-relaxed text-cream-muted">
        Every part of your event is held by someone who does that one thing
        properly, and all of them report to a single coordinator, so you never
        have to chase four vendors for one answer.
      </p>
      <p class="mt-5 font-body text-base leading-relaxed text-cream-muted"><?= e($TEAM_PHOTO['caption']) ?></p>
      <p class="mt-8 border-l-2 border-gold pl-5 font-body text-sm leading-relaxed text-cream">
        The same people who take your first call are the ones standing in the room on the day.
      </p>
    </div>
    <div class="lg:col-span-6">
      <div class="aspect-[3/4] w-full overflow-hidden border border-ink-line bg-ink-soft">
        <img src="<?= e($TEAM_PHOTO['photo']) ?>" alt="<?= e($TEAM_PHOTO['alt']) ?>" loading="lazy" class="h-full w-full object-cover">
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="max-w-2xl">
    <p class="eyebrow">How We Work</p>
    <h2 class="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">Three steps, start to finish</h2>
  </div>
  <div class="mt-14 grid gap-10 md:grid-cols-3">
    <?php foreach ($APPROACH as $item): ?>
      <div class="border-t border-gold/30 pt-7">
        <span class="font-body text-[11px] tracking-[0.2em] text-gold/60"><?= e($item['step']) ?></span>
        <h3 class="mt-3 font-display text-2xl text-cream"><?= e($item['title']) ?></h3>
        <p class="mt-4 font-body text-sm leading-relaxed text-cream-muted"><?= e($item['body']) ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<?php
$CTA_HEADING = 'Let us talk about your occasion';
$CTA_SUB = 'Share the date and the vision. We will tell you honestly what it takes.';
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
