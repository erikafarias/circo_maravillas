
      const menuBtn = document.getElementById('menu-btn');
      const menu = document.getElementById('menu');

      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });


      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
    if (item.href === window.location.href) {
        item.classList.add('active-nav-item');
    }
});