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
  themeButton.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('light-theme');
    themeButton.setAttribute('aria-pressed', String(enabled));
    themeButton.setAttribute('aria-label', enabled ? 'Voltar ao tema original' : 'Alternar tema de cores');
    themeButton.title = enabled ? 'Voltar ao tema original' : 'Alternar tema';
  });
}

// Filtros de projetos
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    projectCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
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
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  evolution: {
    number: 'PROJECT / 002',
    title: 'Evolution',
    summary: 'Rastreador de hábitos com uma mecânica de XP e níveis, inspirado em interfaces de RPG.',
    objective: 'Conceder XP ao concluir hábitos e avançar o nível ao atingir a pontuação definida.',
    learning: 'Praticar eventos, atualização do DOM e feedback visual. A versão atual não mantém o progresso após recarregar a página.',
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  taskflow: {
    number: 'PROJECT / 003',
    title: 'TaskFlow',
    summary: 'Aplicação web para organizar tarefas do dia a dia.',
    objective: 'Adicionar, concluir e excluir tarefas, mantendo a lista salva no navegador com LocalStorage.',
    learning: 'Praticar JavaScript, manipulação da interface e persistência local de dados.',
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
    document.querySelector('#dialog-objective').textContent = project.objective;
    document.querySelector('#dialog-learning').textContent = project.learning;
    document.querySelector('#dialog-status').textContent = project.status;

    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

if (dialogClose && dialog) {
  dialogClose.addEventListener('click', () => dialog.close());
}

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
  if (feedback) feedback.textContent = message;
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
