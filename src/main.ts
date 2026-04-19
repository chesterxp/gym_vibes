import './style.scss'

console.log('Gym Vibes');

const init = () => {
  // const isMobileVariant = isMobile();
  addFAQEvents();
  addEventForMenuButton();
}

const addFAQEvents = () => {
  const items = document.querySelectorAll('.fag_item');
  items.forEach(item => {
      const btn = item.querySelector('.faq_btn');
      const text = item.querySelector('.faq_text');
      if(btn && text) {
          btn.addEventListener('click', () => {
              text.classList.toggle('hidden');
          });
      }
  });
}

const addEventForMenuButton = () => {
  const btn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.nav__list');

  btn?.addEventListener('click', () => {
      menu?.classList.toggle('nav__list--show');
  });

}

// const isMobile = () => {
//   return window.innerWidth <= 944;
// }

init();
