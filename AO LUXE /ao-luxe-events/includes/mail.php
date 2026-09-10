<?php
/**
 * EMAIL SENDING
 *
 * Uses PHP's built-in mail() function, which works on most paid
 * shared hosting (cPanel, Namecheap, Whogohost, ByetHost on request).
 *
 * NOTE: some free hosts, InfinityFree among them, block mail()
 * entirely. Where that happens the booking page says so and points
 * the visitor at WhatsApp instead, so no enquiry is ever lost.
 */

/**
 * Sends one enquiry to the address in config.php.
 * Returns true on success, false on failure.
 */
function send_enquiry($subject, array $rows, $reply_to = null)
{
    global $SITE;

    $lines = [];
    foreach ($rows as $label => $value) {
        $value = trim((string) $value);
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }
    $body = implode("\r\n", $lines);

    $headers = [];
    // The From address must be on your own domain or hosts reject it.
    $domain = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $domain = preg_replace('/^www\./', '', $domain);
    $headers[] = 'From: AO Luxe Events <no-reply@' . $domain . '>';

    // Replying to the email goes straight back to the enquirer.
    if ($reply_to && filter_var($reply_to, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    return @mail($SITE['email'], $subject, $body, implode("\r\n", $headers));
}
