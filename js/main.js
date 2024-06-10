import { initMenu } from './menu.js';
import { initVersiculo } from './versiculo.js'; // Certifique-se de que o caminho está correto

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event triggered');
  initMenu();
  console.log('initMenu called');
  initVersiculo();
  console.log('initVersiculo called');
  initBiblia();
  console.log('initBiblia called');
  showSection('home'); 
  document.getElementById('home-link').classList.add('active'); 
  console.log('Home section shown and home link activated');
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('.content');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  console.log(`Section ${sectionId} will be shown`);

  document.getElementById(sectionId).style.display = 'block';

  const menuLinks = document.querySelectorAll('nav a');
  menuLinks.forEach(link => {
    link.classList.remove('active');
  });

  document.getElementById(sectionId + '-link').classList.add('active'); 
  console.log(`${sectionId} link activated`);
}

async function initBiblia() {
  try {
    console.log('Fetching nvi.xml');
    const response = await fetch('biblia.xml'); // Carrega o XML localmente
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
    const books = xmlDoc.getElementsByTagName('b');
    const bookList = document.getElementById('book-list');
    const chapterList = document.getElementById('chapter-list');
    const verseList = document.getElementById('verse-list');

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
    console.log('Bible books loaded successfully');
  } catch (error) {
    console.error('Erro ao carregar a Bíblia:', error);
    const verseList = document.getElementById('verse-list');
    verseList.innerHTML = '<p>Erro ao carregar a Bíblia. Por favor, tente novamente mais tarde.</p>';
  }
}

function loadChapters(book, chapterList, verseList) {
  console.log(`Loading chapters for book ${book.getAttribute('name')}`);
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
  console.log('Chapters loaded successfully');
}

function loadVerses(chapter, verseList) {
  console.log(`Loading verses for chapter ${chapter.getAttribute('n')}`);
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
  console.log('Verses loaded successfully');
}
