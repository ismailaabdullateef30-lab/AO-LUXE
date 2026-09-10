<?php
/**
 * BOOKING PAGE
 *
 * The form submits two ways, both carrying the same answers:
 *
 *   "Send on WhatsApp" is handled entirely in the browser by
 *   assets/js/script.js. It needs no server and works on every host.
 *
 *   "Send by Email" posts back to this page, which validates the
 *   answers and emails them using includes/mail.php. This needs a
 *   host that allows PHP's mail() function.
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/services.php';
require_once __DIR__ . '/includes/mail.php';

$EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Private Dinner', 'Other'];

$errors = [];
$sent   = false;
$values = [
    'name' => '', 'email' => '', 'phone' => '', 'eventType' => '',
    'services' => [], 'eventDate' => '', 'guestCount' => '',
    'location' => '', 'notes' => '',
];

// A service can be pre-ticked by linking to book.php?service=day-of
if (isset($_GET['service'])) {
    $values['services'] = [$_GET['service']];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Honeypot. Real people never fill this in, spam bots do.
    if (!empty($_POST['company'])) {
        $sent = true;
    } else {
        foreach (array_keys($values) as $key) {
            if ($key === 'services') {
                $values[$key] = isset($_POST[$key]) && is_array($_POST[$key]) ? $_POST[$key] : [];
            } else {
                $values[$key] = trim((string) ($_POST[$key] ?? ''));
            }
        }

        if (strlen($values['name']) < 2) {
            $errors['name'] = 'Please tell us your name.';
        }
        if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'That email does not look right.';
        }
        if (strlen(preg_replace('/\D/', '', $values['phone'])) < 10) {
            $errors['phone'] = 'Use a Nigerian format, for example 07087054909.';
        }
        if ($values['eventType'] === '') {
            $errors['eventType'] = 'Please choose an event type.';
        }
        if (count($values['services']) === 0) {
            $errors['services'] = 'Choose at least one service.';
        }

        if (!$errors) {
            $titles = [];
            foreach ($values['services'] as $id) {
                $found = service_by_id($id);
                $titles[] = $found ? $found['title'] : $id;
            }

            $ok = send_enquiry(
                'New booking request: ' . $values['eventType'] . ', ' . $values['name'],
                [
                    'Name'       => $values['name'],
                    'Email'      => $values['email'],
                    'Phone'      => $values['phone'],
                    'Event type' => $values['eventType'],
                    'Services'   => implode(', ', $titles),
                    'Date'       => $values['eventDate'],
                    'Guests'     => $values['guestCount'],
                    'Location'   => $values['location'],
                    'Notes'      => $values['notes'],
                ],
                $values['email']
            );

            if ($ok) {
                $sent = true;
            } else {
                $errors['form'] = 'We could not send that by email just now. Please use the WhatsApp button instead, or write to ' . $SITE['email'] . '.';
            }
        }
    }
}

$PAGE_TITLE = 'Book Your Event | ' . $SITE['name'];
$PAGE_DESCRIPTION = 'Request a booking with AO Luxe Events. Tell us your date, guest count and the services you need. We reply within 24 hours.';
require __DIR__ . '/includes/header.php';
?>

<section class="border-b border-ink-line">
  <div class="section text-center">
    <p class="eyebrow">Booking</p>
    <h1 class="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">Let us begin with the details</h1>
    <p class="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
      Fill in what you know so far. Nothing here is binding. We will come back
      with availability, honest pricing and a first idea of how your occasion could look.
    </p>
  </div>
</section>

<section class="section">
  <div class="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
    <div class="lg:col-span-8">

      <?php if ($sent): ?>
        <div class="border border-gold/40 bg-ink-soft p-10 text-center sm:p-14">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold">
            <span class="font-display text-2xl text-gold">&check;</span>
          </div>
          <h2 class="mt-7 font-display text-3xl text-cream">Thank you! We will be in touch within 24 hours.</h2>
          <p class="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-cream-muted">
            Your booking request is with our team. If your date is close, message us on WhatsApp.
          </p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="<?= e(whatsapp_link()) ?>" target="_blank" rel="noopener" class="btn-gold">Chat on WhatsApp</a>
            <a href="book.php" class="btn-outline">Send Another Request</a>
          </div>
        </div>

      <?php else: ?>
        <form method="post" action="book.php" id="booking-form" novalidate
              class="border border-ink-line bg-ink-soft/60 p-6 sm:p-10"
              data-whatsapp="https://wa.me/<?= e($SITE['whatsapp_intl']) ?>">

          <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true"
                 class="absolute left-[-9999px] h-px w-px opacity-0">

          <?php if (!empty($errors['form'])): ?>
            <p role="alert" class="mb-6 border border-[#E0876A]/40 bg-[#E0876A]/10 px-4 py-3 font-body text-sm text-[#E0876A]"><?= e($errors['form']) ?></p>
          <?php endif; ?>

          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="name" class="field-label">Full Name <span class="text-gold">*</span></label>
              <input id="name" name="name" type="text" placeholder="Your full name" class="field" value="<?= e($values['name']) ?>">
              <?php if (!empty($errors['name'])): ?><span class="field-error"><?= e($errors['name']) ?></span><?php endif; ?>
            </div>

            <div>
              <label for="email" class="field-label">Email Address <span class="text-gold">*</span></label>
              <input id="email" name="email" type="email" placeholder="you@example.com" class="field" value="<?= e($values['email']) ?>">
              <?php if (!empty($errors['email'])): ?><span class="field-error"><?= e($errors['email']) ?></span><?php endif; ?>
            </div>

            <div>
              <label for="phone" class="field-label">Phone Number <span class="text-gold">*</span></label>
              <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="070XXXXXXXX" class="field" value="<?= e($values['phone']) ?>">
              <?php if (!empty($errors['phone'])): ?>
                <span class="field-error"><?= e($errors['phone']) ?></span>
              <?php else: ?>
                <span class="mt-1.5 block font-body text-xs text-cream-muted/60">Nigerian format, for example 070XXXXXXXX</span>
              <?php endif; ?>
            </div>

            <div>
              <label for="eventType" class="field-label">Event Type <span class="text-gold">*</span></label>
              <select id="eventType" name="eventType" class="field [color-scheme:dark]">
                <option value="" <?= $values['eventType'] === '' ? 'selected' : '' ?> disabled>Select an event type</option>
                <?php foreach ($EVENT_TYPES as $type): ?>
                  <option value="<?= e($type) ?>" <?= $values['eventType'] === $type ? 'selected' : '' ?>><?= e($type) ?></option>
                <?php endforeach; ?>
              </select>
              <?php if (!empty($errors['eventType'])): ?><span class="field-error"><?= e($errors['eventType']) ?></span><?php endif; ?>
            </div>

            <div>
              <label for="eventDate" class="field-label">Event Date</label>
              <input id="eventDate" name="eventDate" type="date" class="field [color-scheme:dark]" value="<?= e($values['eventDate']) ?>">
            </div>

            <div>
              <label for="guestCount" class="field-label">Expected Guest Count</label>
              <input id="guestCount" name="guestCount" type="number" min="1" inputmode="numeric" placeholder="e.g. 150" class="field" value="<?= e($values['guestCount']) ?>">
            </div>

            <div class="sm:col-span-2">
              <label for="location" class="field-label">Event Location or Venue</label>
              <input id="location" name="location" type="text" placeholder="City, area, or the venue name if you have one" class="field" value="<?= e($values['location']) ?>">
            </div>
          </div>

          <fieldset class="mt-8">
            <legend class="field-label">Service Required <span class="text-gold">*</span></legend>
            <div class="mt-1 grid gap-3 sm:grid-cols-2">
              <?php foreach ($SERVICES as $service): ?>
                <label class="flex cursor-pointer items-center gap-3 border border-ink-line bg-ink px-4 py-3 transition-colors duration-200 hover:border-gold/50">
                  <input type="checkbox" name="services[]" value="<?= e($service['id']) ?>"
                         <?= in_array($service['id'], $values['services'], true) ? 'checked' : '' ?>
                         class="h-4 w-4 flex-none accent-[#B8952A] [color-scheme:dark]">
                  <span class="font-body text-sm text-cream" data-title><?= e($service['title']) ?></span>
                </label>
              <?php endforeach; ?>
            </div>
            <?php if (!empty($errors['services'])): ?><span class="field-error"><?= e($errors['services']) ?></span><?php endif; ?>
          </fieldset>

          <div class="mt-8">
            <label for="notes" class="field-label">Additional Notes</label>
            <textarea id="notes" name="notes" rows="5" class="field resize-y"
              placeholder="Tell us about the occasion: the theme you have in mind, your budget range, or anything else we should know."><?= e($values['notes']) ?></textarea>
          </div>

          <!--
            Two ways to send the same answers. WhatsApp leads because it
            reaches us fastest and needs nothing set up on the server.
          -->
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" id="whatsapp-send" class="btn-gold">Send on WhatsApp</button>
            <button type="submit" class="btn-outline">Send by Email</button>
          </div>
          <p class="mt-4 font-body text-xs text-cream-muted">Whichever you choose, we reply to every request within 24 hours.</p>
        </form>
      <?php endif; ?>
    </div>

    <aside class="lg:col-span-4">
      <div class="border border-ink-line bg-ink-soft p-7">
        <h2 class="font-body text-[11px] uppercase tracking-[0.2em] text-gold">What Happens Next</h2>
        <ol class="mt-6 space-y-5">
          <li class="flex gap-4"><span class="font-body text-[11px] tracking-[0.15em] text-gold/70">01</span><span class="font-body text-sm leading-relaxed text-cream-muted">We read your request and check the date against our calendar.</span></li>
          <li class="flex gap-4"><span class="font-body text-[11px] tracking-[0.15em] text-gold/70">02</span><span class="font-body text-sm leading-relaxed text-cream-muted">A coordinator calls or emails you within 24 hours with availability and honest pricing.</span></li>
          <li class="flex gap-4"><span class="font-body text-[11px] tracking-[0.15em] text-gold/70">03</span><span class="font-body text-sm leading-relaxed text-cream-muted">If it is a fit, we book a consultation and start building the concept.</span></li>
        </ol>
        <div class="mt-8 border-t border-ink-line pt-6">
          <p class="font-body text-sm text-cream-muted">Prefer to talk it through?</p>
          <a href="<?= e(whatsapp_link()) ?>" target="_blank" rel="noopener" class="mt-3 block font-body text-sm text-gold hover:text-gold-light">WhatsApp <?= e($SITE['whatsapp_display']) ?></a>
          <a href="tel:<?= e($SITE['phone_intl']) ?>" class="mt-2 block font-body text-sm text-gold hover:text-gold-light">Call <?= e($SITE['phone_display']) ?></a>
        </div>
      </div>
    </aside>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
