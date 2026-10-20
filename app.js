(() => {
  'use strict';
  const config = window.OFERTA_CONFIG || {};
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const dialogs = $$('dialog');
  let lastFocus = null;

  function openDialog(dialog) {
    if (dialog.open) return;
    const alreadyOpen = dialogs.some(item => item.open);
    if (!alreadyOpen) lastFocus = document.activeElement;
    dialogs.forEach(item => { if (item.open) item.close(); });
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
  }
  dialogs.forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      // A second dialog may have opened in the same event (checkout preview).
      if (!dialogs.some(item => item.open)) {
        document.body.classList.remove('dialog-open');
        if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
      }
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));

  // Choosing the starter guide first presents the optional R$47 complete course.
  $$('[data-open-upgrade]').forEach(button => {
    button.addEventListener('click', () => openDialog($('#upgrade-modal')));
  });

  // Keep all payment destinations in config.js. Empty links never lead to a fake checkout.
  $$('[data-checkout]').forEach(button => button.addEventListener('click', () => {
    const plans = {
      completo: { url: config.checkoutCompleto, label: 'O curso completo de R$57' },
      inicial: { url: config.checkoutInicial, label: 'O guia inicial de R$12,90' },
      completo47: { url: config.checkoutCompleto47, label: 'O curso completo com desconto de R$47' }
    };
    const plan = plans[button.dataset.checkout];
    if (!plan) return;
    const raw = String(plan.url || '').trim();
    let destination;
    try {
      const url = new URL(raw);
      if (url.protocol === 'https:' || url.protocol === 'http:') destination = url.href;
    } catch (_) { /* Unconfigured or invalid checkout uses the preview notice. */ }
    if (destination) {
      window.location.assign(destination);
      return;
    }
    $('#notice-body').textContent = plan.label + ' ainda está sendo preparado. Volte em breve para concluir sua compra.';
    openDialog($('#notice-modal'));
  }));

  const tabs = $$('[role="tab"]');
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      item.classList.toggle('is-active', active);
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activateTab(target, true); }
    });
  });

  function readNumber(id) {
    const input = document.getElementById(id);
    const value = input.valueAsNumber;
    if (!Number.isFinite(value)) return 0;
    return Math.min(Number(input.max), Math.max(0, value));
  }
  function calculate() {
    const quantity = Math.floor(readNumber('quantity'));
    const gross = quantity * readNumber('price');
    const variable = quantity * readNumber('cost');
    const fixed = readNumber('fixed');
    const net = gross - variable - fixed;
    $('#gross-result').textContent = money.format(gross);
    $('#variable-result').textContent = '− ' + money.format(variable);
    $('#fixed-result').textContent = '− ' + money.format(fixed);
    $('#net-result').textContent = money.format(net);
    $('.calc-total').classList.toggle('is-negative', net < 0);
  }
  $('#calculator-form').addEventListener('input', calculate);
  $('#calculator-form').addEventListener('submit', event => event.preventDefault());
  $$('#calculator-form input').forEach(input => input.addEventListener('change', () => {
    const value = readNumber(input.id);
    input.value = input.id === 'quantity' ? Math.floor(value) : value;
    calculate();
  }));
  calculate();

  const supportEmail = String(config.emailSuporte || '').trim();
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail);
  if (hasEmail) {
    $('#support-link').href = 'mailto:' + supportEmail;
    $('#support-link').hidden = false;
  }
  const sellerName = String(config.nomeResponsavel || '').trim();
  const sellerDocument = String(config.documentoResponsavel || '').trim();
  if (sellerName) {
    $('#seller-info').textContent = sellerName + (sellerDocument ? ' • ' + sellerDocument : '');
    $('#seller-info').hidden = false;
  }
  $('#year').textContent = String(new Date().getFullYear());
  const legalContent = {
    privacidade: {
      title: 'Privacidade',
      sections: [
        ['Sobre esta página', 'Esta página não solicita cadastro, não coleta dados de pagamento e não utiliza pixels de publicidade ou ferramentas de análise. Os valores da calculadora são processados no seu navegador e não são enviados a um servidor.'],
        ['Escolha da oferta', 'O pop-up de desconto aparece quando você escolhe o guia inicial. Você pode aceitar a oferta do curso completo, continuar com o guia ou fechar a janela. Essa escolha não é enviada a um servidor por esta página.'],
        ['Ao comprar', 'Ao seguir para o checkout, o tratamento dos dados fornecidos será realizado pela plataforma de pagamento e pelo responsável pela oferta, conforme os avisos de privacidade apresentados durante a compra.'],
        ['Contato', hasEmail ? 'Para assuntos de privacidade, entre em contato pelo e-mail ' + supportEmail + '.' : 'O canal de atendimento do responsável pela oferta será informado no checkout e no comprovante de compra.']
      ]
    },
    termos: {
      title: 'Termos da oferta',
      sections: [
        ['Produtos digitais', 'O curso completo custa R$57 em pagamento único e inclui os conteúdos e quatro bônus apresentados nesta página. O guia inicial custa R$12,90 e contém receitas em PDF; não inclui as aulas em vídeo nem os bônus do curso. Ao escolher o guia inicial, você pode optar pelo curso completo com todos os bônus por R$47 no pop-up. R$47 é o valor total do curso nessa oferta, não uma cobrança adicional de R$47 sobre o guia. Nenhum item físico será enviado.'],
        ['Acesso e garantia', 'As instruções de acesso são enviadas ao e-mail informado na compra, após a confirmação do pagamento. A garantia é de 7 dias após a compra. Solicite o reembolso pelo canal indicado no comprovante ou na plataforma de pagamento.'],
        ['Resultados', 'O conteúdo é educacional. Os exemplos da calculadora são hipotéticos e não representam promessa de vendas, faturamento ou lucro. Os resultados dependem de custos, demanda, prática e execução. As imagens ilustram possibilidades de apresentação.'],
        ['Preparo e venda', 'Cabe a quem prepara conferir ingredientes, alergênicos, higiene, conservação, rotulagem e os requisitos locais de comercialização. O curso não certifica a cozinha ou os produtos do aluno.'],
        ['Responsável pela oferta', sellerName ? sellerName + (sellerDocument ? ' — ' + sellerDocument : '') + (hasEmail ? '. Atendimento: ' + supportEmail + '.' : '.') : 'Os dados do responsável pela oferta serão apresentados no checkout e no comprovante de compra.']
      ]
    }
  };
  $$('[data-open-legal]').forEach(button => button.addEventListener('click', () => {
    const content = legalContent[button.dataset.openLegal];
    $('#legal-title').textContent = content.title;
    const target = $('#legal-content');
    target.replaceChildren();
    content.sections.forEach(([title, body]) => {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      const p = document.createElement('p');
      p.textContent = body;
      target.append(h3, p);
    });
    openDialog($('#legal-modal'));
  }));

  if ('IntersectionObserver' in window) {
    const offerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => $('.mobile-bar').classList.toggle('is-hidden', entry.isIntersecting));
    }, { threshold: 0.25 });
    offerObserver.observe($('.price-card'));
  }
})();
