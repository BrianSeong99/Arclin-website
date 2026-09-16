import type { Preview } from "@storybook/nextjs-vite";
import { LocaleProvider } from "../lib/i18n/context";
import type { Locale } from "../lib/i18n";
import "../app/globals.css";

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Site language",
      toolbar: { title: "Locale", icon: "globe", items: [{ value: "ja", title: "日本語" }, { value: "zh", title: "中文" }], dynamicTitle: true },
    },
  },
  initialGlobals: { locale: "ja" },
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    a11y: { test: "todo" },
  },
  decorators: [
    (Story, { globals }) => {
      const locale = (globals.locale as Locale) ?? "ja";
      document.documentElement.lang = locale;
      return (
        <LocaleProvider locale={locale}>
          <Story />
        </LocaleProvider>
      );
    },
  ],
};

export default preview;
