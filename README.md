# AOS Web React Project

![aosWebApp](https://github.com/user-attachments/assets/77af2542-4541-4cb1-b436-2f331f437940)
PLZ FORK THIS AND MAKE IT YOUR OWN. =]

## Overview
AOS Web app was created to make it easy to onboard into the AO ecosystem and have some handy features for example saving your AO processess to keep track of everything you got going on, or auto-complete of commonly used commands.
Our intention was to create something fun to use and inspire others in terms of UX/UI of what's possible on the permaweb.

## Project Structure
Here are some important directories to pay attention to in this project:

```
/src
├── components
│   ├── data_component
│   │   └── ProcessList.tsx
│   ├── layouts
│   │   └── MainLayout.tsx
│   ├── terminals
│   │   └── Terminals
│   ├── modals
│   │   └── [Modals Components]
│   └── views
│       └── Dashboard
│           └── index.tsx
```

## Components

### Data Components
- **Path:** `/src/components/data_component`
- **Description:** This directory contains components that handle data. Notably, it includes `ProcessList.tsx`, which is responsible for displaying the list of processes.

### Layout Components
- **Path:** `/src/components/layouts/MainLayout.tsx`
- **Description:** This file contains the overall layout of the application.

### Terminal Components
- **Path:** `/src/components/Terminals`
- **Description:** This directory contains components related to terminal functionality.

### Modals
- **Path:** `/src/components/modals`
- **Description:** This directory contains modal components, such as those used for creating new processes.

### Views
- **Path:** `/src/components/views/Dashboard/index.tsx`
- **Description:** The main page of the application, which provides the primary user interface, is located in this file.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
