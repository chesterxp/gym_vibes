import './style.scss'

console.log('Gym Vibes');

const init = () => {
  const isMobileVariant = isMobile();
  const menu: HTMLElement | null = document.querySelector('.nav__list');

  addFAQEvents();
  currentYear();
  addPriceEvent(isMobileVariant);
  
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

const currentYear = () => {
  document.querySelectorAll('.currentYear').forEach(el => el.textContent = new Date().getFullYear().toString());
}

const addPriceEvent = (isMobileVariant: boolean) => {
  const btns = document.querySelectorAll<HTMLElement>('.price__btn');
  const priceList = document.querySelector<HTMLElement>('.price__list');
  const tabs = document.querySelectorAll<HTMLElement>('.price__tab');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const number = btn.getAttribute('data-number');
      removeActiveClassFromButtons(btns);
      btn.classList.toggle('price__btn--active');

      if(!isMobileVariant){
        priceList?.style.setProperty('transform', `translateX(-${1280 * Number(number)}px)`);

      } else{
        removeActiveClasFromTabs(tabs);
        const tab = document.querySelector(`.price__tab${number}`);
        tab?.classList.add('price__tab--active');
      }

    });
    
  });
}

const removeActiveClasFromTabs = (tabs: NodeListOf<HTMLElement>) => {
  tabs.forEach(tab => tab.classList.remove('price__tab--active'));
}

const removeActiveClassFromButtons = (btns: NodeListOf<HTMLElement>) => {
  btns.forEach(btn => btn.classList.remove('price__btn--active'));
 
}

init();

