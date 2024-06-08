document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const versiculoTextarea = document.getElementById('versiculo');

    async function carregarVersiculos() {
        try {
            const response = await fetch('versiculos.json');
            if (!response.ok) { // Verificar se a resposta do fetch foi bem-sucedida
                throw new Error('Erro ao carregar versículos: ' + response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar versículos:', error);
            versiculoTextarea.value = "Erro ao carregar versículos."; // Exibir erro na textarea
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
            versiculoTextarea.value = versiculos[randomIndex].versiculo;
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

    fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/xml/nvi.min.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const books = xmlDoc.getElementsByTagName('book');
            const bookList = document.getElementById('book-list');
            for (let i = 0; i < books.length; i++) {
                const book = books[i];
                const listItem = document.createElement('li');
                const bookLink = document.createElement('a');
                bookLink.href = '#';
                bookLink.textContent = book.getAttribute('name');
                bookLink.setAttribute('data-book-id', i);
                listItem.appendChild(bookLink);
                bookList.appendChild(listItem);
                bookLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    const bookId = this.getAttribute('data-book-id');
                    const chapters = book.getElementsByTagName('c');
                    const chapterList = document.getElementById('chapter-list');
                    chapterList.innerHTML = '';
                    for (let j = 0; j < chapters.length; j++) {
                        const chapter = chapters[j];
                        const chapterLink = document.createElement('a');
                        chapterLink.href = '#';
                        chapterLink.textContent = `Capítulo ${chapter.getAttribute('n')}`;
                        chapterLink.setAttribute('data-book-id', bookId);
                        chapterLink.setAttribute('data-chapter-id', j);
                        chapterList.appendChild(chapterLink);
                        chapterLink.addEventListener('click', function (e) {
                            e.preventDefault();
                            const bookId = this.getAttribute('data-book-id');
                            const chapterId = this.getAttribute('data-chapter-id');
                            const verses = chapter.getElementsByTagName('v');
                            const verseList = document.getElementById('verse-list');
                            verseList.innerHTML = '';
                            for (let k = 0; k < verses.length; k++) {
                                const verse = verses[k];
                                const verseItem = document.createElement('p');
                                verseItem.textContent = `${verse.getAttribute('n')}: ${verse.textContent}`;
                                verseList.appendChild(verseItem);
                            }
                        });
                    }
                });
            }
        });
});
