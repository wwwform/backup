<script>
        const versiculos = [
            "João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
            "Romanos 8:28 - E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
                        "Eis que estou convosco todos os dias, até à consumação dos séculos. - Mateus 28:20",
    // Sinta-se à vontade para adicionar mais versículos conforme necessário
];

        document.addEventListener('DOMContentLoaded', () => {
  // Função para mostrar/ocultar o menu
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('showing');
  });

  // Função para mostrar a seção clicada no menu
  const menuLinks = document.querySelectorAll('.menu-link');

  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      // Ocultar todas as seções
      document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
      });

      // Mostrar a seção clicada
      targetSection.classList.add('active');
    });
  });

  // Função para gerar versículo (código omitido, pois você já o forneceu)
        document.getElementById('gerar-versiculo').addEventListener('click', function () {
            fetch('versiculos.json')
                .then(response => response.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.versiculos.length);
                    const versiculo = data.versiculos[randomIndex];
                    document.getElementById('versiculo').value = versiculo.texto;
                });
        });
        document.getElementById('enviar-whatsapp').addEventListener('click', function () {
            const versiculo = document.getElementById('versiculo').value;
            const url = `https://wa.me/?text=${encodeURIComponent(versiculo)}`;
            window.open(url, '_blank');
        });
        document.addEventListener('DOMContentLoaded', function () {
            loadBible();
        });
        function loadBible() {
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
        }
    </script>
