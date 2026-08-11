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

  /* ---------- 4. PRODUCT FILTERS ---------------------------------------- */
  var gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    var cards = [].slice.call(gallery.querySelectorAll('[data-product]'));
    var count = document.querySelector('[data-result-line]');
    var empty = document.querySelector('[data-empty]');
    var rows = [].slice.call(document.querySelectorAll('[data-print-row]'));
    var cat = 'all';
    var avail = 'all';

    // A product card links here from the home page, e.g. ?category=jams
    var wanted = new URLSearchParams(window.location.search).get('category');
    if (wanted) { cat = wanted; }

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var okCat = cat === 'all' || card.getAttribute('data-cat') === cat;
        var okAvail = avail === 'all' || card.getAttribute('data-status') === avail;
        var show = okCat && okAvail;
        card.hidden = !show;
        if (show) { shown++; }
      });
      rows.forEach(function (row) {
        var okCat = cat === 'all' || row.getAttribute('data-cat') === cat;
        var okAvail = avail === 'all' || row.getAttribute('data-status') === avail;
        row.hidden = !(okCat && okAvail);
      });
      if (count) { count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' products'; }
      if (empty) { empty.hidden = shown !== 0; }
      document.querySelectorAll('[data-chip]').forEach(function (chip) {
        var group = chip.getAttribute('data-chip');
        var value = chip.getAttribute('data-value');
        chip.setAttribute('data-active', String((group === 'cat' ? cat : avail) === value));
      });
    }

    document.querySelectorAll('[data-chip]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (chip.getAttribute('data-chip') === 'cat') {
          cat = chip.getAttribute('data-value');
        } else {
          avail = chip.getAttribute('data-value');
        }
        apply();
      });
    });

    var printBtn = document.querySelector('[data-print]');
    if (printBtn) { printBtn.addEventListener('click', function () { window.print(); }); }

    apply();
  }

  /* ---------- 5. INQUIRY FORM -------------------------------------------
     Opens the visitor's own email program with the message written out.
     It never sends anything by itself. To change where inquiries go,
     edit ORDER_EMAIL just below.                                        */
  var ORDER_EMAIL = 'cottagesugarberry@gmail.com';
  var LEAD_TIME_DAYS = 5;   // the date box refuses anything sooner

  var form = document.querySelector('[data-inquiry-form]');
  if (form) {
    var errorBox = form.querySelector('[data-form-error]');
    var donePanel = form.querySelector('[data-form-done]');
    var draftBox = form.querySelector('[data-draft]');
    var copyBtn = form.querySelector('[data-copy]');
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
      if (field && field.focus) { field.focus(); }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
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
        return;
      }
      if (date && date < earliest()) {
        fail('We need ' + LEAD_TIME_DAYS + ' to ' + (LEAD_TIME_DAYS + 2) +
          ' days notice, so the earliest date is ' + pretty(earliest()) + '.', dateInput);
        return;
      }

      if (errorBox) { errorBox.hidden = true; }

      var subject = 'Sugarberry Cottage order inquiry from ' + name;
      var body = [
        'Name: ' + name,
        'Email or phone: ' + contact,
        'Product: ' + wants,
        'Quantity: ' + qty,
        'Pickup or shipping: ' + fulfilment,
        'Preferred date: ' + (date || 'no preference'),
        '',
        'Message:',
        message || '(none)'
      ].join('\n');

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

    if (copyBtn && draftBox) {
      copyBtn.addEventListener('click', function () {
        function done() {
          copyBtn.textContent = 'Copied';
          setTimeout(function () { copyBtn.textContent = 'Copy the message'; }, 2500);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(draftBox.value).then(done, function () { draftBox.select(); });
        } else {
          draftBox.select();
          document.execCommand('copy');
          done();
        }
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
