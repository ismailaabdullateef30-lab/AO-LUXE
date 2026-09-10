<?php
/**
 * CONTACT PAGE
 *
 *   1. Header
 *   2. Contact cards: WhatsApp, phone, email, Instagram, all clickable
 *   3. Map and a short message form
 *
 * The message form emails us using includes/mail.php, the same way
 * the booking form does.
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/mail.php';

$errors = [];
$sent   = false;
$c = ['name' => '', 'email' => '', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['company'])) {          // honeypot
        $sent = true;
    } else {
        foreach (array_keys($c) as $k) {
            $c[$k] = trim((string) ($_POST[$k] ?? ''));
        }
        if (strlen($c['name']) < 2)                          $errors['name'] = 'Please tell us your name.';
        if (!filter_var($c['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'That email does not look right.';
        if (strlen($c['message']) < 5)                       $errors['message'] = 'Please write a little more.';

        if (!$errors) {
            $ok = send_enquiry('Website enquiry: ' . $c['name'], [
                'Name' => $c['name'], 'Email' => $c['email'], 'Message' => $c['message'],
            ], $c['email']);
            if ($ok) {
                $sent = true;
            } else {
                $errors['form'] = 'We could not send that just now. Please message us on WhatsApp, or write to ' . $SITE['email'] . '.';
            }
        }
    }
}

$PAGE_TITLE = 'Contact | ' . $SITE['name'];
$PAGE_DESCRIPTION = 'Reach AO Luxe Events by WhatsApp, phone, email or Instagram, or send a message straight from this page.';
require __DIR__ . '/includes/header.php';

$channels = [
    ['label' => 'WhatsApp',  'value' => $SITE['whatsapp_display'], 'href' => whatsapp_link(),              'note' => 'Fastest reply, usually within the hour', 'ext' => true],
    ['label' => 'Phone',     'value' => $SITE['phone_display'],    'href' => 'tel:' . $SITE['phone_intl'], 'note' => 'Mon to Sat, 9am to 7pm WAT',            'ext' => false],
    ['label' => 'Email',     'value' => $SITE['email'],            'href' => 'mailto:' . $SITE['email'],   'note' => 'For quotes, briefs and documents',       'ext' => false],
    ['label' => 'Instagram', 'value' => $SITE['instagram_handle'], 'href' => $SITE['instagram_url'],       'note' => 'See our most recent events',             'ext' => true],
];
?>

<section class="border-b border-ink-line">
  <div class="section text-center">
    <p class="eyebrow">Contact</p>
    <h1 class="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">We are available and ready</h1>
    <p class="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
      Whichever way you prefer to reach us, someone from the team will get back to
      you. For a full event enquiry, the <a href="book.php" class="text-gold underline underline-offset-4">booking form</a>
      gets you a faster, more detailed answer.
    </p>
  </div>
</section>

<section class="section">
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($channels as $ch): ?>
      <a href="<?= e($ch['href']) ?>" <?= $ch['ext'] ? 'target="_blank" rel="noopener"' : '' ?>
         class="group flex flex-col border border-ink-line bg-ink-soft p-7 transition-all duration-300 hover:border-gold/50">
        <span class="font-body text-[11px] uppercase tracking-[0.18em] text-gold"><?= e($ch['label']) ?></span>
        <span class="mt-2 break-all font-display text-xl text-cream"><?= e($ch['value']) ?></span>
        <span class="mt-3 font-body text-xs leading-relaxed text-cream-muted"><?= e($ch['note']) ?></span>
      </a>
    <?php endforeach; ?>
  </div>
</section>

<section class="border-t border-ink-line bg-ink-soft/40">
  <div class="section grid gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5">
      <p class="eyebrow">Where We Are</p>
      <h2 class="mt-5 font-display text-3xl leading-tight text-cream">Based in <?= e($SITE['location']) ?></h2>
      <p class="mt-4 font-body text-sm leading-relaxed text-cream-muted">
        We plan and deliver events nationwide. Consultations happen at our office,
        at your venue, or over a video call, whichever suits you.
      </p>
      <!--
        To pin an exact address: open Google Maps, find the place, click
        Share then Embed a map, and paste that iframe's src below.
      -->
      <div class="mt-7 aspect-[4/3] w-full overflow-hidden border border-ink-line">
        <iframe title="Map showing <?= e($SITE['location']) ?>" loading="lazy" class="h-full w-full grayscale-[0.4]"
                src="https://maps.google.com/maps?q=<?= rawurlencode($SITE['location']) ?>&t=&z=11&ie=UTF8&iwloc=&output=embed"></iframe>
      </div>
    </div>

    <div class="lg:col-span-6 lg:col-start-7">
      <p class="eyebrow">Send A Message</p>
      <h2 class="mt-5 font-display text-3xl leading-tight text-cream">A quick question is welcome too</h2>
      <p class="mt-4 font-body text-sm leading-relaxed text-cream-muted">
        Not ready for a full booking form? Write us a line here and we will pick
        it up from there.
      </p>

      <?php if ($sent): ?>
        <div class="mt-7 border border-gold/40 bg-ink-soft p-10 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold"><span class="font-display text-xl text-gold">&check;</span></div>
          <h3 class="mt-6 font-display text-2xl text-cream">Thank you! We will be in touch within 24 hours.</h3>
          <a href="contact.php" class="btn-outline mt-7">Send Another Message</a>
        </div>
      <?php else: ?>
        <form method="post" action="contact.php" novalidate class="mt-7 border border-ink-line bg-ink-soft/60 p-6 sm:p-8">
          <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute left-[-9999px] h-px w-px opacity-0">

          <?php if (!empty($errors['form'])): ?>
            <p role="alert" class="mb-5 border border-[#E0876A]/40 bg-[#E0876A]/10 px-4 py-3 font-body text-sm text-[#E0876A]"><?= e($errors['form']) ?></p>
          <?php endif; ?>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="cname" class="field-label">Name <span class="text-gold">*</span></label>
              <input id="cname" name="name" type="text" placeholder="Your name" class="field" value="<?= e($c['name']) ?>">
              <?php if (!empty($errors['name'])): ?><span class="field-error"><?= e($errors['name']) ?></span><?php endif; ?>
            </div>
            <div>
              <label for="cemail" class="field-label">Email <span class="text-gold">*</span></label>
              <input id="cemail" name="email" type="email" placeholder="you@example.com" class="field" value="<?= e($c['email']) ?>">
              <?php if (!empty($errors['email'])): ?><span class="field-error"><?= e($errors['email']) ?></span><?php endif; ?>
            </div>
          </div>

          <div class="mt-5">
            <label for="cmessage" class="field-label">Message <span class="text-gold">*</span></label>
            <textarea id="cmessage" name="message" rows="5" placeholder="How can we help?" class="field resize-y"><?= e($c['message']) ?></textarea>
            <?php if (!empty($errors['message'])): ?><span class="field-error"><?= e($errors['message']) ?></span><?php endif; ?>
          </div>

          <button type="submit" class="btn-gold mt-7">Send Message</button>
        </form>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
