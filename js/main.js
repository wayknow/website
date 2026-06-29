/**
 * WayKnow — minimal site JavaScript
 * Handles: header/footer injection, nav highlight, mobile menu toggle, FAQ accordion
 */

(function () {
  'use strict';

  // --- Header HTML ---
  var headerHTML = `
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">
        <span class="dot"></span> WayKnow
      </a>
      <button class="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/snapmark.html">SnapMark</a></li>
        <li><a href="/clearjson.html">ClearJSON</a></li>
      </ul>
    </nav>
  </header>`;

  // --- Footer HTML ---
  var footerHTML = `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="nav-logo">
          <span class="dot"></span> WayKnow
        </a>
        <p>Privacy-first browser tools.<br>100% local processing, zero data uploads, no sign-up required.</p>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="/snapmark.html">SnapMark</a></li>
          <li><a href="/clearjson.html">ClearJSON</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/snapmark-privacy.html">SnapMark Privacy</a></li>
          <li><a href="/snapmark-terms.html">SnapMark Terms</a></li>
          <li><a href="/clearjson-privacy.html">ClearJSON Privacy</a></li>
          <li><a href="/clearjson-terms.html">ClearJSON Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="current-year"></span> WayKnow. All rights reserved.</p>
    </div>
  </footer>`;

  // --- Inject header ---
  var headerTarget = document.getElementById('site-header');
  if (headerTarget) {
    headerTarget.innerHTML = headerHTML;
  }

  // --- Inject footer ---
  var footerTarget = document.getElementById('site-footer');
  if (footerTarget) {
    footerTarget.innerHTML = footerHTML;
    var yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // --- Navigation highlight ---
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    } else if (href !== '/' && currentPath.includes(href.replace('/', ''))) {
      link.classList.add('active');
    }
  });

  // --- Mobile menu toggle ---
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.nav-toggle');
    if (toggle) {
      var links = document.querySelector('.nav-links');
      if (links) {
        links.classList.toggle('open');
      }
    }
    // Close menu when clicking a link
    if (e.target.closest('.nav-links a')) {
      var links = document.querySelector('.nav-links');
      if (links) {
        links.classList.remove('open');
      }
    }
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      item.classList.toggle('open');
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
