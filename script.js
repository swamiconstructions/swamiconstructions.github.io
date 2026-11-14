(function () {
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('enquiryForm');
  const error = document.getElementById('formError');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (error) error.textContent = '';

      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const location = document.getElementById('projectLocation').value.trim();
      const projectType = document.getElementById('projectType').value;
      const area = document.getElementById('projectArea').value.trim();
      const message = document.getElementById('projectMessage').value.trim();
      const contact = document.getElementById('contactPerson').value;

      if (!name || !phone || !location) {
        if (error) error.textContent = 'Please complete your name, phone number and project location.';
        return;
      }
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 13) {
        if (error) error.textContent = 'Please enter a valid phone number with 10 to 13 digits.';
        return;
      }

      const contactNumber = contact === 'suraj' ? '917378928216' : '917775896087';
      const contactName = contact === 'suraj' ? 'Suraj Parakash Raut' : 'Er. Abhishek Santosh Borade';
      const lines = [
        'Hello Swami Constructions, I would like to discuss a project.',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        'Project location: ' + location,
        'Requirement: ' + projectType
      ];
      if (area) lines.push('Plot / built-up area: ' + area);
      if (message) lines.push('Project details: ' + message);
      lines.push('', 'Please contact me to discuss the next steps.', 'Preferred contact: ' + contactName);
      const url = 'https://wa.me/' + contactNumber + '?text=' + encodeURIComponent(lines.join('\n'));
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url;
    });
  }
})();
