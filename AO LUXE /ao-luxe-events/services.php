<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/services.php';
$PAGE_TITLE = 'Services | ' . $SITE['name'];
$PAGE_DESCRIPTION = 'Full event planning, partial planning, day-of coordination, and venue and vendor sourcing from AO Luxe Events.';
require __DIR__ . '/includes/header.php';
?>

<section class="border-b border-ink-line">
  <div class="section text-center">
    <p class="eyebrow">Our Services</p>
    <h1 class="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">Planning, at the level you need it</h1>
    <p class="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
      Four ways in, depending on how much of the work you want to carry yourself.
      We are a planning house. We do not decorate or cater; we source the
      specialists who do and hold them to their word, which keeps our advice on
      your side rather than our own price list.
    </p>
    <p class="mx-auto mt-5 max-w-2xl font-body text-sm leading-relaxed text-cream-muted/70">
      Prices below are starting points. Every quote is built around your guest
      count, venue and date, and we put it in writing before anything is committed.
    </p>
  </div>
</section>

<?php foreach ($SERVICES as $index => $service):
  $flipped = ($index % 2) === 1; ?>
  <section id="<?= e($service['id']) ?>" class="border-b border-ink-line <?= $flipped ? 'bg-ink-soft/40' : 'bg-ink' ?>">
    <div class="section grid gap-12 lg:grid-cols-12 lg:gap-16">

      <div class="lg:col-span-5 <?= $flipped ? 'lg:order-2 lg:col-start-8' : '' ?>">
        <div class="h-10 w-10 text-gold"><?php include __DIR__ . '/includes/icon.php'; ?></div>
        <span class="mt-6 block font-body text-[11px] tracking-[0.2em] text-gold/60">0<?= $index + 1 ?></span>
        <h2 class="mt-2 font-display text-4xl leading-tight text-cream sm:text-5xl"><?= e($service['title']) ?></h2>
        <p class="mt-6 font-body text-base leading-relaxed text-cream-muted"><?= e($service['description']) ?></p>
        <p class="mt-8 border-l-2 border-gold pl-4 font-display text-2xl text-gold"><?= e($service['price']) ?></p>
        <a href="book.php?service=<?= e($service['id']) ?>" class="btn-gold mt-8">Book This Service</a>
      </div>

      <div class="lg:col-span-6 <?= $flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7' ?>">
        <div class="border border-ink-line bg-ink-soft p-8 lg:p-10">
          <h3 class="font-body text-[11px] uppercase tracking-[0.2em] text-gold">What Is Included</h3>
          <ul class="mt-7 space-y-4">
            <?php foreach ($service['includes'] as $item): ?>
              <li class="flex gap-4">
                <span aria-hidden="true" class="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold"></span>
                <span class="font-body text-sm leading-relaxed text-cream"><?= e($item) ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
  </section>
<?php endforeach; ?>

<?php
$CTA_HEADING = 'Not sure which service you need?';
$CTA_SUB = 'Send us the details of your occasion and we will advise honestly, with no obligation.';
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
