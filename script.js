/* =============================================
   ENTERPRISE TECNOLOGIA E SERVIÇOS — SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.classList.remove('loading');
    }, 1900);
  });

  /* ── SCROLL PROGRESS BAR ── */
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ── HEADER SCROLL ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── MENU MOBILE ── */
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  /* ── SCROLL SUAVE ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ── BOTÃO VOLTAR AO TOPO ── */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── SCROLL REVEAL COM DELAY ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ── CONTADOR ANIMADO NOS STATS ── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const dur    = 1600;
      const step   = 16;
      const inc    = target / (dur / step);
      let current  = 0;
      el.style.animation = 'countUp 0.5s ease both';
      const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = prefix + Math.floor(current);
      }, step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObserver.observe(el));

  /* ── CANVAS PARTÍCULAS ── */
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const NUM   = 55;
    const COLOR = 'rgba(200,117,53,';

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * W;
        this.y     = Math.random() * H;
        this.r     = Math.random() * 1.8 + 0.4;
        this.vx    = (Math.random() - 0.5) * 0.35;
        this.vy    = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.5 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = COLOR + this.alpha + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < NUM; i++) particles.push(new Particle());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = COLOR + (0.18 * (1 - dist / 120)) + ')';
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── RIPPLE NOS BOTÕES ── */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const size   = Math.max(rect.width, rect.height) * 2;
      const wave   = document.createElement('span');
      wave.classList.add('ripple-wave');
      wave.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px`;
      this.appendChild(wave);
      wave.addEventListener('animationend', () => wave.remove());
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const isOpen  = item.classList.contains('open');

      // Fecha todos
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // Scroll suave para o item
        setTimeout(() => {
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
          const top = item.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    });
  });

  /* ── AVISO LGPD ── */
  const lgpdBanner = document.getElementById('lgpdBanner');
  const lgpdAccept = document.getElementById('lgpdAccept');
  if (!localStorage.getItem('lgpd_accepted')) {
    setTimeout(() => lgpdBanner.classList.add('show'), 2500);
  }
  lgpdAccept.addEventListener('click', () => {
    lgpdBanner.classList.remove('show');
    localStorage.setItem('lgpd_accepted', '1');
  });

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
      window.open(`https://wa.me/5586999111011?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      form.reset();
    });
  }

});
