(function () {
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    if (!mainNav) return;
    if (mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
    body.classList.remove('no-scroll');
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      const nextState = !expanded;
      navToggle.setAttribute('aria-expanded', String(nextState));
      mainNav.classList.toggle('is-open', nextState);
      body.classList.toggle('no-scroll', nextState);
    });

    mainNav.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });
  }

  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  const openContact = () => {
    if (!contactModal) {
      return;
    }
    closeNav();
    contactModal.hidden = false;
    contactSuccess?.setAttribute('hidden', '');
    contactForm?.reset();
    window.requestAnimationFrame(() => {
      contactModal.classList.add('is-visible');
      body.classList.add('no-scroll');
      const firstField = contactModal.querySelector('input, textarea, button');
      if (firstField instanceof HTMLElement) {
        firstField.focus();
      }
    });
  };

  const closeContact = () => {
    if (!contactModal) {
      return;
    }
    contactModal.classList.remove('is-visible');
    setTimeout(() => {
      contactModal.hidden = true;
      contactSuccess?.setAttribute('hidden', '');
      contactForm?.reset();
      if (!mainNav || !mainNav.classList.contains('is-open')) {
        body.classList.remove('no-scroll');
      }
    }, 300);
  };

  if (contactModal) {
    document.querySelectorAll('[data-open-contact]').forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.preventDefault();
        openContact();
      });
    });

    contactModal.querySelectorAll('[data-close-contact]').forEach(btn => {
      btn.addEventListener('click', closeContact);
    });

    contactForm?.addEventListener('submit', event => {
      event.preventDefault();
      contactSuccess?.removeAttribute('hidden');
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && contactModal.classList.contains('is-visible')) {
        closeContact();
      }
    });
  }

  document.querySelectorAll('[data-success-message]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const message = form.getAttribute('data-success-message');
      if (message) {
        window.alert(message);
      }
      if (form instanceof HTMLFormElement) {
        form.reset();
      }
    });
  });

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      window.alert('Merci ! Vous êtes inscrit à la newsletter Tennis Impact.');
      newsletterForm.reset();
    });
  }

  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const faqQuestions = document.querySelectorAll('.faq__question');
  if (faqQuestions.length) {
    faqQuestions.forEach((button, index) => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        button.classList.toggle('is-active');
        const answer = button.nextElementSibling;
        if (answer instanceof HTMLElement) {
          answer.style.maxHeight = expanded ? '' : `${answer.scrollHeight}px`;
        }
      });
      if (index === 0) {
        button.click();
      }
    });
  }

  if (window.AOS) {
    window.AOS.init({
      once: true,
      offset: 120,
      duration: 600,
      easing: 'ease-out-quart'
    });
  }
})();
