const PROFILE = {
  email: "gunegrini10@gmail.com",
  github: "https://github.com/LuisNegriniDev",
  linkedin: "https://www.linkedin.com/in/luis-gustavo-negrini-muniz-10b662394/"
};

// Menu responsivo
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      navigation.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      navigation.classList.remove('is-open');
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      navigation.classList.remove('is-open');
    }
  });
}

// Ano exibido no cabeçalho e no rodapé
const currentYear = new Date().getFullYear();
const year = document.querySelector('#year');
const heroYear = document.querySelector('#hero-year');
if (year) year.textContent = currentYear;
if (heroYear) heroYear.textContent = currentYear;

// Alternância de tema
const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  const themeStorageKey = 'luis-dev-theme';

  function applyTheme(isLight) {
    document.documentElement.classList.toggle('light-theme', isLight);
    themeButton.setAttribute('aria-pressed', String(isLight));
    themeButton.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    themeButton.title = isLight ? 'Ativar tema escuro' : 'Ativar tema claro';
    const icon = themeButton.querySelector('span');
    if (icon) icon.textContent = isLight ? '☾' : '◐';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isLight ? '#F7F6FA' : '#09090D';
  }

  // O tema também é inicializado no <head> para evitar um flash do tema errado.
  applyTheme(document.documentElement.classList.contains('light-theme'));

  themeButton.addEventListener('click', () => {
    const isLight = !document.documentElement.classList.contains('light-theme');
    applyTheme(isLight);
    try {
      localStorage.setItem(themeStorageKey, isLight ? 'light' : 'dark');
    } catch {
      // O tema continua alternando mesmo quando o armazenamento está indisponível.
    }
  });
}

// Seção atual na navegação
const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  observedSections.forEach((section) => navObserver.observe(section));
}

// Filtros de projetos
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const filterTimers = new WeakMap();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const before = new Map([...projectCards].map((card) => [card, card.getBoundingClientRect()]));
    projectCards.forEach((card) => {
      const shouldHide = filter !== 'all' && card.dataset.category !== filter;
      clearTimeout(filterTimers.get(card));
      if (shouldHide) {
        card.classList.add('is-exiting');
        filterTimers.set(card, setTimeout(() => { card.classList.add('is-hidden'); card.classList.remove('is-exiting'); }, 220));
      } else {
        card.classList.remove('is-hidden');
        card.classList.remove('is-exiting');
        requestAnimationFrame(() => card.classList.add('is-entering'));
        setTimeout(() => card.classList.remove('is-entering'), 450);
      }
    });
    requestAnimationFrame(() => {
      projectCards.forEach((card) => {
        if (card.classList.contains('is-hidden')) return;
        const oldRect = before.get(card);
        const newRect = card.getBoundingClientRect();
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        if (dx || dy) card.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
      });
      const count = [...projectCards].filter((card) => filter === 'all' || card.dataset.category === filter).length;
      const output = document.querySelector('.filter-result');
      if (output) output.textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'projeto' : 'projetos'}`;
    });
  });
});

// Conteúdo dos estudos de caso
const cases = {
  techshop: {
    number: 'PROJECT / 001',
    title: 'TechShop',
    summary: 'Catálogo de produtos desenvolvido para a disciplina de Programação para Internet, com HTML e CSS.',
    objective: 'Apresentar produtos em uma página de loja com conteúdo organizado, hierarquia visual e layout adaptável.',
    learning: 'Praticar estruturação semântica, estilos CSS e composição de uma interface responsiva.',
    features: ['Catálogo de produtos', 'Categorias de produtos', 'Layout responsivo simples'],
    technologies: ['HTML5', 'CSS3'], image: '', github: 'https://github.com/LuisNegriniDev/techshop-web',
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  evolution: {
    number: 'PROJECT / 002',
    title: 'Evolution',
    summary: 'Rastreador de hábitos com uma mecânica de XP e níveis, inspirado em interfaces de RPG.',
    objective: 'Conceder XP ao concluir hábitos e avançar o nível ao atingir a pontuação definida.',
    learning: 'Praticar eventos, atualização do DOM e feedback visual. A versão atual não mantém o progresso após recarregar a página.',
    features: ['Marcar hábitos como concluídos', 'Ganhar XP por hábito', 'Avançar de nível ao atingir 100 XP'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'], image: 'assets/evolution.png', github: 'https://github.com/LuisNegriniDev/Evolution',
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  taskflow: {
    number: 'PROJECT / 003',
    title: 'TaskFlow',
    summary: 'Aplicação web para organizar tarefas do dia a dia.',
    objective: 'Adicionar, concluir e excluir tarefas, mantendo a lista salva no navegador com LocalStorage.',
    learning: 'Praticar JavaScript, manipulação da interface e persistência local de dados.',
    features: ['Adicionar tarefas', 'Marcar tarefas como concluídas', 'Excluir itens', 'Persistir lista com LocalStorage'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'], image: 'assets/Taskflow.png', github: 'https://github.com/LuisNegriniDev/taskflow',
    status: 'CÓDIGO E CAPTURAS DISPONÍVEIS NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  }
};

// Diálogo dos estudos de caso
const dialog = document.querySelector('#case-dialog');
const dialogClose = document.querySelector('.dialog-close');

document.querySelectorAll('[data-case]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = cases[button.dataset.case];
    if (!project || !dialog) return;

    document.querySelector('#dialog-number').textContent = project.number;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-summary').textContent = project.summary;
    const imageWrap = document.querySelector('#case-image-wrap');
    imageWrap.replaceChildren();
    if (project.image) {
      const image = document.createElement('img'); image.src = project.image; image.alt = `Captura de tela do projeto ${project.title}`; imageWrap.append(image);
    } else imageWrap.innerHTML = '<div class="case-no-image"><span>WEB / 001</span><strong>TECH<br>SHOP<span>.</span></strong><small>CATÁLOGO DE PRODUTOS</small></div>';
    document.querySelector('#case-github').href = project.github;
    const contentByTab = {
      overview: ['VISÃO GERAL', project.objective],
      features: ['FUNCIONALIDADES', project.features.join(' · ')],
      tech: ['TECNOLOGIAS', project.technologies.join(' · ')],
      learning: ['APRENDIZADOS', project.learning]
    };
    function selectCaseTab(tab) {
      document.querySelectorAll('[data-case-tab]').forEach((item) => { const active = item.dataset.caseTab === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
      const [heading, copy] = contentByTab[tab];
      const panel = document.querySelector('#case-panel');
      panel.classList.remove('is-changing');
      requestAnimationFrame(() => { panel.classList.add('is-changing'); panel.innerHTML = `<h3>${heading}</h3><p>${copy}</p>`; });
    }
    dialog._selectCaseTab = selectCaseTab;
    selectCaseTab('overview');

    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    const trigger = card.querySelector('[data-case]');
    trigger?.click();
  });
});

if (dialogClose && dialog) {
  dialogClose.addEventListener('click', () => dialog.close());
}

document.querySelectorAll('[data-case-tab]').forEach((tab) => {
  tab.addEventListener('click', () => dialog?._selectCaseTab?.(tab.dataset.caseTab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll('[data-case-tab]')];
    const next = (tabs.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    tabs[next].focus(); tabs[next].click();
  });
});

if (dialog) {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

// Links e ações de contato
const feedback = document.querySelector('#contact-feedback');
const emailLink = document.querySelector('#email-link');
const copyEmailButton = document.querySelector('#copy-email');
const githubLink = document.querySelector('#github-link');
const linkedinLink = document.querySelector('#linkedin-link');
const contactHint = document.querySelector('#contact-hint');

const validEmail = PROFILE.email
  && !PROFILE.email.includes('SEU_EMAIL')
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PROFILE.email);
const validGithub = PROFILE.github && !PROFILE.github.includes('SEU_USUARIO');
const validLinkedin = PROFILE.linkedin && !PROFILE.linkedin.includes('SEU_USUARIO');

function showFeedback(message) {
  if (feedback) {
    feedback.textContent = message;
    feedback.classList.remove('is-visible');
    requestAnimationFrame(() => feedback.classList.add('is-visible'));
  }
}

if (validEmail && emailLink) {
  emailLink.href = `mailto:${PROFILE.email}`;
  emailLink.removeAttribute('aria-disabled');
  emailLink.classList.remove('is-unconfigured');
} else if (emailLink) {
  emailLink.href = '#contato';
  emailLink.setAttribute('aria-disabled', 'true');
  emailLink.classList.add('is-unconfigured');
  emailLink.title = 'Adicione seu e-mail no objeto PROFILE do script.js para ativar este botão.';
}

if (validGithub && githubLink) githubLink.href = PROFILE.github;
if (validLinkedin && linkedinLink) linkedinLink.href = PROFILE.linkedin;

if (contactHint) {
  contactHint.textContent = validEmail
    ? 'GitHub, LinkedIn e e-mail configurados. Confirme os destinos antes de publicar.'
    : 'GitHub e LinkedIn já estão configurados. O e-mail ainda não foi informado; adicione-o em PROFILE no script.js para ativar o contato por e-mail.';
}

if (copyEmailButton) {
  if (!validEmail) {
    copyEmailButton.disabled = true;
    copyEmailButton.title = 'Adicione seu e-mail no objeto PROFILE do script.js para ativar este botão.';
  }

  copyEmailButton.addEventListener('click', async () => {
    if (!validEmail) {
      showFeedback('Adicione seu e-mail no objeto PROFILE do script.js para ativar a cópia.');
      return;
    }

    try {
      await navigator.clipboard.writeText(PROFILE.email);
      showFeedback('E-mail copiado para a área de transferência.');
    } catch {
      showFeedback(`Seu e-mail é: ${PROFILE.email}`);
    }
  });
}

// Animação de entrada durante a rolagem
const revealTargets = document.querySelectorAll(
  '.about-facts article, .skill, .project-card, .process-grid article, .timeline-item'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('reveal-ready'));

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
}

// Progresso global, estado do header e animação de marcadores editoriais.
const progressBar = document.querySelector('.scroll-progress span');
const siteHeader = document.querySelector('.site-header');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let scrollFrame = 0;

function updateScrollDetails() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
  if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);

  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const bounds = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight * .78 - bounds.top) / (bounds.height + window.innerHeight * .25)));
    timeline.style.setProperty('--timeline-progress', progress);
  }
  scrollFrame = 0;
}

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollDetails);
}, { passive: true });
updateScrollDetails();

const editorialMarkers = document.querySelectorAll('.section-kicker');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const markerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .5 });
  editorialMarkers.forEach((marker) => markerObserver.observe(marker));
} else editorialMarkers.forEach((marker) => marker.classList.add('is-visible'));

// Interações de cursor limitadas a ponteiro fino e movimento normal.
if (!motionPreference.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const portrait = document.querySelector('.portrait-frame');
  const visual = document.querySelector('.hero-visual');
  if (portrait && visual) {
    visual.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      portrait.style.transform = `rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateZ(4px)`;
    });
    visual.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
  });
}

// Command palette: pesquisa, setas, Enter, Escape e atalhos globais.
const palette = document.querySelector('#command-palette');
const paletteInput = document.querySelector('#palette-input');
const paletteOptions = document.querySelector('#palette-options');
const paletteActions = [
  { label: 'Início', hint: 'Ir para abertura', target: '#inicio' },
  { label: 'Sobre mim', hint: 'Conheça Luis', target: '#sobre' },
  { label: 'Habilidades', hint: 'Tecnologias em prática', target: '#habilidades' },
  { label: 'Projetos', hint: 'Explorar estudos de caso', target: '#projetos' },
  { label: 'Estudo de caso Evolution', hint: 'Abrir detalhes do projeto', action: () => document.querySelector('[data-case="evolution"]')?.click() },
  { label: 'Estudo de caso TaskFlow', hint: 'Abrir detalhes do projeto', action: () => document.querySelector('[data-case="taskflow"]')?.click() },
  { label: 'Estudo de caso TechShop', hint: 'Abrir detalhes do projeto', action: () => document.querySelector('[data-case="techshop"]')?.click() },
  { label: 'Trajetória', hint: 'Ver projetos e processo', target: '#trajetoria' },
  { label: 'Contato', hint: 'Falar com Luis', target: '#contato' },
  { label: 'Alternar tema', hint: 'Claro / escuro', action: () => themeButton?.click() },
  { label: 'Repositório TechShop', hint: 'Abrir GitHub ↗', url: 'https://github.com/LuisNegriniDev/techshop-web' },
  { label: 'Repositório Evolution', hint: 'Abrir GitHub ↗', url: 'https://github.com/LuisNegriniDev/Evolution' },
  { label: 'Repositório TaskFlow', hint: 'Abrir GitHub ↗', url: 'https://github.com/LuisNegriniDev/taskflow' }
];
let paletteIndex = 0;
let visiblePaletteActions = [...paletteActions];

function renderPalette(query = '') {
  if (!paletteOptions) return;
  visiblePaletteActions = paletteActions.filter((item) => `${item.label} ${item.hint}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));
  paletteIndex = Math.min(paletteIndex, Math.max(0, visiblePaletteActions.length - 1));
  paletteOptions.replaceChildren(...visiblePaletteActions.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `palette-option${index === paletteIndex ? ' is-selected' : ''}`;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', String(index === paletteIndex));
    button.innerHTML = `<span>${item.label}</span><small>${item.hint}</small>`;
    button.addEventListener('click', () => runPaletteAction(item));
    return button;
  }));
  if (!visiblePaletteActions.length) paletteOptions.innerHTML = '<p class="palette-empty">Nenhum resultado encontrado.</p>';
}

function runPaletteAction(item) {
  if (palette?.open) palette.close();
  if (item.target) document.querySelector(item.target)?.scrollIntoView({ behavior: motionPreference.matches ? 'auto' : 'smooth' });
  else if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
  else item.action?.();
}

function openPalette() {
  if (!palette) return;
  if (typeof palette.showModal === 'function') palette.showModal();
  if (paletteInput) { paletteInput.value = ''; renderPalette(); paletteInput.focus(); }
}

document.querySelectorAll('[data-palette-open]').forEach((button) => button.addEventListener('click', openPalette));
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openPalette(); }
  if (!palette?.open || !['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    paletteIndex = (paletteIndex + (event.key === 'ArrowDown' ? 1 : visiblePaletteActions.length - 1)) % (visiblePaletteActions.length || 1);
    renderPalette(paletteInput?.value || '');
    paletteOptions?.querySelectorAll('button')[paletteIndex]?.scrollIntoView({ block: 'nearest' });
  } else if (visiblePaletteActions[paletteIndex]) { event.preventDefault(); runPaletteAction(visiblePaletteActions[paletteIndex]); }
});
paletteInput?.addEventListener('input', () => { paletteIndex = 0; renderPalette(paletteInput.value); });
renderPalette();

// Tecnologias: relações limitadas ao conteúdo e aos repositórios apresentados.
const technologyDetails = {
  html: { title: 'HTML5', text: 'Estrutura o conteúdo e os elementos das interfaces mostradas nos projetos.', projects: ['techshop', 'evolution', 'taskflow'] },
  css: { title: 'CSS3', text: 'Define o layout, a apresentação visual e os ajustes responsivos dos projetos web.', projects: ['techshop', 'evolution', 'taskflow'] },
  javascript: { title: 'JavaScript', text: 'Implementa interações de hábitos no Evolution e operações de tarefas no TaskFlow.', projects: ['evolution', 'taskflow'] },
  cpp: { title: 'C++', text: 'Está em evolução nos estudos de lógica e fundamentos. Ainda não aparece nos projetos apresentados.', projects: [] },
  sql: { title: 'SQL', text: 'Está em evolução nos estudos de consultas e organização de dados. Ainda não aparece nos projetos apresentados.', projects: [] },
  git: { title: 'Git & GitHub', text: 'Os repositórios dos três projetos estão publicados no GitHub.', projects: ['techshop', 'evolution', 'taskflow'] }
};
const projectNames = { techshop: 'TechShop', evolution: 'Evolution', taskflow: 'TaskFlow' };
const projectRepos = { techshop: 'techshop-web', evolution: 'Evolution', taskflow: 'taskflow' };
function selectTechnology(item) {
  document.querySelectorAll('.skill').forEach((skill) => { const active = skill === item; skill.classList.toggle('is-selected', active); skill.setAttribute('aria-expanded', String(active)); });
  const data = technologyDetails[item.dataset.tech];
  const panel = document.querySelector('#tech-detail');
  panel.querySelector('.tech-detail-index').textContent = `TECNOLOGIA / ${item.dataset.tech.toUpperCase()}`;
  panel.querySelector('h3').textContent = data.title;
  panel.querySelector('p').textContent = data.text;
  const links = panel.querySelector('.tech-project-links');
  links.replaceChildren(...data.projects.map((name) => {
    const link = document.createElement('a'); link.href = `https://github.com/LuisNegriniDev/${projectRepos[name]}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${projectNames[name]} ↗`; return link;
  }));
}
document.querySelectorAll('.skill[data-tech]').forEach((item) => {
  item.addEventListener('click', () => selectTechnology(item));
  item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectTechnology(item); } });
});

// Capturas em lightbox, sem navegar para fora do portfólio.
const lightbox = document.querySelector('#image-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
document.querySelectorAll('.project-preview').forEach((preview) => preview.addEventListener('click', (event) => {
  event.preventDefault();
  const source = preview.querySelector('img');
  if (!source || !lightbox) return;
  lightboxImage.src = source.src;
  lightboxImage.alt = source.alt;
  document.querySelector('#lightbox-caption').textContent = source.alt;
  lightbox.showModal();
}));
document.querySelector('#case-image-wrap')?.addEventListener('click', (event) => {
  const source = event.target.closest('img');
  if (!source || !lightbox) return;
  lightboxImage.src = source.src;
  lightboxImage.alt = source.alt;
  document.querySelector('#lightbox-caption').textContent = source.alt;
  lightbox.showModal();
});
document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox?.addEventListener('close', () => { lightboxImage.removeAttribute('src'); });
