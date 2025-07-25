import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";


// i18n konfiguratsiyasi
i18n
  .use(HttpApi) // JSON fayllardan tarjimalarni yuklash
  .use(LanguageDetector) // Brauzerdan tilni avtomatik aniqlash
  .use(initReactI18next) // React bilan integratsiya
  .init({
    fallbackLng: "uz", // Agar topilmasa uz tilidan foydalaniladi
    supportedLngs: ["uz", "en", "ru"],
    debug: false, // true qilsangiz brauzerda ko‘rsatadi
    interpolation: {
      escapeValue: false, // XSSdan himoya (Reactda kerak emas)
    },
    backend: {
      // Tarjima fayllari manzili
      loadPath: "/locales/{{lng}}/index.json",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
