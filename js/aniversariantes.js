export function initializeAniversariantes() {
    const aniversariantes = [
        { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_breno.jpg" },
        { nome: "Will", dataAniversario: "2025-04-15", foto: "assets/foto_will.jpeg" }
    ];

    function exibirAniversariante() {
        const hoje = new Date().toISOString().split("T")[0];
        console.log("Data de hoje:", hoje); // Depuração: verifica a data atual
        const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);
        console.log("Aniversariante encontrado:", aniversariante); // Depuração: verifica aniversariante encontrado

        const container = document.getElementById("aniversarianteDoDia");
        if (!container) {
            console.error("Elemento #aniversarianteDoDia não encontrado!");
            return;
        }

        if (aniversariante) {
            container.innerHTML = `
                <h3>🎉 Feliz Aniversário! 🎉</h3>
                <img src="${aniversariante.foto}" alt="Foto de ${aniversariante.nome}" width="200">
                <p>${aniversariante.nome}</p>
            `;
        } else {
            container.innerHTML = `
                <h3>🎂 Nenhum aniversariante hoje</h3>
            `;
        }
    }

    exibirAniversariante(); // Chama a função para exibir o aniversariante
}

