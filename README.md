# 🏆 KampioensGok

KampioenPool is a web application that allows users to predict match results in a sports tournament. Each user submits score predictions per
match, and the app tracks and analyzes these predictions. It features live result entry, player-specific prediction tracking, and
statistical overviews of the most predicted outcomes per match.

## Tech Stack

This project is built with [Vue 3](https://vuejs.org/) and [TypeScript](https://www.typescriptlang.org/), using [Vite](https://vitejs.dev/) for fast development and optimized builds. It uses [Pinia](https://pinia.vuejs.org/) for state management, [Vue Router](https://router.vuejs.org/) for client-side routing, and [Vue I18n](https://vue-i18n.intlify.dev/) for internationalization.

UI components are styled with [Bootstrap 5](https://getbootstrap.com/), [Bootstrap Icons](https://icons.getbootstrap.com/), and [Font Awesome](https://fontawesome.com/). The app includes [ECharts](https://echarts.apache.org/) for interactive data visualizations.

Development tools include:

- [ESLint](https://eslint.org/) with Vue and TypeScript support
- [Prettier](https://prettier.io/) for consistent code formatting
- [`vue-tsc`](https://github.com/vuejs/language-tools) for type checking

## Data

All tournament and player data is stored in the `public/data` folder. This static data is loaded by the frontend at runtime.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
