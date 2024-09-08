# Disruptive Media API

Este repositorio contiene una colección de endpoints para interactuar con una API que gestiona usuarios, categorías, temas y publicaciones.

## Endpoints

### 1. **Create User**

- **URL**: `localhost:3001/user`
- **Método**: `POST`
- **Descripción**: Crea un nuevo usuario en la plataforma.
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "sudo Dave",
    "email": "domirandar@unal.edu.co"
  }
  ```
  
### 2. **Login**

- **URL**: `localhost:3001/login`
- **Método**: `POST`
- **Descripción**: Autentica a un usuario con las credenciales proporcionadas.
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "sudo Dave",
    "email": "domirandar@unal.edu.co"
  }
  ```

### 3. **GET Users**

- **URL**: `localhost:3001/users`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todos los usuarios registrados. Requiere autenticación Bearer Token.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

### 4. **Create Category**

- **URL**: `localhost:3001/category`
- **Método**: `POST`
- **Descripción**: Crea una nueva categoría.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "image",
    "coverImage": "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba"
  }
  ```

### 5. **GET Categories**

- **URL**: `localhost:3001/categories`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las categorías. Requiere autenticación Bearer Token.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

### 6. **Create Topic**

- **URL**: `localhost:3001/topic`
- **Método**: `POST`
- **Descripción**: Crea un nuevo tema, asociado a una o más categorías.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "art gallery",
    "categoriesAllowed": ["image"]
  }
  ```

### 7. **GET Topics**

- **URL**: `localhost:3001/topics`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todos los temas. Requiere autenticación Bearer Token.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

### 8. **Create Post**

- **URL**: `localhost:3001/posts`
- **Método**: `POST`
- **Descripción**: Crea una nueva publicación asociada a un tema y categoría.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Como conseguir mayores visitas al portafolio",
    "topicId": "66db93e937633697118f80e6",
    "categoryId": "66db938537633697118f80de",
    "url": "Crea un portafolio en NextJs, aprende React, come, duerme, repite."
  }
  ```

### 9. **GET Posts**

- **URL**: `localhost:3001/posts`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las publicaciones. Requiere autenticación Bearer Token.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

### 10. **GET Avatar**

- **URL**: `https://avatar.iran.liara.run/public`
- **Método**: `GET`
- **Descripción**: Endpoint público para obtener información del avatar.
- **Headers**:
  - `User-Agent: insomnia/9.3.3`

## Requisitos

- Para interactuar con la API, es necesario un token JWT en algunos de los endpoints. Asegúrate de enviar el token de autenticación en el encabezado `Authorization` con el formato `Bearer <token>`.
  
## Instalación

1. Clona este repositorio.
2. Instala las dependencias necesarias con:
   ```bash
   npm install
   ```
3. Corre el servidor de desarrollo:
```sh
npx nx serve disruptive-media
 nx run disruptive-media-web:dev
```

## Autores

- David Miranda - [domirandar@unal.edu.co](mailto:domirandar@unal.edu.co)

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/MSgxnah83t)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve disruptive-media
 nx run disruptive-media-web:dev
```

To create a production bundle:

```sh
npx nx build disruptive-media
```

To see all available targets to run for a project, run:

```sh
npx nx show project disruptive-media
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
