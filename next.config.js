const path = require('path');
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts', '.css', '.scss'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "@styles/global.scss";`,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['ru'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'ru',
  },
});
