import './style.scss'

console.log('Gym Vibes');

const init = () => {
  // const isMobileVariant = isMobile();
  addFAQEvents();
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

// const isMobile = () => {
//   return window.innerWidth <= 944;
// }

init();
