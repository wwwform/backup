import { initVersiculo } from './versiculo.js';

document.addEventListener('DOMContentLoaded', () => {
  initVersiculo();
  initMenu();
  initBiblia();
  showSection('home'); // Exibe a seção "Home" inicialmente
  document.getElementById('home-link').classList.add('active'); // Marca o link "Home" como ativo
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('.content');
  sections.forEach(section => {
    section.style.display = 'none'; 
  });

  document.getElementById(sectionId).style.display = 'block'; 

  const menuLinks = document.querySelectorAll('nav a');
  menuLinks.forEach(link => {
    link.classList.remove('active');
  });

  document.getElementById(sectionId + '-link').classList.add('active'); 
}

function initMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); 
  });

  const menuLinks = document.querySelectorAll('nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
    });
  });
}

function initBiblia() {
  fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/xml/nvi.min.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');
      const books = xmlDoc.getElementsByTagName('b');
      const bookList = document.getElementById('book-list');
      const chapterList = document.getElementById('chapter-list');
      const verseList = document.getElementById('verse-list');

      // Carregar livros
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookName = book.getAttribute('name');
        const bookItem = document.createElement('li');
        const bookLink = document.createElement('a');
        bookLink.href = '#';
        bookLink.textContent = bookName;
        bookLink.addEventListener('click', () => loadChapters(book, chapterList, verseList));
        bookItem.appendChild(bookLink);
        bookList.appendChild(bookItem);
      }
    })
    .catch(error => {
      console.error('Erro ao carregar a Bíblia:', error);
      verseList.innerHTML = '<p>Erro ao carregar a Bíblia. Por favor, tente novamente mais tarde.</p>';
    });
}

function loadChapters(book, chapterList, verseList) {
  chapterList.innerHTML = '';
  verseList.innerHTML = '';

  const chapters = book.getElementsByTagName('c');
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const chapterNumber = chapter.getAttribute('n');
    const chapterItem = document.createElement('li');
    const chapterLink = document.createElement('a');
    chapterLink.href = '#';
    chapterLink.textContent = `Capítulo ${chapterNumber}`;
    chapterLink.addEventListener('click', () => loadVerses(chapter, verseList));
    chapterItem.appendChild(chapterLink);
    chapterList.appendChild(chapterItem);
  }
}

function loadVerses(chapter, verseList) {
  verseList.innerHTML = '';

  const verses = chapter.getElementsByTagName('v');
  for (let i = 0; i < verses.length; i++) {
    const verse = verses[i];
    const verseNumber = verse.getAttribute('n');
    const verseText = verse.textContent;
    const verseItem = document.createElement('p');
    verseItem.textContent = `${verseNumber}: ${verseText}`;
    verseList.appendChild(verseItem);
  }
}
