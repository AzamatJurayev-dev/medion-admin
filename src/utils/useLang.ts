import { useTranslation } from "react-i18next";

const useLang = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  return { lang, t };
};

export default useLang;
