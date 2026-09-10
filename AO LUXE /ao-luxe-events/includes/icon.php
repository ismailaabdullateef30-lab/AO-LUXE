<?php
/**
 * Draws the line icon for whichever $service is in scope.
 * Included from inside a foreach loop over $SERVICES.
 */
$icon = $service['icon'] ?? 'planning';
?>
<?php if ($icon === 'planning'): ?>
  <svg viewBox="0 0 24 24" stroke-width="1.1" class="h-full w-full fill-none stroke-current">
    <path d="M12 2.5 14 8l5.5 2-5.5 2-2 5.5-2-5.5L4.5 10 10 8z" stroke-linejoin="round"/>
    <path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5L15 18l2.6-.9z" stroke-linejoin="round"/>
  </svg>
<?php elseif ($icon === 'partial'): ?>
  <svg viewBox="0 0 24 24" stroke-width="1.1" class="h-full w-full fill-none stroke-current">
    <path d="M8 4.5H6.5A1.5 1.5 0 0 0 5 6v13a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V6a1.5 1.5 0 0 0-1.5-1.5H16" stroke-linejoin="round"/>
    <rect x="8" y="2.5" width="8" height="3.5" rx="1"/>
    <path d="m8.5 12 1.6 1.6L13.5 10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 17h7" stroke-linecap="round"/>
  </svg>
<?php elseif ($icon === 'dayof'): ?>
  <svg viewBox="0 0 24 24" stroke-width="1.1" class="h-full w-full fill-none stroke-current">
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 7v5.2l3.4 2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
<?php else: ?>
  <svg viewBox="0 0 24 24" stroke-width="1.1" class="h-full w-full fill-none stroke-current">
    <path d="M3 20h11" stroke-linecap="round"/>
    <path d="M4.5 20V9.5L11 5l4 2.8" stroke-linejoin="round"/>
    <path d="M7.5 20v-4.5h3V20" stroke-linejoin="round"/>
    <circle cx="17" cy="12.5" r="4"/>
    <path d="m20 15.6 2.2 2.2" stroke-linecap="round"/>
  </svg>
<?php endif; ?>
