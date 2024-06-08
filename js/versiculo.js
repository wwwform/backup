import versiculos from './versiculos.json';

export function initVersiculo() {
  const btnGerarVersiculo = document.getElementById('gerar-versiculo');
  const versiculoTextarea = document.getElementById('versiculo');
  const btnCompartilhar = document.getElementById('enviar-whatsapp');

  btnGerarVersiculo.addEventListener('click', () => {
    const versiculoAleatorio = gerarVersiculoAleatorio();
    versiculoTextarea.value = versiculoAleatorio;
    atualizarLinkWhatsApp(versiculoAleatorio);
  });

  function gerarVersiculoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * versiculos.length);
    return versiculos[indiceAleatorio];
  }

  function atualizarLinkWhatsApp(versiculo) {
    const mensagem = encodeURIComponent(versiculo);
    btnCompartilhar.href = `https://wa.me/?text=${mensagem}`;
  }
}
