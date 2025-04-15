export function initializeAniversariantes() {
    const aniversariantes = [
        { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_breno.jpg" },
        { nome: "Will", dataAniversario: "2025-04-14", foto: "assets/foto_will.jpeg" }
    ];

    const mensagens = [
        "🎉 Aproveite o seu dia especial!",
        "🎂 Que este seja o melhor aniversário da sua vida!",
        "🥳 Celebre com muita alegria e amor hoje!",
        "🎈 Parabéns pelo seu dia maravilhoso!"
    ];

    function exibirAniversariante() {
        // Obtemos a data no formato correto, considerando horário local
        const hoje = new Date().toLocaleDateString("en-CA"); // Formato ISO: YYYY-MM-DD
        console.log("Data de hoje:", hoje); // Depuração: Mostra a data atual no console

        // Buscamos o aniversariante correspondente à data
        const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);
        console.log("Aniversariante encontrado:", aniversariante); // Depuração: Verifica o aniversariante encontrado

        const container = document.getElementById("aniversarianteDoDia");

        if (!container) {
            console.error("Elemento #aniversarianteDoDia não foi encontrado!");
            return;
        }

        // Limpa o conteúdo do container antes de atualizá-lo
        container.innerHTML = "";

        if (aniversariante) {
            // Exibe o aniversariante do dia com uma mensagem aleatória
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
            // Exibe uma mensagem padrão se não houver aniversariante
            container.innerHTML = `
                <h3>🎂 Nenhum aniversariante hoje</h3>
            `;
        }
    }

    exibirAniversariante();
}
