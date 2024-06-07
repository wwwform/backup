<script>
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const versiculoTextarea = document.getElementById('versiculo');

    async function carregarVersiculos() {
        try {
            const response = await fetch('versiculos.json');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar versículos:', error);
            return [];
        }
    }

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('showing');
    });

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            document.querySelectorAll('.content').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            menu.classList.remove('showing');
        });
    });

    document.getElementById('gerar-versiculo').addEventListener('click', async () => {
        const versiculos = await carregarVersiculos();
        if (versiculos.length > 0) {
            const randomIndex = Math.floor(Math.random() * versiculos.length);
            versiculoTextarea.value = versiculos[randomIndex];
        } else {
            versiculoTextarea.value = "Erro ao carregar versículos.";
        }
    });

    document.getElementById('enviar-whatsapp').addEventListener('click', () => {
        const versiculo = versiculoTextarea.value;
        const url = `https://wa.me/?text=${encodeURIComponent(versiculo)}`;
        window.open(url, '_blank');
    });

    async function loadBible() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json');
            const bibleData = await response.json();

            const bookList = document.getElementById('book-list');
            const chapterList = document.getElementById('chapter-list');
            const verseList = document.getElementById('verse-list');

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

    function loadChapters(bookName) {
        // Implemente a lógica para carregar os capítulos aqui
    }

    loadBible();
});
</script>
