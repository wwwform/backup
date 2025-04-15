export function initializeAniversariantes() {
    const aniversariantes = [
        { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_breno.jpg" },
        { nome: "Will", dataAniversario: "2025-04-12", foto: "assets/foto_will.jpeg" }
    ];

    const mensagens = [
        "🎉 Aproveite o seu dia especial!",
        "🎂 Que este seja o melhor aniversário da sua vida!",
        "🥳 Celebre com muita alegria e amor hoje!",
        "🎈 Parabéns pelo seu dia maravilhoso!"
    ];

    function exibirAniversariante() {
        const hoje = new Date().toISOString().split("T")[0];
        const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);
        const container = document.getElementById("aniversarianteDoDia");

        if (!container) return;

        if (aniversariante) {
            const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
            const mensagemCompartilhar = `Hoje é aniversário de ${aniversariante.nome}! 🎉 Desejamos a ele(a) muitas felicidades!`;
            const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagemCompartilhar)}`;
            
            container.innerHTML = `
                <h3>${mensagemAleatoria}</h3>
                <img src="${aniversariante.foto}" alt="Foto de ${aniversariante.nome}" width="200" style="border-radius: 50%; margin: 10px;">
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
