const INTERVALO_RECARREGAMENTO_MS = 30000;
const LOG_PREFIXO = '[Monitor Ticketmaster]';

function paginaEstaEsgotada() {
  const statusSpan = document.querySelector('#picker-bar .event-status.status-soldout span');

  if (statusSpan && statusSpan.textContent) {
    return statusSpan.textContent.trim().toLowerCase().includes('esgotado');
  }

  return document.body.innerText.toLowerCase().includes('esgotado');
}

let ultimoEstado = paginaEstaEsgotada();
let recargaTimerId = null;

console.log(`${LOG_PREFIXO} Script iniciado.`);

function agendarRecarga() {
  if (recargaTimerId !== null) {
    return;
  }

  console.log(`${LOG_PREFIXO} Esgotado detectado. Recarregando em ${INTERVALO_RECARREGAMENTO_MS / 1000}s.`);

  recargaTimerId = window.setTimeout(() => {
    recargaTimerId = null;

    if (paginaEstaEsgotada()) {
      console.log(`${LOG_PREFIXO} Recarregando pagina para verificar disponibilidade.`);
      location.reload();
    }
  }, INTERVALO_RECARREGAMENTO_MS);
}

function cancelarRecarga() {
  if (recargaTimerId === null) {
    return;
  }

  window.clearTimeout(recargaTimerId);
  recargaTimerId = null;
  console.log(`${LOG_PREFIXO} Esgotado nao detectado. Recarga automatica cancelada.`);
}

const observer = new MutationObserver(() => {
  const temEsgotado = paginaEstaEsgotada();

  
  if (ultimoEstado && !temEsgotado) {
    console.log(`${LOG_PREFIXO} POSSIVEL LIBERACAO!`);

    chrome.runtime.sendMessage({
      type: 'MUDANCA_DETECTADA'
    });
  }

  if (temEsgotado) {
    agendarRecarga();
  } else {
    cancelarRecarga();
  }

  ultimoEstado = temEsgotado;
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});

if (ultimoEstado) {
  agendarRecarga();
}