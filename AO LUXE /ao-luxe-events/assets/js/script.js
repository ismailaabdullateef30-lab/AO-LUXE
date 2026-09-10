/**
 * AO Luxe Events - site behaviour
 *
 *   1. The mobile menu opens and closes
 *   2. The navbar deepens once you scroll past the hero
 *   3. The booking form can be sent to WhatsApp instead of by email
 *
 * The email route is handled by book.php on the server, not here.
 */
(function () {
  "use strict";

  /* ---- 1 and 2. Navigation ---- */
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

  /* ---- Shared helpers ---- */

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** Replaces a form with a confirmation panel. */
  function showThankYou(el, heading, detail) {
    var panel = document.createElement("div");
    panel.className = "border border-gold/40 bg-ink-soft p-10 text-center sm:p-14";
    panel.innerHTML =
      '<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold">' +
        '<span class="font-display text-2xl text-gold">&check;</span>' +
      '</div>' +
      '<h2 class="mt-7 font-display text-3xl text-cream"></h2>' +
      '<p class="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-cream-muted"></p>';
    panel.querySelector("h2").textContent = heading;
    panel.querySelector("p").textContent = detail;
    el.parentNode.replaceChild(panel, el);
  }

  /* ---- 3. Send the booking to WhatsApp ---- */
  var form = document.getElementById("booking-form");
  var waButton = document.getElementById("whatsapp-send");

  if (form && waButton) {
    var value = function (name) {
      var field = form.elements[name];
      return field ? String(field.value).trim() : "";
    };

    waButton.addEventListener("click", function () {
      // Open the tab first. Browsers block pop-ups opened after an await.
      var tab = window.open("", "_blank");

      var name = value("name");
      var email = value("email");
      var phone = value("phone");
      var eventType = value("eventType");

      var chosen = [];
      var boxes = form.querySelectorAll('input[name="services[]"]:checked');
      for (var i = 0; i < boxes.length; i++) {
        var label = boxes[i].closest("label");
        var title = label ? label.querySelector("[data-title]") : null;
        chosen.push(title ? title.textContent.trim() : boxes[i].value);
      }

      // The same rules book.php applies, so nothing incomplete gets through.
      var missing = [];
      if (name.length < 2) missing.push("your name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("a valid email");
      if (phone.replace(/\D/g, "").length < 10) missing.push("a valid phone number");
      if (!eventType) missing.push("the event type");
      if (chosen.length === 0) missing.push("at least one service");

      if (missing.length) {
        if (tab) tab.close();
        window.alert("Please add " + missing.join(", ") + " before sending.");
        return;
      }

      var lines = [
        "Hello AO Luxe Events, I would like to book an event.",
        "",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Event type: " + eventType,
        "Services: " + chosen.join(", ")
      ];
      if (value("eventDate")) lines.push("Date: " + value("eventDate"));
      if (value("guestCount")) lines.push("Guests: " + value("guestCount"));
      if (value("location")) lines.push("Location: " + value("location"));
      if (value("notes")) lines.push("", "Notes: " + value("notes"));

      var url = form.getAttribute("data-whatsapp") +
                "?text=" + encodeURIComponent(lines.join("\n"));

      if (tab) {
        tab.location.href = url;
      } else {
        window.location.href = url;   // pop-up was blocked
      }

      showThankYou(
        form,
        "Your details are ready in WhatsApp.",
        "We have opened WhatsApp with your booking filled in. Press send there and we will pick it up straight away."
      );
    });
  }

})();
