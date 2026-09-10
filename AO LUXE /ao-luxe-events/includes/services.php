<?php
/**
 * SERVICES
 *
 * AO Luxe Events is a PLANNING house. We do not provide decoration or
 * catering ourselves. We source, negotiate with and manage the
 * specialists who do. The copy is written to keep that clear, so please
 * keep it that way when editing.
 *
 * One entry per bookable service. These fill the homepage cards, the
 * services page, and the checkboxes on the booking form, so adding a
 * service here adds it everywhere at once.
 *
 * 'id'    is used in links and in the booking form. Keep it lowercase
 *         with no spaces, and do not change it once the site is live.
 * 'price' replace the X characters with real figures when set.
 */

$SERVICES = [
    [
        'id'    => 'full-planning',
        'title' => 'Full Event Planning',
        'short' => 'From the first conversation to the last guest leaving. We plan it and we run it.',
        'icon'  => 'planning',
        'price' => 'Starting from NGN XXX,XXX',
        'description' => 'Our complete service, and the way most clients work with us. We start with the occasion behind the occasion, build the concept and the budget around it, then find and manage every supplier the day needs. You approve the decisions; we carry the work, the chasing and the timelines, including the parts that only surface on the day itself.',
        'includes' => [
            'Discovery session and full event brief',
            'Concept direction, theme and mood board',
            'Budget built with you, then tracked to the last naira',
            'Venue sourcing, inspections and negotiation',
            'Sourcing and managing every vendor: decorators, caterers, photography, entertainment',
            'Contract review and payment scheduling',
            'Full timeline and run-of-show',
            'Guest logistics, seating and hospitality planning',
            'On-the-day coordination from setup to teardown',
            'Post-event vendor sign-off and reconciliation',
        ],
    ],
    [
        'id'    => 'partial-planning',
        'title' => 'Partial Planning',
        'short' => 'You have made a start. We take it from where you are and carry it to the day.',
        'icon'  => 'partial',
        'price' => 'Starting from NGN XXX,XXX',
        'description' => 'For clients who have already booked a venue, or a vendor or two, and have realised how much is left. We review everything committed so far, tell you honestly where the gaps and the risks are, then take over the rest: the remaining suppliers, the budget, the timeline and the day itself.',
        'includes' => [
            'Review of everything already booked and signed',
            'Honest gap and risk assessment, in writing',
            'Budget review against what is left to spend',
            'Sourcing and managing the remaining vendors',
            'Full timeline and run-of-show',
            'Management of the final month before the event',
            'Vendor confirmation and logistics in the closing week',
            'On-the-day coordination from setup to teardown',
        ],
    ],
    [
        'id'    => 'day-of',
        'title' => 'Day-Of Coordination',
        'short' => 'You planned it. We run it, so you can actually be present at it.',
        'icon'  => 'dayof',
        'price' => 'Starting from NGN XXX,XXX',
        'description' => 'For clients who have organised everything themselves and do not want to spend the day on their phone. We take the handover a few weeks out, learn your plan properly, confirm every vendor, and then run the day to your timeline, including the small emergencies you should never hear about.',
        'includes' => [
            'Handover sessions to learn your plan in full',
            'Confirmation calls with every booked vendor',
            'A written run-of-show shared with all suppliers',
            'Setup supervision and vendor arrival management',
            'Timeline management across the whole day',
            'Guest, VIP and protocol handling',
            'Quiet troubleshooting as things come up',
            'Teardown oversight and vendor sign-off',
        ],
    ],
    [
        'id'    => 'sourcing',
        'title' => 'Venue & Vendor Sourcing',
        'short' => 'We find the room and the suppliers, and we negotiate the terms.',
        'icon'  => 'sourcing',
        'price' => 'Starting from NGN XXX,XXX',
        'description' => 'Sourcing on its own, for clients who are happy to run their own event but want the searching, comparing and negotiating done properly. A venue sets the ceiling on everything else, and the right vendor at the right price is rarely the first quote you receive, so we do that part and hand you clean options with the numbers next to them.',
        'includes' => [
            'Brief and budget scoping session',
            'Shortlist of venues that genuinely fit your guest count and budget',
            'Venue inspections and availability checks',
            'Negotiation on rates, terms and inclusions',
            'Contract review before you sign anything',
            'Vetted vendor shortlists: decoration, catering, photography, entertainment',
            'Side-by-side quote comparison, with our honest recommendation',
            'Booking coordination and deposit scheduling',
        ],
    ],
];

/** Looks up one service by its id. Returns null when not found. */
function service_by_id($id)
{
    global $SERVICES;
    foreach ($SERVICES as $service) {
        if ($service['id'] === $id) {
            return $service;
        }
    }
    return null;
}
