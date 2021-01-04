import * as Locales from "date-fns/locale";

declare global {
  interface Navigator {
    userLanguage: string;
  }
}

const ext_locale_code = navigator.userLanguage || navigator.language;
const int_locale_code = ext_locale_code.replace("-", "");

export const user_locale = Locales[int_locale_code] || (Locales.enGB as Locale);

console.log(
  `Locales: ${navigator.userLanguage || navigator.language}, ${Object.keys(
    Locales
  )}, resulting locale: ${user_locale.code}`
);
