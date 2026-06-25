import './tailwind.css'
import './style.scss'

console.log('Gym Vibes');

const init = () => {
  const isMobileVariant = isMobile();
  const menu: HTMLElement | null = document.querySelector('.nav__list');

  initCookieBanner();
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

const initCookieBanner = () => {
  const banner = document.querySelector<HTMLElement>('#cookie-banner');
  const acceptBtn = document.querySelector<HTMLButtonElement>('#cookie-accept');
  const rejectBtn = document.querySelector<HTMLButtonElement>('#cookie-reject');

  if (!banner || !acceptBtn || !rejectBtn) return;

  const consent = getCookie('gymvibes_cookie_consent');
  if (consent === 'accepted' || consent === 'rejected') {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');

  acceptBtn.addEventListener('click', () => {
    setCookie('gymvibes_cookie_consent', 'accepted', 365);
    banner.classList.add('hidden');
  });

  rejectBtn.addEventListener('click', () => {
    setCookie('gymvibes_cookie_consent', 'rejected', 365);
    banner.classList.add('hidden');
  });
};

const setCookie = (name: string, value: string, days: number) => {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }

  return null;
};

init();

