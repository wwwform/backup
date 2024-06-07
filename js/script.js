<script>
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const versiculoTextarea = document.getElementById('versiculo');

    // Carregar versículos de um arquivo JSON
    async function carregarVersiculos() {
        try {
            const response = await fetch('js/versiculos.json');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar versículos:', error);
            return [];
        }
    }

    // Funcionalidade do menu
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('showing');
    });

    // Resto da funcionalidade do menu (adicionado)
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar que o link navegue para o #
            const targetId = link.getAttribute('data-target');
            document.querySelectorAll('.content').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            // Fechar o menu após clicar em um link
            menu.classList.remove('showing');
        });
    });

    // Funcionalidade de gerar versículo
    document.getElementById('gerar-versiculo').addEventListener('click', async () => {
        const versiculos = await carregarVersiculos();
        if (versiculos.length > 0) {
            const randomIndex = Math.floor(Math.random() * versiculos.length);
            versiculoTextarea.value = versiculos[randomIndex];
        } else {
            versiculoTextarea.value = "Erro ao carregar versículos.";
        }
    });

    // Funcionalidade de enviar para o WhatsApp
    document.getElementById('enviar-whatsapp').addEventListener('click', () => {
        const versiculo = versiculoTextarea.value;
        const url = `https://wa.me/?text=${encodeURIComponent(versiculo)}`;
        window.open(url, '_blank');
    });

    // Carregar a Bíblia (usando JSON para melhor desempenho)
    async function loadBible() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json');
            const bibleData = await response.json();

            const bookList = document.getElementById('book-list');
            const chapterList = document.getElementById('chapter-list');
            const verseList = document.getElementById('verse-list');

            // Popular a lista de livros
            for (const bookName in bibleData) {
                const listItem = document.createElement('li');
                const bookLink = document.createElement('a');
                bookLink.href = '#';
                bookLink.textContent = bookName;
                bookLink.addEventListener('click', () => loadChapters(bookName));
                listItem.appendChild(bookLink);
                bookList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Erro ao carregar a Bíblia:', error);
        }
    }

    // Função para carregar capítulos (adicionar aqui)
    function loadChapters(bookName) {
        // ... (implementação para carregar capítulos)
    }

    // Chamar a função para carregar a Bíblia quando a página carregar
    loadBible(); 
});

</script>
