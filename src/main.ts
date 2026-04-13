import './style.css'

console.log('Gym Vibes');


const init = () => {
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

init();

// Strona jest prerenderowana jako statyczny HTML w index.html.
// Ten plik uruchamia pipeline Vite dla CSS (HMR w dev + bundling w build).
