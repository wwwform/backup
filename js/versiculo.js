
export function initializeVersiculo() {
    const gerarVersiculoButton = document.getElementById('gerar-versiculo');
    const versiculoTextArea = document.getElementById('versiculo');
    const enviarWhatsAppButton = document.getElementById('enviar-whatsapp');

    async function fetchVersiculos() {
        const response = await fetch('versiculos.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar os versículos');
        }
        const versiculos = await response.json();
        return versiculos;
    }

    function getRandomVersiculo(versiculos) {
        const randomIndex = Math.floor(Math.random() * versiculos.length);
        return versiculos[randomIndex];
    }

    gerarVersiculoButton.addEventListener('click', async () => {
        try {
            const versiculos = await fetchVersiculos();
            const versiculo = getRandomVersiculo(versiculos);
            if (versiculo && versiculo.versiculo && versiculo.localizacao) {
                versiculoTextArea.value = `${versiculo.localizacao} - ${versiculo.versiculo}`;
            } else {
                versiculoTextArea.value = 'Erro ao gerar versículo.';
            }
        } catch (error) {
            console.error('Erro ao gerar versículo:', error);
            versiculoTextArea.value = 'Erro ao gerar versículo.';
        }
    });

    enviarWhatsAppButton.addEventListener('click', () => {
        const versiculo = versiculoTextArea.value;
        if (versiculo) {
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(versiculo)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Primeiro gere um versículo.');
        }
    });
}
