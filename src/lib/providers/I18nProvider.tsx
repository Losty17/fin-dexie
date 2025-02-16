"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { PropsWithChildren } from "react";

const i18nSettings = {
  resources: {
    en: {
      translation: {
        "sign-in": "Sign In",
      },
    },
    "pt-BR": {
      translation: {
        "sign-in": "Entrar",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(initReactI18next).init(i18nSettings);

const I18nProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default I18nProvider;
