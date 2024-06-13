export function initializeMenu() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contents = document.querySelectorAll('.content');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            // Ativar link clicado
            menuLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            // Mostrar conteúdo correspondente
            const targetId = link.getAttribute('data-target');
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });

            // Fechar menu se estiver no modo mobile
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
});
}
