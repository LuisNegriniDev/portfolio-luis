/* PERSONALIZE AQUI ANTES DE PUBLICAR.
   Use somente links e informações verdadeiros.
*/
const PROFILE = {
  email: "SEU_EMAIL_AQUI",
  github: "https://github.com/LuisNegriniDev",
  linkedin: "https://www.linkedin.com/in/luis-gustavo-negrini-muniz-10b662394/"
};

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

// Ano automático no rodapé e na apresentação.
const currentYear = new Date().getFullYear();
const year = document.querySelector('#year');
const heroYear = document.querySelector('#hero-year');
if (year) year.textContent = currentYear;
if (heroYear) heroYear.textContent = currentYear;

// Tema alternativo, sem depender de bibliotecas externas.
const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('light-theme');
    themeButton.setAttribute('aria-pressed', String(enabled));
    themeButton.setAttribute('aria-label', enabled ? 'Voltar ao tema original' : 'Alternar tema de cores');
    themeButton.title = enabled ? 'Voltar ao tema original' : 'Alternar tema';
  });
}

// Filtro de projetos.
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

// Estudos de caso abertos em uma janela acessível.
const cases = {
  techshop: {
    number: 'PROJECT / 001',
    title: 'TechShop',
    summary: 'Projeto acadêmico desenvolvido para a disciplina de Programação para Internet: um catálogo de produtos com HTML5 e CSS3.',
    objective: 'Apresentar produtos em uma página web com estrutura clara, layout responsivo simples e efeitos visuais em CSS, conforme descrito no README do repositório.',
    learning: 'Praticar HTML semântico, estruturação de conteúdo, estilos CSS e organização de arquivos de um site estático.',
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  evolution: {
    number: 'PROJECT / 002',
    title: 'Evolution',
    summary: 'Rastreador de hábitos gamificado, feito com HTML, CSS e JavaScript e inspirado em interfaces de RPG.',
    objective: 'Os botões CLAIM XP acrescentam 10 XP por clique; ao alcançar 100 XP, o nível aumenta e o contador de XP volta a zero. A versão atual demonstra essa progressão na página.',
    learning: 'Praticar manipulação do DOM, eventos JavaScript, Flexbox e conceitos de UI gamificada. A persistência entre recargas não está implementada na versão atual.',
    status: 'CÓDIGO DISPONÍVEL NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  },
  taskflow: {
    number: 'PROJECT / 003',
    title: 'TaskFlow',
    summary: 'Aplicação web simples para organizar tarefas do dia a dia.',
    objective: 'Permitir adicionar tarefas, marcá-las como concluídas, excluí-las e preservar os dados com LocalStorage no navegador, conforme documentado no README.',
    learning: 'Praticar HTML5, CSS3, JavaScript, manipulação da interface e persistência local de dados.',
    status: 'CÓDIGO E CAPTURAS DISPONÍVEIS NO GITHUB • DEMO AO VIVO NÃO INFORMADA'
  }
};

const dialog = document.querySelector('#case-dialog');
const dialogClose = document.querySelector('.dialog-close');
const feedback = document.querySelector('#contact-feedback');
function showFeedback(message) {
  if (feedback) feedback.textContent = message;
}

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

if (dialogClose && dialog) dialogClose.addEventListener('click', () => dialog.close());
if (dialog) {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

// Liga os contatos ao perfil definido no começo deste arquivo.
const emailLink = document.querySelector('#email-link');
const copyEmailButton = document.querySelector('#copy-email');
const githubLink = document.querySelector('#github-link');
const linkedinLink = document.querySelector('#linkedin-link');
const contactHint = document.querySelector('#contact-hint');
const validEmail = PROFILE.email && !PROFILE.email.includes('SEU_EMAIL') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PROFILE.email);
const validGithub = PROFILE.github && !PROFILE.github.includes('SEU_USUARIO');
const validLinkedin = PROFILE.linkedin && !PROFILE.linkedin.includes('SEU_USUARIO');

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

// Pequena entrada suave de elementos quando suportada pelo navegador.
const revealTargets = document.querySelectorAll('.about-facts article, .skill, .project-card, .process-grid article, .timeline-item');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('reveal-ready'));
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
}
