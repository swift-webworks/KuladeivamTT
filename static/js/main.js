document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky navbar on scroll ---------- */
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---------- Active nav link on scroll (index page only) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link[href^="#"]');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (sec) {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
          current = sec.getAttribute('id');
        }
      });
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Scroll to top button ---------- */
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Loading animation ---------- */
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      loader.classList.add('loaded');
      setTimeout(function () { loader.style.display = 'none'; }, 500);
    });
  }

  /* =====================================================
     EmailJS Contact Form Integration
     -----------------------------------------------------
     1. Sign up at https://www.emailjs.com/
     2. Add an Email Service (e.g. Gmail) -> copy the SERVICE ID
     3. Create an Email Template -> copy the TEMPLATE ID
        Template should use variables matching the input "name"
        attributes below: from_name, from_email, phone,
        vehicle_type, members, pickup_area
     4. Copy your Public Key from Account > General
     5. Replace the three placeholders below
     ===================================================== */
  const EMAILJS_PUBLIC_KEY = 'EzfIiOFM0LXH0rCPG';
  const EMAILJS_SERVICE_ID = 'service_jsqftpn';
  const EMAILJS_TEMPLATE_ID = 'template_l6s3tfj';

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccessMsg');
    const errorMsg = document.getElementById('formErrorMsg');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      /* Client side validation (uses Bootstrap's was-validated pattern) */
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      contactForm.classList.add('was-validated');

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(function () {
          if (successMsg) successMsg.style.display = 'block';
          contactForm.reset();
          contactForm.classList.remove('was-validated');
        })
        .catch(function (error) {
          if (errorMsg) errorMsg.style.display = 'block';
          console.error('EmailJS error:', error);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }
});
