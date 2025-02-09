# Commands

## Generate a backend feature library

```sh
nx g @nx/js:lib libs/backend/features/<lib-name>-feature --bundler=vite --unitTestRunner=jest --minimal=true --tags=scope:project-backend,scope:feature
```

## Generate a frontend feature library

```sh
nx g @nx/angular:library libs/frontend/features/<lib-name>-feature --changeDetection=OnPush --style=scss --skipTests=true --selector=ngx-<lib-name> --tags=scope:project-frontend,scope:feature
```
