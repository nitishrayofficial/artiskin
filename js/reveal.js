/* ============================================
   ARTISKIN BY JEENA — REVEAL.JS
   Scroll reveal · FAQ accordion · WhatsApp form
   ============================================ */

/* =====================
   1. SCROLL REVEAL
   ===================== */
(function () {
  'use strict';

  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Signal that JS is running — unlocks CSS animations
  document.documentElement.classList.add('js-on');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0.08 }
    );
    elements.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    elements.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();


/* =====================
   2. FAQ ACCORDION
   ===================== */
(function () {
  'use strict';

  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    var id = 'faq-' + Math.random().toString(36).substr(2, 8);
    answer.setAttribute('id', id);
    question.setAttribute('aria-controls', id);
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all others
      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var otherA = other.querySelector('.faq-answer');
          var otherQ = other.querySelector('.faq-question');
          if (otherA) otherA.style.maxHeight = '0';
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });

    // Arrow key navigation
    question.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = item.nextElementSibling;
        if (next) { var nq = next.querySelector('.faq-question'); if (nq) nq.focus(); }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = item.previousElementSibling;
        if (prev) { var pq = prev.querySelector('.faq-question'); if (pq) pq.focus(); }
      }
    });
  });
})();


/* =====================
   3. WHATSAPP FORM
   ===================== */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '61420587160'; // UPDATE before go-live

  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = (form.querySelector('[name="name"]')    || {}).value || '';
    var suburb  = (form.querySelector('[name="suburb"]')  || {}).value || '';
    var service = (form.querySelector('[name="service"]') || {}).value || '';
    var message = (form.querySelector('[name="message"]') || {}).value || '';

    name    = name.trim();
    suburb  = suburb.trim();
    service = service.trim();
    message = message.trim();

    var text = "Hi Jeena, I would like to book a skin session with ArtiSkin.";

    if (name)    text += "\n\nMy name is " + name + ".";
    if (suburb)  text += "\nI am based in " + suburb + ".";
    if (service) text += "\nI am interested in: " + service + ".";
    if (message) text += "\n\n" + message;

    text += "\n\nLooking forward to hearing from you!";

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
