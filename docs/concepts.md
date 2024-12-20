# Project Concepts

## Pages, Container, and Presentational Components

We follow the [Smart and Dumb Components Philosophy](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) to maintain a clear separation of concerns in our Angular application.

Pages are unique and act as entry points for route endpoints. Presentational components (or "dumb components") handle only rendering logic, while containers manage more complex tasks, such as API interactions and data mapping.

While this approach isn't a perfect solution for all scenarios, it effectively addresses separation of concerns in most cases.

## Nx Libraries

We utilize Nx libraries to organize and separate concerns within our application. The primary directories include:

- [Backend Folder](../libs/backend): Contains backend logic, including data access, authentication, and feature libraries.
- [Frontend Folder](../libs/frontend): Contains UI logic, such as the component library, data access, and feature libraries.
- [Shared Folder](../libs/shared): Houses shared API interfaces used by both the frontend and backend.

Most libraries are tagged with `scope` tags to enforce separation rules, which are managed through `eslint`.

Types of libraries:

- [Angular Library](https://nx.dev/nx-api/angular/generators/library).
- [JS/TS Library](https://nx.dev/nx-api/js/generators/library) which use [Vite](https://vite.dev/) as bundler.

The project adheres to the **Nx** recommended approach for dependency separation, as outlined [here](https://nx.dev/concepts/decisions/project-dependency-rules). Libraries are organized into:

- **Feature Libraries**
- **UI Libraries** (Component Library)
- **Data-Access Libraries**
- **Utility Libraries** (Shared)

## Internationalization

We use the [I18Next](https://www.i18next.com/) library along with an [Angular wrapper](https://www.npmjs.com/package/angular-i18next) for internationalization. Each relevant UI library includes a `locales` folder containing `.json` files with translation keys and labels for each supported language.
These assets are reference in the `project.json` under the main UI app and collected at build time.

Translations are typically rendered using the `| i18NextEager` pipe. The only exception is input field errors, where we subscribe to form control status changes and generate translations programmatically based on the error key.

## Storybook and Atomic Design

Our UI leverages [Tailwind](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/docs/install/), integrated through a custom [component library](../libs/frontend/component-library). The library is structured according to the principles of [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) to organize and group components effectively.

## Prettier and Git Hooks

The project uses **Prettier** for code formatting. Make sure your IDE is set up to format code according to the [Prettier configuration](../.prettierrc). We also have **Git hooks** enabled, which format staged files automatically before committing. Additionally, the main pipeline checks that the entire codebase is correctly formatted.

## DynamoDB OneTable Design

We use the [Single Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/) approach for the database layer, powered by the [DynamoDB One Table](https://doc.onetable.io/start/quick-tour/) library.
