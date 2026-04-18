import './style.scss'

console.log('Gym Vibes');

const init = () => {
  const isMobileVariant = isMobile();
  addFAQEvents();
  addOpinionsWidth(isMobileVariant);
  addReadMoreEvents();
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

const addOpinionsWidth = (isMobileVariant: boolean) => {
  const items: NodeListOf<HTMLElement> = document.querySelectorAll('.opinions__item');
  const length = items.length;
  const opinionList: HTMLElement | null = document.querySelector('.opinions__list');
  const itemWidth = isMobileVariant ? 350 : 450;

  if(opinionList) {
      opinionList.style.width = `${length * itemWidth}px`;
  }

  items.forEach(item => {
    item.style.width = `${itemWidth}px`;
  })
}

const addReadMoreEvents = () => {
  const buttons = document.querySelectorAll('.opinions__readMore');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const text = button.previousElementSibling;
      if (text) {
        text.classList.toggle('hidden');
      }
    });
  });
}

const isMobile = () => {
  return window.innerWidth <= 944;
}


init();

// Strona jest prerenderowana jako statyczny HTML w index.html.
// Ten plik uruchamia pipeline Vite dla CSS (HMR w dev + bundling w build).
