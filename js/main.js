import { initializeMenu } from './menu.js';
import { initializeVersiculo } from './versiculo.js';
import { initializeBiblia, loadBooks } from './biblia.js';
import { initializeAniversariantes } from './aniversariantes.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os módulos existentes
    initializeMenu();
    initializeVersiculo();
    initializeBiblia();
    initializeAniversariantes(); // Inicializa a funcionalidade dos aniversariantes

    // Configura a navegação entre as seções
    setupNavigation();

    // Configura o botão de carregar livros
    const loadBooksButton = document.getElementById('load-books-button');
    if (loadBooksButton) {
        loadBooksButton.addEventListener('click', () => {
            const bookContainer = document.getElementById('book-container');
            if (bookContainer) {
                bookContainer.style.display = 'block';
                loadBooks(); // Função do módulo de Bíblia
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

    // Força a atualização dos recursos (CSS e JS)
    atualizarRecursos();
});

function setupNavigation() {
    const sections = document.querySelectorAll('main .content'); // Todas as seções do site
    const navLinks = document.querySelectorAll('nav ul li a'); // Links do menu

    if (sections && navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Impede o comportamento padrão do link
                const targetId = link.id.replace('-link', ''); // Obtém o ID do destino

                sections.forEach(section => {
                    section.style.display = section.id === targetId ? 'block' : 'none'; // Mostra apenas a seção correspondente
                });

                navLinks.forEach(link => {
                    link.classList.remove('active'); // Remove a classe ativa de todos os links
                });

                link.classList.add('active'); // Adiciona a classe ativa ao link clicado
            });
        });
    }
}

// Função para adicionar versão dinâmica nos recursos
function atualizarRecursos() {
    const version = new Date().getTime(); // Gera um identificador único baseado na hora atual

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
