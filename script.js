/* ==========================================================================
   SUGARBERRY COTTAGE - script.js
   Plain JavaScript, no libraries. Sections:
     1. MOBILE MENU        2. BACK TO TOP
     3. COPYRIGHT YEAR     4. PRODUCT FILTERS
     5. INQUIRY FORM
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. MOBILE MENU -------------------------------------------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.getElementById('cottage-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) { menu.removeAttribute('hidden'); } else { menu.setAttribute('hidden', ''); }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- 2. BACK TO TOP -------------------------------------------- */
  var top = document.querySelector('[data-to-top]');
  if (top) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) { top.removeAttribute('hidden'); } else { top.setAttribute('hidden', ''); }
    }, { passive: true });
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 3. COPYRIGHT YEAR ----------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---------- 4. THE SHOP ------------------------------------------------
     Everything about products comes from products-data.js, which the
     product manager (admin.html) writes for you. Nothing below needs
     editing to add a product or open the shop.                          */
  var DATA = window.SUGARBERRY || { shopOpen: false, products: [] };

  // Open or closed: one flag decides what every page shows.
  document.querySelectorAll('[data-shop-open]').forEach(function (el) {
    if (DATA.shopOpen) { el.removeAttribute('hidden'); } else { el.setAttribute('hidden', ''); }
  });
  document.querySelectorAll('[data-shop-closed]').forEach(function (el) {
    if (DATA.shopOpen) { el.setAttribute('hidden', ''); } else { el.removeAttribute('hidden'); }
  });

  /* ---------- 4b. THE ORDERING LINK --------------------------------------
     Every "Order now" button on the site points at orderingUrl in
     products-data.js. Set it once there and every button follows. While
     it is empty the buttons say ordering is opening soon rather than
     leading anyone to a dead link.                                     */
  var orderingUrl = (DATA.orderingUrl || '').trim();
  document.querySelectorAll('[data-order-link]').forEach(function (link) {
    if (orderingUrl) {
      link.href = orderingUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.removeAttribute('aria-disabled');
      link.style.opacity = '';
      link.style.pointerEvents = '';
    } else {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.style.opacity = '0.55';
      link.style.pointerEvents = 'none';
    }
  });
  document.querySelectorAll('[data-order-note]').forEach(function (note) {
    note.textContent = orderingUrl
      ? 'Opens our ordering page in a new tab.'
      : 'Ordering opens soon. Follow us on Facebook and we will announce it there.';
  });

  /* ---------- 4c. THE PRODUCT CARDS --------------------------------------
     One card per product in products-data.js. Add or change a product in
     that file, or use admin.html. Nothing here needs editing.          */
  var CAT_LABEL = {
    breads: 'Breads', rolls: 'Rolls', cookies: 'Cookies'
  };
  function tagClass(status) {
    if (status === 'Available') { return 'tag tag-accent-2'; }
    if (status === 'Sold Out') { return 'tag tag-neutral'; }
    if (status === 'Seasonal') { return 'tag tag-accent'; }
    return 'tag tag-outline';
  }
  function safe(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    gallery.innerHTML = DATA.products.map(function (p) {
      var picture = p.img
        ? '<img src="images/products/' + safe(p.img) + '" alt="' + safe(p.name) + '" ' +
          'loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">'
        : '<div class="photo-slot"><span>' + safe(p.photo) + '</span></div>';
      var price = p.price
        ? '<span style="font-family: var(--font-body); font-size: 16px; font-weight: 700; color: var(--berry);">' + safe(p.price) + '</span>' +
          '<span style="font-family: var(--font-body); font-size: 13px; color: var(--ink-soft);">' + safe(p.unit) + '</span>'
        : '<span style="font-family: var(--font-body); font-size: 15px; font-weight: 700; color: var(--berry);">Ask us for a price</span>';
      return '<article data-product data-cat="' + safe(p.cat) + '" data-status="' + safe(p.status) + '" ' +
        'class="card elev-sm" style="background: var(--sand); padding: 0; overflow: hidden; gap: 0;">' +
          '<div class="washed" style="height: 210px; overflow: hidden; background: var(--color-neutral-200);">' + picture + '</div>' +
          '<div style="padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 9px; flex: 1;">' +
            '<span class="' + tagClass(p.status) + '" style="align-self: flex-start; font-family: var(--font-body); font-weight: 600;">' + safe(p.status) + '</span>' +
            '<h2 style="font-family: var(--font-serif); font-weight: 600; font-size: 22px; line-height: 1.15; margin: 0;">' + safe(p.name) + '</h2>' +
            '<p style="font-family: var(--font-body); font-size: 14.5px; line-height: 1.55; color: var(--ink-soft); margin: 0; flex: 1;">' + safe(p.desc) + '</p>' +
            '<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;">' + price + '</div>' +
            '<a class="btn" href="contact.html?product=' + encodeURIComponent(p.name) + '" ' +
              'style="white-space: nowrap; align-self: flex-start; border: 1px solid var(--berry); color: var(--berry); font-family: var(--font-body); font-weight: 700; font-size: 15px; padding: 10px 20px; margin-top: 4px;">' +
              (p.status === 'Sold Out' ? 'Ask when it is back' : 'Ask about this') +
            '</a>' +
          '</div>' +
        '</article>';
    }).join('');

    var tbody = document.querySelector('[data-print-list] tbody');
    if (tbody) {
      tbody.innerHTML = DATA.products.map(function (p) {
        return '<tr data-print-row data-cat="' + safe(p.cat) + '" data-status="' + safe(p.status) + '">' +
          '<td>' + safe(p.name) + '</td><td>' + safe(CAT_LABEL[p.cat] || p.cat) + '</td>' +
          '<td>' + (p.price ? safe(p.price) + ' ' + safe(p.unit) : 'ask') + '</td>' +
          '<td>' + safe(p.status) + '</td></tr>';
      }).join('');
    }

    /* ---------- 4d. THE FILTERS ----------------------------------------- */
    var cards = [].slice.call(gallery.querySelectorAll('[data-product]'));
    var rows = [].slice.call(document.querySelectorAll('[data-print-row]'));
    var resultLine = document.querySelector('[data-result-line]');
    var emptyNote = document.querySelector('[data-empty]');
    var chosen = { cat: 'all', avail: 'all' };

    function matches(el) {
      return (chosen.cat === 'all' || el.getAttribute('data-cat') === chosen.cat) &&
        (chosen.avail === 'all' || el.getAttribute('data-status') === chosen.avail);
    }
    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = matches(c);
        c.hidden = !ok;
        if (ok) { shown++; }
      });
      rows.forEach(function (r) { r.hidden = !matches(r); });
      if (resultLine) {
        resultLine.textContent = 'Showing ' + shown + ' of ' + cards.length +
          (cards.length === 1 ? ' product' : ' products');
      }
      if (emptyNote) { emptyNote.hidden = shown !== 0; }
    }

    document.querySelectorAll('[data-chip]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var kind = chip.getAttribute('data-chip');
        chosen[kind] = chip.getAttribute('data-value');
        document.querySelectorAll('[data-chip="' + kind + '"]').forEach(function (sib) {
          sib.setAttribute('data-active', sib === chip ? 'true' : 'false');
        });
        apply();
      });
    });

    // Lets the home page link straight to one category, e.g. ?category=rolls
    var wanted = new URLSearchParams(window.location.search).get('category');
    if (wanted && CAT_LABEL[wanted]) {
      var target = document.querySelector('[data-chip="cat"][data-value="' + wanted + '"]');
      if (target) { target.click(); }
    }
    apply();

    var printBtn = document.querySelector('[data-print]');
    if (printBtn) { printBtn.addEventListener('click', function () { window.print(); }); }
  }

  /* ---------- 5. INQUIRY FORM -------------------------------------------
     Opens the visitor's own email program with the message written out.
     It never sends anything by itself. To change where inquiries go,
     edit ORDER_EMAIL just below.                                        */
  var ORDER_EMAIL = 'cottagesugarberry@gmail.com';
  var MESSENGER_URL = 'https://m.me/61593085433733';
  var LEAD_TIME_DAYS = 5;   // the date box refuses anything sooner

  var form = document.querySelector('[data-inquiry-form]');
  if (form) {
    var errorBox = form.querySelector('[data-form-error]');
    var donePanel = form.querySelector('[data-form-done]');
    var dmPanel = form.querySelector('[data-form-done-dm]');
    var draftBox = form.querySelector('[data-draft]');
    var dmDraftBox = form.querySelector('[data-dm-draft]');
    var copyBtn = form.querySelector('[data-copy]');
    var dmCopyBtn = form.querySelector('[data-dm-copy]');
    var dmOpenLink = form.querySelector('[data-dm-open]');
    var messengerBtn = form.querySelector('[data-messenger]');
    var retryLink = form.querySelector('[data-retry]');
    var gmailLink = form.querySelector('[data-gmail]');
    var dateInput = form.elements['date'];

    // Product cards link here with ?product=Strawberry%20Jam
    var product = new URLSearchParams(window.location.search).get('product');
    if (product && form.elements['product']) { form.elements['product'].value = product; }

    function earliest() {
      var d = new Date();
      d.setDate(d.getDate() + LEAD_TIME_DAYS);
      return d.toISOString().slice(0, 10);
    }
    function pretty(iso) {
      return new Date(iso + 'T12:00:00').toLocaleDateString(undefined,
        { weekday: 'long', month: 'long', day: 'numeric' });
    }
    if (dateInput) { dateInput.min = earliest(); }

    // Show or hide the Illinois-only note as the choice changes.
    var shipNote = form.querySelector('[data-ship-note]');
    form.querySelectorAll('input[name="fulfilment"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (shipNote) { shipNote.hidden = form.elements['fulfilment'].value === 'Local pickup'; }
      });
    });

    function fail(message, field) {
      if (errorBox) { errorBox.textContent = message; errorBox.hidden = false; }
      if (donePanel) { donePanel.hidden = true; }
      if (dmPanel) { dmPanel.hidden = true; }
      if (field && field.focus) { field.focus(); }
    }

    /* Check the form and write out the message. Both the email button and
       the Messenger button use this, so the wording is always the same.
       Returns null when something is missing, having already said so.   */
    function collect() {
      function val(name) {
        var el = form.elements[name];
        return el ? (el.value || '').trim() : '';
      }
      var name = val('name');
      var contact = val('contact');
      var wants = val('product');
      var qty = val('qty');
      var date = val('date');
      var message = val('message');
      var fulfilment = form.elements['fulfilment'] ? form.elements['fulfilment'].value : 'Local pickup';

      var missing = [];
      if (name.length < 2) { missing.push('your name'); }
      if (contact.length < 5) { missing.push('an email address or phone number'); }
      if (!wants) { missing.push('the product you are interested in'); }
      if (!qty || Number(qty) < 1) { missing.push('a quantity of at least 1'); }
      if (missing.length) {
        fail('Please add ' + missing.join(', ') + '.', form.elements['name']);
        return null;
      }
      if (date && date < earliest()) {
        fail('We need ' + LEAD_TIME_DAYS + ' to ' + (LEAD_TIME_DAYS + 2) +
          ' days notice, so the earliest date is ' + pretty(earliest()) + '.', dateInput);
        return null;
      }

      if (errorBox) { errorBox.hidden = true; }

      return {
        subject: 'Sugarberry Cottage order inquiry from ' + name,
        body: [
          'Name: ' + name,
          'Email or phone: ' + contact,
          'Product: ' + wants,
          'Quantity: ' + qty,
          'Pickup or shipping: ' + fulfilment,
          'Preferred date: ' + (date || 'no preference'),
          '',
          'Message:',
          message || '(none)'
        ].join('\n')
      };
    }

    /* Copy some text, and tell the button it worked. The label lives in its
       own span when the button also holds an icon, so swapping the words
       cannot wipe out the artwork beside them. */
    function copyInto(text, button, label) {
      var slot = button.querySelector('[data-label]') || button;
      function done() {
        slot.textContent = 'Copied';
        setTimeout(function () { slot.textContent = label; }, 2500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        done();
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = collect();
      if (!msg) { return; }
      var subject = msg.subject;
      var body = msg.body;

      if (dmPanel) { dmPanel.hidden = true; }

      var mailto = 'mailto:' + ORDER_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (draftBox) { draftBox.value = body; }
      if (retryLink) { retryLink.href = mailto; }
      if (gmailLink) {
        gmailLink.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
          encodeURIComponent(ORDER_EMAIL) +
          '&su=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
      }
      if (donePanel) { donePanel.hidden = false; }

      // Hand it to the visitor's email program. Some computers block this,
      // which is why the panel above also offers copy and webmail.
      var link = document.createElement('a');
      link.href = mailto;
      link.rel = 'noopener';
      document.body.appendChild(link);
      try { link.click(); } catch (err) { /* the panel covers it */ }
      link.remove();
    });

    /* ---------- ORDERING BY MESSENGER --------------------------------------
       Messenger has no way to prefill the text of a message, so we do the
       next best thing: put the inquiry on the clipboard, open the chat, and
       the visitor pastes with one tap. The message is on screen as well, in
       case the clipboard is not allowed.                                  */
    if (messengerBtn) {
      messengerBtn.addEventListener('click', function () {
        var msg = collect();
        if (!msg) { return; }
        if (donePanel) { donePanel.hidden = true; }
        if (dmDraftBox) { dmDraftBox.value = msg.body; }
        if (dmPanel) { dmPanel.hidden = false; }

        copyInto(msg.body, messengerBtn, 'Send on Messenger');

        // Opened in the same tap, so the browser does not treat it as a popup.
        var w = window.open(MESSENGER_URL, '_blank', 'noopener');
        if (!w) { window.location.href = MESSENGER_URL; }
      });
    }

    if (dmCopyBtn && dmDraftBox) {
      dmCopyBtn.addEventListener('click', function () {
        dmDraftBox.select();
        copyInto(dmDraftBox.value, dmCopyBtn, 'Copy the message');
      });
    }

    if (dmOpenLink) {
      dmOpenLink.addEventListener('click', function (e) {
        e.preventDefault();
        var w = window.open(MESSENGER_URL, '_blank', 'noopener');
        if (!w) { window.location.href = MESSENGER_URL; }
      });
    }

    if (copyBtn && draftBox) {
      copyBtn.addEventListener('click', function () {
        draftBox.select();
        copyInto(draftBox.value, copyBtn, 'Copy the message');
      });
    }

    if (gmailLink) {
      // Gmail refuses to load in a frame, so open a real tab.
      gmailLink.addEventListener('click', function (e) {
        e.preventDefault();
        var url = gmailLink.getAttribute('href');
        var w = window.open(url, '_blank', 'noopener');
        if (!w) { window.location.href = url; }
      });
    }
  }
})();
