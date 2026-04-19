import './style.scss'

console.log('Gym Vibes');

const init = () => {
  const isMobileVariant = isMobile();
  const menu: HTMLElement | null = document.querySelector('.nav__list');

  addFAQEvents();
  if(menu && isMobileVariant) {
    addEventForMenuButton(menu);
    addEventForMenuLinks(menu);
  }
}

const addFAQEvents = () => {
  const items = document.querySelectorAll('.fag_item');
  items.forEach(item => {
      const text = item.querySelector('.faq_text');
      if(item && text) {
          item.addEventListener('click', () => {
              text.classList.toggle('hidden');
          });
      }
  });
}

const addEventForMenuButton = (menu: HTMLElement) => {
  const btn = document.querySelector('.menu__btn');
  btn?.addEventListener('click', () => {
      menu?.classList.toggle('nav__list--show');
  });

}

const addEventForMenuLinks = (menu: HTMLElement) => {
  const links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
      link.addEventListener('click', () => {
          menu?.classList.remove('nav__list--show');
      });
  });

}

const isMobile = () => {
  return window.innerWidth <= 944;
}

init();
