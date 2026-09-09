/**
 * AO Luxe Events - site behaviour
 *
 * This version is plain HTML, CSS and JavaScript. There is no server,
 * so everything below runs in the visitor's browser:
 *
 *   1. The mobile menu opens and closes
 *   2. The navbar deepens once you scroll past the hero
 *   3. The showreel loads only when someone presses play
 *   4. A service is pre-ticked when arriving from a "Book This
 *      Service" link, for example book.html?service=day-of
 *   5. The booking form sends by WhatsApp or by email
 *   6. The contact form does the same
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2347087054909";
  var EMAIL_ADDRESS = "aoluxeevents@gmail.com";

  /* ---------- 1 and 2. Navigation ---------- */

  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 24) {
        header.classList.add("border-ink-line", "bg-ink/95");
        header.classList.remove("border-transparent");
      } else {
        header.classList.remove("border-ink-line", "bg-ink/95");
        header.classList.add("border-transparent");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Showreel ---------- */

  var reel = document.getElementById("showreel");
  if (reel) {
    var playButton = reel.querySelector("button");
    if (playButton) {
      playButton.addEventListener("click", function () {
        var video = document.createElement("video");
        video.src = reel.getAttribute("data-video");
        video.poster = "assets/images/showreel-poster.jpg";
        video.controls = true;
        video.autoplay = true;
        video.setAttribute("playsinline", "");   // iOS needs the attribute
        video.className = "h-auto w-full";
        reel.innerHTML = "";
        reel.appendChild(video);
      });
    }
  }

  /* ---------- Shared helpers ---------- */

  /** Replaces a form with a confirmation panel. */
  function showThankYou(form, heading, detail) {
    var panel = document.createElement("div");
    panel.className = "border border-gold/40 bg-ink-soft p-10 text-center sm:p-14";
    panel.innerHTML =
      '<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold">' +
        '<span class="font-display text-2xl text-gold">&check;</span>' +
      "</div>" +
      '<h2 class="mt-7 font-display text-3xl text-cream"></h2>' +
      '<p class="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-cream-muted"></p>';
    panel.querySelector("h2").textContent = heading;
    panel.querySelector("p").textContent = detail;
    form.parentNode.replaceChild(panel, form);
  }

  /** Reads and trims one field from a form. */
  function fieldValue(form, name) {
    var field = form.elements[name];
    return field ? String(field.value).trim() : "";
  }

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- 4, 5. Booking form ---------- */

  var bookingForm = document.getElementById("booking-form");

  if (bookingForm) {

    // Pre-tick the service the visitor clicked through with.
    var wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted) {
      var box = bookingForm.querySelector(
        'input[name="services[]"][value="' + wanted.replace(/"/g, "") + '"]'
      );
      if (box) box.checked = true;
    }

    /** Collects the ticked services by their readable titles. */
    var chosenServices = function () {
      var out = [];
      var boxes = bookingForm.querySelectorAll('input[name="services[]"]:checked');
      for (var i = 0; i < boxes.length; i++) {
        var label = boxes[i].closest("label");
        var title = label ? label.querySelector("[data-title]") : null;
        out.push(title ? title.textContent.trim() : boxes[i].value);
      }
      return out;
    };

    /** Returns a list of what is missing. Empty means the form is good. */
    var missingFields = function () {
      var missing = [];
      if (fieldValue(bookingForm, "name").length < 2) missing.push("your name");
      if (!EMAIL_PATTERN.test(fieldValue(bookingForm, "email"))) missing.push("a valid email");
      if (fieldValue(bookingForm, "phone").replace(/\D/g, "").length < 10) missing.push("a valid phone number");
      if (!fieldValue(bookingForm, "eventType")) missing.push("the event type");
      if (chosenServices().length === 0) missing.push("at least one service");
      return missing;
    };

    /** The booking, written out as lines of text. */
    var bookingLines = function () {
      var lines = [
        "Name: " + fieldValue(bookingForm, "name"),
        "Email: " + fieldValue(bookingForm, "email"),
        "Phone: " + fieldValue(bookingForm, "phone"),
        "Event type: " + fieldValue(bookingForm, "eventType"),
        "Services: " + chosenServices().join(", ")
      ];
      if (fieldValue(bookingForm, "eventDate")) lines.push("Date: " + fieldValue(bookingForm, "eventDate"));
      if (fieldValue(bookingForm, "guestCount")) lines.push("Guests: " + fieldValue(bookingForm, "guestCount"));
      if (fieldValue(bookingForm, "location")) lines.push("Location: " + fieldValue(bookingForm, "location"));
      if (fieldValue(bookingForm, "notes")) lines.push("", "Notes: " + fieldValue(bookingForm, "notes"));
      return lines;
    };

    var whatsappButton = document.getElementById("whatsapp-send");
    if (whatsappButton) {
      whatsappButton.addEventListener("click", function () {
        // The tab is opened first. Browsers block pop-ups opened later.
        var tab = window.open("", "_blank");

        var missing = missingFields();
        if (missing.length) {
          if (tab) tab.close();
          window.alert("Please add " + missing.join(", ") + " before sending.");
          return;
        }

        var text = ["Hello AO Luxe Events, I would like to book an event.", ""]
          .concat(bookingLines()).join("\n");
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

        if (tab) { tab.location.href = url; } else { window.location.href = url; }

        showThankYou(
          bookingForm,
          "Your details are ready in WhatsApp.",
          "We have opened WhatsApp with your booking filled in. Press send there and we will pick it up straight away."
        );
      });
    }

    var emailButton = document.getElementById("email-send");
    if (emailButton) {
      emailButton.addEventListener("click", function () {
        var missing = missingFields();
        if (missing.length) {
          window.alert("Please add " + missing.join(", ") + " before sending.");
          return;
        }

        var subject = "New booking request: " +
          fieldValue(bookingForm, "eventType") + ", " + fieldValue(bookingForm, "name");

        // mailto opens whichever email program the visitor uses.
        window.location.href = "mailto:" + EMAIL_ADDRESS +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(bookingLines().join("\n"));

        showThankYou(
          bookingForm,
          "Your email is ready to send.",
          "We have opened your email program with the booking filled in. Press send there and we will reply within 24 hours."
        );
      });
    }
  }

  /* ---------- 6. Contact form ---------- */

  var contactForm = document.getElementById("contact-form");
  var contactButton = document.getElementById("contact-send");

  if (contactForm && contactButton) {
    contactButton.addEventListener("click", function () {
      var missing = [];
      if (fieldValue(contactForm, "name").length < 2) missing.push("your name");
      if (!EMAIL_PATTERN.test(fieldValue(contactForm, "email"))) missing.push("a valid email");
      if (fieldValue(contactForm, "message").length < 5) missing.push("a message");

      if (missing.length) {
        window.alert("Please add " + missing.join(", ") + " before sending.");
        return;
      }

      var body = [
        "Name: " + fieldValue(contactForm, "name"),
        "Email: " + fieldValue(contactForm, "email"),
        "",
        fieldValue(contactForm, "message")
      ].join("\n");

      window.location.href = "mailto:" + EMAIL_ADDRESS +
        "?subject=" + encodeURIComponent("Website enquiry: " + fieldValue(contactForm, "name")) +
        "&body=" + encodeURIComponent(body);

      showThankYou(
        contactForm,
        "Your email is ready to send.",
        "We have opened your email program with your message filled in. Press send there and we will reply within 24 hours."
      );
    });
  }
})();
