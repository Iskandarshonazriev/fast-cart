import i18n from "i18next";

import { initReactI18next } from "react-i18next";

const resources = {

  en: {
    translation: {
      home: "Home",
      about: "About",
      contact: "Contact",
      signup: "Sign Up",
       search: "Search",
    phones: "Phones",
    laptops: "Laptops",
    watch: "Smart Watch",
    headphones: "Headphones",
    cameras: "Cameras",
    Today: "Today",
    Flash: "Flash",
    Sales: "Sales",
    technopark: "TechnoPark",
    welcome: "Welcome 👋",
    dontLeave: "Don’t leave without shopping",
    loadingProducts: "Loading Products...",
    },
  },

  ru: {
    translation: {
      home: "Главная",
      about: "О нас",
      contact: "Контакты",
      signup: "Регистрация",
       search: "Поиск",
    phones: "Телефоны",
    laptops: "Ноутбуки",
    watch: "Смарт часы",
    headphones: "Наушники",
    cameras: "Камеры",
    Сегодняшние: "Сегодняшние",
    Срочные: "Срочные",
    Распродажи: "Распродажи",
    technopark: "TechnoPark",
    welcome: "Добро пожаловать 👋",
    dontLeave: "Не уходите без покупок",
    loadingProducts: "Загрузка товаров...",
    },
  },

};

i18n
  .use(initReactI18next)
  .init({

    resources,

    lng: "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

  });

export default i18n;