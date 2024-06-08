export function initMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('showing');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-target');
      document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(targetId).classList.add('active');
      menu.classList.remove('showing');
    });
  });
}
