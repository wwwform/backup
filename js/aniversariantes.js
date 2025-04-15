// Lista de aniversariantes
const aniversariantes = [
    { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_joao.jpg" },
    { nome: "Enaily", dataAniversario: "2025-01-01", foto: "assets/foto_maria.jpg" },
    { nome: "Eversson", dataAniversario: "2025-08-04", foto: "assets/foto_maria.jpg" },
    { nome: "Larissa", dataAniversario: "2025-03-25", foto: "assets/foto_maria.jpg" },
    { nome: "Lorenzo", dataAniversario: "2025-10-16", foto: "assets/foto_maria.jpg" },
    { nome: "Tainá", dataAniversario: "2025-10-16", foto: "assets/foto_maria.jpg" },
    { nome: "Will", dataAniversario: "2025-04-15", foto: "assets/foto_will.jpeg" }
];

// Função para exibir o aniversariante do dia
function exibirAniversariante() {
    const hoje = new Date().toISOString().split("T")[0];
    const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);

    if (aniversariante) {
        const container = document.getElementById("aniversarianteDoDia");
        container.innerHTML = `
            <h3>🎉 Feliz Aniversário! 🎉</h3>
            <img src="${aniversariante.foto}" alt="Foto de ${aniversariante.nome}" width="200">
            <p>${aniversariante.nome}</p>
        `;
    }
}

// Executar a função ao carregar a página
window.onload = exibirAniversariante;
