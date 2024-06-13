export function initializeBiblia() {
    const bookList = document.getElementById('book-list');
    const chapterList = document.getElementById('chapter-list');
    const verseList = document.getElementById('verse-list');
    const bibliaSection = document.getElementById('biblia');

    async function fetchBiblia() {
        const response = await fetch('acf.json');
        const biblia = await response.json();
        return biblia;
    }

    function showBooks(books) {
        bookList.innerHTML = '';
        chapterList.innerHTML = ''; // Clear chapters when showing books
        verseList.innerHTML = ''; // Clear verses when showing books
        books.forEach((book, bookIndex) => {
            const li = document.createElement('li');
            li.textContent = book.abbrev;
            li.addEventListener('click', () => showChapters(bookIndex));
            bookList.appendChild(li);
        });
    }

    function showChapters(bookIndex) {
        fetchBiblia().then(biblia => {
            const book = biblia[bookIndex];
            chapterList.innerHTML = '';
            verseList.innerHTML = ''; // Clear verses when showing chapters
            book.chapters.forEach((chapter, chapterIndex) => {
                const li = document.createElement('li');
                li.textContent = `Capítulo ${chapterIndex + 1}`;
                li.addEventListener('click', () => showVerses(bookIndex, chapterIndex));
                chapterList.appendChild(li);
            });
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
        });
    }

    fetchBiblia().then(biblia => {
        bibliaSection.addEventListener('click', () => {
            showBooks(biblia);
        });
    });
}
