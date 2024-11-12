# Sanctum Lab

**Sanctum Lab** is a versatile homelab software suite for efficient home content management, featuring a centralized menu, guest and admin access, and support for multi-language content.

## Table of Contents

1. **[🔍 Overview](#sanctum-lab)**
2. **[✨ Key Features](#key-features)**
3. **[🛠️ Primary Tools Used](#primary-tools-used)**
4. **[📦 Getting Started](#getting-started)**
5. **[📚 Documentation](#documentation)**
6. **[📜 License](#license)**

## Key Features

| **Feature**                | **Description**                         | **Status**         |
| -------------------------- | --------------------------------------- | ------------------ |
| **Menu**                   | Manage and display bar menu content.    | ✅ Implemented     |
| **Event Management**       | Check-in and manage home events.        | ❌ Not Implemented |
| **Dashboard**              | Admin statistics and insights.          | ❌ Not Implemented |
| **Social Login**           | Easy registration via social accounts.  | ❌ Not Implemented |
| **Guest Access**           | Secure features for guest interactions. | ✅ Implemented     |
| **Admin Access**           | Admin login functionality.              | ✅ Implemented     |
| **Internationalization**   | Multi-language content support.         | ✅ Implemented     |
| **Modular Design**         | Extendable for future features.         | ✅ Implemented     |
| **Infrastructure as Code** | Manage cloud deployment via code.       | ✅ Implemented     |

## Primary Tools Used

| **Frontend**                           | **Backend**                                  | **DevOps**                                            | **Shared Tools**                                                      |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| [Angular](https://angular.io/)         | [Express.js](https://expressjs.com/) (Local) | [AWS CDK](https://aws.amazon.com/cdk/)                | [Nx](https://nx.dev/)                                                 |
| [RxJs](https://rxjs.dev/)              | [AWS Lambda](https://aws.amazon.com/lambda/) | [GitHub Actions](https://github.com/features/actions) | [Zod](https://zod.dev/)                                               |
| [NgRx](https://ngrx.io/)               | [DynamoDB](https://aws.amazon.com/dynamodb/) | [Docker](https://www.docker.com/)                     | [Prettier](https://prettier.io/)                                      |
| [I18Next](https://www.i18next.com/)    |                                              |                                                       | [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) |
| [Storybook](https://storybook.js.org/) |                                              |                                                       |                                                                       |

## Getting Started

1. **Install Prerequisites**:

-   Ensure **Node.js v20+** is installed.
-   Install **Nx** globally: `npm add --global nx@latest`
-   Install **Docker**: [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) | [Linux](https://docs.docker.com/desktop/setup/install/linux/)
-   Install **AWS CDK** globally: `npm install -g aws-cdk`
-   Install **AWS CLI**: [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

2. **Set Up the Project**:

-   Clone the repository: `git clone <repo-url>`
-   Navigate to the root folder and run: `npm install`

3. **Run Local DynamoDB**:

-   Navigate to the `docker` folder: `cd docker`
-   Start the container: `docker-compose up -d`

4. **Deploy Infrastructure**:

-   Navigate to the `infrastructure` folder: `cd infrastructure`
-   Run: `npm install`
-   Configure AWS CLI: `aws configure`
-   Deploy to AWS: `cdk deploy -c appName=<your_app_name> -c tenantEnv=dev -c production=false`

5. **Set Up Cognito Users**:

-   Create guest and admin users in the AWS dashboard.
-   Set passwords:
    ```sh
    aws cognito-idp admin-set-user-password --user-pool-id <user_pool_id> --username <your_user> --password <new_password> --permanent
    ```

6. **Configure Environment Variables**:

-   Create a `.env` file in the root directory with:
    ```dotenv
    DYNAMODB_TABLE_ID=<any_table_id_for_local_development>
    DYNAMODB_CLIENT_ENDPOINT=http://localhost:8000
    DYNAMODB_CLIENT_REGION=eu-central-1
    DYNAMODB_LOCAL_ENV=true
    COGNITO_USER_POOL_ID=<your_created_cognito_user_pool_id>
    COGNITO_CLIENT_ID=<your_created_cognito_user_pool_client_id>
    COGNITO_GUEST_USERNAME=<your_created_cognito_user_pool_guest_username>
    ```
-   In `apps/sanctumlab-ui/src/environments`, create `environment.development.ts` and configure similar to `environment.ts`.

7. **Run Scripts and Services**:

-   Setup local DynamoDB: `npm run scripts:db-setup`
-   Generate guest access code: `npm run scripts:access-code`
-   Open Storybook: `npm run storybook:clib`
-   Start local API server: `npm run serve:api-dev`
-   Start UI server: `npm run serve:ui`
-   Build all applications: `npm run build`

## Documentation

-   [Architecture Overview](docs/architecture.md)
-   [Pipelines](docs/pipelines.md)
-   [Project Concepts](docs/concepts.md)

## License

Licensed under MIT, this project is intended for personal hobby use and as a learning resource.
