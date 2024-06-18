// Define a função fetchBiblia fora da função initializeBiblia para que ela possa ser reutilizada
async function fetchBiblia() {
    const response = await fetch('biblia.json');
    const biblia = await response.json();
    return biblia;
}

export function initializeBiblia() {
    const bookList = document.getElementById('book-list');
    const chapterList = document.getElementById('chapter-list');
    const verseList = document.getElementById('verse-list');
    const bibliaSection = document.getElementById('biblia');
    const backButton = document.createElement('button');
    backButton.textContent = 'Voltar';
    backButton.style.display = 'none'; // Inicialmente oculto
    bibliaSection.appendChild(backButton);

    function showBooks(books) {
        bookList.innerHTML = '';
        chapterList.innerHTML = ''; // Limpa os capítulos ao mostrar os livros
        verseList.innerHTML = ''; // Limpa os versículos ao mostrar os livros
        backButton.style.display = 'none'; // Esconder botão de volta ao mostrar os livros
        books.forEach((book, bookIndex) => {
            const li = document.createElement('li');
            li.textContent = book.abbrev;
            li.addEventListener('click', () => showChapters(bookIndex));
            bookList.appendChild(li);
        });
        bookList.style.display = 'block'; // Mostrar lista de livros
        chapterList.style.display = 'none'; // Ocultar capítulos
        verseList.style.display = 'none'; // Ocultar versículos
    }

    function showChapters(bookIndex) {
        fetchBiblia().then(biblia => {
            const book = biblia[bookIndex];
            chapterList.innerHTML = '';
            verseList.innerHTML = ''; // Limpa os versículos ao mostrar os capítulos
            book.chapters.forEach((chapter, chapterIndex) => {
                const li = document.createElement('li');
                li.textContent = `Capítulo ${chapterIndex + 1}`;
                li.addEventListener('click', () => showVerses(bookIndex, chapterIndex));
                chapterList.appendChild(li);
            });
            bookList.style.display = 'none'; // Esconder lista de livros
            chapterList.style.display = 'block'; // Mostrar lista de capítulos
            verseList.style.display = 'none'; // Ocultar versículos
            backButton.style.display = 'block'; // Mostrar botão de volta
            backButton.onclick = () => {
                showBooks(biblia);
                backButton.style.display = 'none';
            };
        });
    }

    function showVerses(bookIndex, chapterIndex) {
        fetchBiblia().then(biblia => {
            const verses = biblia[bookIndex].chapters[chapterIndex];
            verseList.innerHTML = '';
            verses.forEach((verse, verseIndex) => {
                const li = document.createElement('li');
                li.textContent = `${verseIndex + 1}. ${verse}`;
                verseList.appendChild(li);
            });
            bookList.style.display = 'none'; // Esconder lista de livros
            chapterList.style.display = 'none'; // Esconder lista de capítulos
            verseList.style.display = 'block'; // Mostrar lista de versículos
            backButton.style.display = 'block'; // Mostrar botão de volta
            backButton.onclick = () => {
                showChapters(bookIndex);
                backButton.onclick = () => {
                    fetchBiblia().then(biblia => {
                        showBooks(biblia);
                        backButton.style.display = 'none';
                    });
                };
            };
        });
    }

    fetchBiblia().then(biblia => {
        bibliaSection.addEventListener('click', () => {
            showBooks(biblia);
        });
    });
}

// Adicione a função loadBooks para ser usada no main.js
export function loadBooks() {
    fetchBiblia().then(biblia => {
        const bookList = document.getElementById('book-list');
        const chapterList = document.getElementById('chapter-list');
        const verseList = document.getElementById('verse-list');

        function showBooks(books) {
            bookList.innerHTML = '';
            chapterList.innerHTML = ''; // Limpa os capítulos ao mostrar os livros
            verseList.innerHTML = ''; // Limpa os versículos ao mostrar os livros
            books.forEach((book, bookIndex) => {
                const li = document.createElement('li');
                li.textContent = book.abbrev;
                li.addEventListener('click', () => showChapters(bookIndex));
                bookList.appendChild(li);
            });
            bookList.style.display = 'block'; // Mostrar lista de livros
            chapterList.style.display = 'none'; // Ocultar capítulos
            verseList.style.display = 'none'; // Ocultar versículos
        }

        function showChapters(bookIndex) {
            const book = biblia[bookIndex];
            chapterList.innerHTML = '';
            verseList.innerHTML = ''; // Limpa os versículos ao mostrar os capítulos
            book.chapters.forEach((chapter, chapterIndex) => {
                const li = document.createElement('li');
                li.textContent = `Capítulo ${chapterIndex + 1}`;
                li.addEventListener('click', () => showVerses(bookIndex, chapterIndex));
                chapterList.appendChild(li);
            });
            bookList.style.display = 'none'; // Esconder lista de livros
            chapterList.style.display = 'block'; // Mostrar lista de capítulos
            verseList.style.display = 'none'; // Ocultar versículos
        }

        function showVerses(bookIndex, chapterIndex) {
            const verses = biblia[bookIndex].chapters[chapterIndex];
            verseList.innerHTML = '';
            verses.forEach((verse, verseIndex) => {
                const li = document.createElement('li');
                li.textContent = `${verseIndex + 1}. ${verse}`;
                verseList.appendChild(li);
            });
            bookList.style.display = 'none'; // Esconder lista de livros
            chapterList.style.display = 'none'; // Esconder lista de capítulos
            verseList.style.display = 'block'; // Mostrar lista de versículos
        }

        showBooks(biblia);
    });
}
