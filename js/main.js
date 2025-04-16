import { initializeMenu } from './menu.js';
import { initializeVersiculo } from './versiculo.js';
import { initializeBiblia, loadBooks } from './biblia.js';
import { initializeAniversariantes } from './aniversariantes.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os módulos existentes
    initializeMenu();
    initializeVersiculo();
    initializeBiblia();
    initializeAniversariantes();

    // Configura a navegação entre as seções
    setupNavigation();

    // Configura o botão de carregar livros
    const loadBooksButton = document.getElementById('load-books-button');
    if (loadBooksButton) {
        loadBooksButton.addEventListener('click', () => {
            const bookContainer = document.getElementById('book-container');
            if (bookContainer) {
                bookContainer.style.display = 'block';
                loadBooks();
            }
        });
    }

    // Configura o menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('showing');
        });
    }

    // Evita recarregamento infinito e força atualização apenas uma vez
    verificarRecarregamento();

    // Atualiza os recursos para evitar cache
    atualizarRecursos();
});

function setupNavigation() {
    const sections = document.querySelectorAll('main .content');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (sections && navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.id.replace('-link', '');

                sections.forEach(section => {
                    section.style.display = section.id === targetId ? 'block' : 'none';
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                link.classList.add('active');
            });
        });
    }
}

// Função para verificar e evitar recarregamento infinito
function verificarRecarregamento() {
    const version = new Date().getTime();
    const url = window.location.href;

    if (!url.includes(`?v=`)) {
        console.log("Adicionando parâmetro para atualização...");
        location.href = `${url}?v=${version}`; // Adiciona o parâmetro dinâmico e recarrega a página uma única vez
    } else {
        console.log("Já atualizado, não recarregar novamente.");
    }
}

// Função para adicionar versão dinâmica nos recursos
function atualizarRecursos() {
    const version = new Date().getTime();

    // Atualiza o CSS
    const cssLink = document.querySelector("link[href*='style.css']");
    if (cssLink) {
        cssLink.href = `css/style.css?v=${version}`;
    }

    // Atualiza o JS
    const jsScript = document.querySelector("script[src*='main.js']");
    if (jsScript) {
        jsScript.src = `js/main.js?v=${version}`;
    }

    console.log("Recursos atualizados com versão:", version);
}
