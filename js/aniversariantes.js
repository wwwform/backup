export function initializeAniversariantes() {
    const aniversariantes = [
        { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_breno.jpg" },
        { nome: "Will", dataAniversario: "2025-04-15", foto: "assets/foto_will.jpeg" }
    ];

    const mensagensBiblicas = [
        "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele. - Salmos 118:24",
        "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios. - Salmos 90:12",
        "A bênção do Senhor traz riqueza e não inclui dor alguma. - Provérbios 10:22",
        "Porque eu bem sei os planos que estou projetando para vós, diz o Senhor; planos de paz e não de mal, para vos dar um futuro e uma esperança. - Jeremias 29:11",
        "Grandes coisas fez o Senhor por nós, e por isso estamos alegres. - Salmos 126:3",
        "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz. - Números 6:24-26"
    ];

    function exibirAniversariante() {
        const hoje = new Date().toLocaleDateString("en-CA"); // Formato ISO: YYYY-MM-DD
        console.log("Data processada:", hoje); // Depuração

        const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);
        console.log("Aniversariante encontrado:", aniversariante); // Depuração

        const container = document.getElementById("aniversarianteDoDia");

        if (!container) {
            console.error("Elemento #aniversarianteDoDia não foi encontrado!");
            return;
        }

        container.innerHTML = ""; // Limpa o conteúdo antes de atualizá-lo

        if (aniversariante) {
            const mensagemBiblica = mensagensBiblicas[Math.floor(Math.random() * mensagensBiblicas.length)];
            const mensagemCompartilhar = `Hoje é aniversário de ${aniversariante.nome}! 🎉 Feliz Aniversário! Este é um dia especial para celebrar a vida e agradecer ao Senhor: ${mensagemBiblica}`;
            const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagemCompartilhar)}`;
            
            container.innerHTML = `
                <h2>🎉 Feliz Aniversário! 🎉</h2>
                <p>Hoje é um dia especial para celebrar a vida e agradecer por todas as bênçãos:</p>
                <blockquote>${mensagemBiblica}</blockquote>
                <img src="${aniversariante.foto}" alt="Foto de ${aniversariante.nome}" width="200" style="border-radius: 10px; margin: 10px;">
                <p><strong>${aniversariante.nome}</strong></p>
                <a href="${whatsappLink}" target="_blank" style="text-decoration: none;">
                    <button style="background: #25d366; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Compartilhar no WhatsApp
                    </button>
                </a>
            `;
        } else {
            container.innerHTML = `
                <h3>🎂 Nenhum aniversariante hoje</h3>
            `;
        }
    }

    exibirAniversariante();
}
