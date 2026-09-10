</main>

<footer class="border-t border-ink-line bg-ink">
  <div class="mx-auto max-w-content px-6 py-16 lg:px-10">
    <div class="grid gap-12 md:grid-cols-3">

      <div>
        <a href="index.php" class="block w-[168px]">
          <img src="<?= e($SITE['logo']) ?>" alt="<?= e($SITE['name']) ?>"
               width="1190" height="935" class="h-auto w-full mix-blend-lighten">
        </a>
        <p class="mt-5 font-display text-lg italic text-gold"><?= e($SITE['tagline']) ?></p>
        <p class="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream-muted"><?= e($SITE['blurb']) ?></p>
      </div>

      <div>
        <h4 class="font-body text-[11px] uppercase tracking-[0.2em] text-gold">Quick Links</h4>
        <ul class="mt-5 space-y-3">
          <?php foreach ($NAV as $file => $label): ?>
            <li><a href="<?= e($file) ?>" class="font-body text-sm text-cream transition-colors duration-200 hover:text-gold"><?= e($label) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div>
        <h4 class="font-body text-[11px] uppercase tracking-[0.2em] text-gold">Get In Touch</h4>
        <ul class="mt-5 space-y-3 font-body text-sm text-cream">
          <li><a href="<?= e(whatsapp_link()) ?>" target="_blank" rel="noopener" class="transition-colors duration-200 hover:text-gold">WhatsApp &middot; <?= e($SITE['whatsapp_display']) ?></a></li>
          <li><a href="tel:<?= e($SITE['phone_intl']) ?>" class="transition-colors duration-200 hover:text-gold">Call &middot; <?= e($SITE['phone_display']) ?></a></li>
          <li><a href="mailto:<?= e($SITE['email']) ?>" class="break-all transition-colors duration-200 hover:text-gold"><?= e($SITE['email']) ?></a></li>
          <li><a href="<?= e($SITE['instagram_url']) ?>" target="_blank" rel="noopener" class="transition-colors duration-200 hover:text-gold"><?= e($SITE['instagram_handle']) ?></a></li>
        </ul>
      </div>
    </div>

    <div class="mt-14 border-t border-ink-line pt-6">
      <p class="font-body text-xs tracking-wide text-cream-muted">
        &copy; <?= date('Y') ?> <?= e($SITE['name']) ?>. All rights reserved.
      </p>
    </div>
  </div>
</footer>

<script src="assets/js/script.js"></script>
</body>
</html>
