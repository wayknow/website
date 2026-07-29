/**
 * WayKnow — minimal site JavaScript
 * Handles: nav highlight, mobile menu toggle, FAQ accordion, smooth scroll
 */

(function () {
  'use strict';

  // --- Dynamic year in footer ---
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
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

  // --- Scroll-triggered reveal animations ---
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else if (revealEls.length) {
    // Fallback: show all immediately if no IntersectionObserver support
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
