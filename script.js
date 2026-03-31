/* =============================================
   ENTERPRISE TECNOLOGIA E SERVIÇOS — SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── MENU MOBILE ── */
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Fechar ao clicar em link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  /* ── HEADER SCROLL ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── SCROLL SUAVE PARA ÂNCORAS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── ANIMAÇÃO DE ENTRADA (Intersection Observer) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.mv-card, .servico-card, .produto-card, .mercado-item, .depoimento-card, .timeline-item, .contato-item'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  document.addEventListener('animationend', () => {}, { once: true });

  // Adicionar classe 'visible'
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  /* ── FORMULÁRIO → WHATSAPP ── */
  const form = document.getElementById('contatoForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nome     = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const email    = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
      }

      let msg = `Olá! Vim pelo site da Enterprise Tecnologia.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}`;
      if (email)    msg += `\n*E-mail:* ${email}`;
      if (mensagem) msg += `\n*Mensagem:* ${mensagem}`;

      const url = `https://wa.me/5586999111011?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

});
