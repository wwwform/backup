// Lista de aniversariantes
const aniversariantes = [
    { nome: "Breno", dataAniversario: "2025-07-03", foto: "assets/foto_joao.jpg" },
    { nome: "Will", dataAniversario: "2025-04-15", foto: "assets/foto_will.jpeg" }
];

// Função para alternar entre as seções do menu
function alternarSeções() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contents = document.querySelectorAll('.content');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            // Ativa a seção correspondente
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Função para exibir o aniversariante do dia
function exibirAniversariante() {
    const hoje = new Date().toISOString().split("T")[0];
    const aniversariante = aniversariantes.find(pessoa => pessoa.dataAniversario === hoje);

    const container = document.getElementById("aniversarianteDoDia");
    if (!container) return;

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

// Executa as funções ao carregar a página
window.onload = () => {
    alternarSeções();
    exibirAniversariante();
};

