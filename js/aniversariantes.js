export function initializeAniversariantes() {
    const aniversariantes = [
        { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_breno.jpg" },
        { nome: "Will", dataAniversario: "2025-04-15", foto: "assets/foto_will.jpeg" } // Alterei a data para testar ontem
    ];

    const mensagens = [
        "🎉 Aproveite o seu dia especial!",
        "🎂 Que este seja o melhor aniversário da sua vida!",
        "🥳 Celebre com muita alegria e amor hoje!",
        "🎈 Parabéns pelo seu dia maravilhoso!"
    ];

    function exibirAniversariante() {
        // Obtenha a data de hoje no formato correto (YYYY-MM-DD)
        const hoje = new Date().toISOString().split("T")[0];
        console.log("Data de hoje:", hoje); // Depuração: Verifique a data atual

        // Encontre o aniversariante correspondente à data atual
        const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);
        console.log("Aniversariante encontrado:", aniversariante); // Depuração: Verifique o aniversariante encontrado

        const container = document.getElementById("aniversarianteDoDia");

        if (!container) {
            console.error("Elemento #aniversarianteDoDia não encontrado!");
            return;
        }

        // Limpe o conteúdo antes de atualizar
        container.innerHTML = "";

        if (aniversariante) {
            // Exiba o aniversariante com mensagem aleatória
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
            // Exiba mensagem padrão quando não houver aniversariante
            container.innerHTML = `
                <h3>🎂 Nenhum aniversariante hoje</h3>
            `;
        }
    }

    exibirAniversariante();
}
