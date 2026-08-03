document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const mouseGlow = document.querySelector('.mouse-glow');
  const progressBar = document.querySelector('.scroll-progress');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  });

  const updateCursor = (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.style.left = `${e.clientX}px`;
    cursorOutline.style.top = `${e.clientY}px`;
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  };

  window.addEventListener('mousemove', updateCursor);
  window.addEventListener('mousedown', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.9)';
  });
  window.addEventListener('mouseup', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    document.body.style.cursor = 'none';
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const heroName = document.getElementById('typed-name');
  const heroSubtitle = document.getElementById('typed-subtitle');
  const heroLines = document.querySelectorAll('.line-line');
  const heroHeading = document.querySelector('.hero-name');
  const resumeLink = document.getElementById('download-resume');

  const typeName = async (text) => {
    heroName.textContent = '';
    for (let i = 0; i < text.length; i += 1) {
      heroName.textContent += text[i];
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  };

  const initHeroSequence = async () => {
    heroLines.forEach((line, index) => {
      line.style.animationDelay = `${0.2 + index * 0.25}s`;
    });
    await new Promise((resolve) => setTimeout(resolve, 800));
    await typeName('Md Rakibul Islam');
    const typed = new Typed(heroSubtitle, {
      strings: ['Full Stack Web Developer', 'Android App Developer', 'Tech YouTuber', 'Cybersecurity Enthusiast'],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      showCursor: false,
    });
    heroHeading.classList.add('ready');
    return typed;
  };

  initHeroSequence();

  if (resumeLink) {
    const setResumeTarget = async () => {
      const candidates = [
        { file: 'resume.pdf', name: 'Rakibul_Resume.pdf' },
        { file: 'resume.txt', name: 'Rakibul_Resume.txt' }
      ];

      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate.file, { method: 'HEAD' });
          if (response.ok) {
            resumeLink.href = candidate.file;
            resumeLink.setAttribute('download', candidate.name);
            return;
          }
        } catch (error) {
          // Ignore and try the next fallback
        }
      }

      resumeLink.href = 'resume.txt';
      resumeLink.setAttribute('download', 'Rakibul_Resume.txt');
    };

    setResumeTarget();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
          setTimeout(() => bar.classList.add('animate'), index * 120);
        });
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach((counter) => {
          const target = Number(counter.getAttribute('data-count'));
          let start = 0;
          const duration = 1400;
          const step = Math.max(1, Math.round(target / (duration / 16)));
          const tick = () => {
            start += step;
            if (start >= target) {
              counter.textContent = target.toLocaleString();
              return;
            }
            counter.textContent = start.toLocaleString();
            requestAnimationFrame(tick);
          };
          tick();
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);

  const revealElements = document.querySelectorAll('[data-aos]');
  revealElements.forEach((el) => {
    el.setAttribute('data-aos-anchor-placement', 'top-bottom');
  });
  AOS.init({ duration: 900, once: true, offset: 90 });

  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 1000 } },
        color: { value: ['#00e5ff', '#4f46e5', '#9333ea'] },
        shape: { type: 'circle' },
        opacity: { value: 0.45, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#6b7cff', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 120, duration: 0.4 }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 18,
    speed: 400,
    glare: true,
    'max-glare': 0.18,
    scale: 1.05
  });

  const imageContainer = document.querySelector('.hero-image-container');
  if (imageContainer) {
    VanillaTilt.init(imageContainer, {
      max: 22,
      speed: 500,
      glare: true,
      'max-glare': 0.25,
      scale: 1.08
    });
  }

  const createImageParticles = () => {
    const container = document.querySelector('.image-particles');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.background = ['#00e5ff', '#4f46e5', '#9333ea'][Math.floor(Math.random() * 3)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      particle.style.animation = `float ${4 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.boxShadow = '0 0 ' + (Math.random() * 8 + 2) + 'px currentColor';
      container.appendChild(particle);
    }
  };

  createImageParticles();

  document.querySelectorAll('.btn, .social-icons a, .project-card, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform .3s ease, box-shadow .3s ease';
    });
  });

  document.querySelectorAll('.contact-actions a[data-action]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const action = link.getAttribute('data-action');
      const value = link.getAttribute('data-value');

      if (!value) return;

      event.preventDefault();
      if (action === 'call') {
        window.location.href = `tel:${value}`;
      } else if (action === 'email') {
        window.location.href = `mailto:${value}`;
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  gsap.from('.line-line', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.hero-image-container', {
    x: 40,
    opacity: 0,
    duration: 1.1,
    delay: 0.4,
    ease: 'power3.out'
  });

  gsap.from('.hero-actions .btn', {
    y: 18,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    delay: 0.8,
    ease: 'power2.out'
  });

  const parallaxItems = document.querySelectorAll('.orb, .floating-card, .hero-image-container');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    parallaxItems.forEach((item) => {
      if (!item.classList.contains('hero-image-container')) {
        item.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  });
});
