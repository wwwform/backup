import { initializeMenu } from './menu.js';
import { initializeVersiculo } from './versiculo.js';
import { initializeBiblia } from './biblia.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    initializeVersiculo();
    initializeBiblia();
    setupNavigation();
    // Adiciona um listener para o botão de carregar livros
document.getElementById('load-books-button').addEventListener('click', () => {
        document.getElementById('book-container').style.display = 'block';
        // Supondo que a função loadBooks está definida em biblia.js e carregará os livros no container
        loadBooks();
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('showing');
    });
});

function setupNavigation() {
    const sections = document.querySelectorAll('main .content');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.id.replace('-link', '');
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });
}
