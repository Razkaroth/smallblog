# SmallBlog

Este proyecto es una implementación de un motor de blog.

## Tecnologías

- [Nx](https://nx.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Angular](https://angular.dev)
- [tRPC](https://trpc.io)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

## Características

SmallBlog es la implementación minima viable de la próxima versión de infraestructura de blog de [POPLab](https://poplab.mx).

La elección de tecnologías busca simplicidad y facilidad de uso, con niveles de abstracción mínimos.

En lugar de crear utilidades y sevicios que abstraen la implementación del sistema, se busca exponer la implementación directamente, para que sea fácil de entender y modificar.

Los siguientes son las principales características de SmallBlog:

- Microservicios:
  - SmallBlog: Frontend de la aplicación.
  - SmallEditor: Backend de la aplicación.
  - API: Backend de la aplicación.
  - Meilisearch: Motor de búsqueda.
  - MongoDB: Base de datos.

### SmallBlog y SmallEditor como aplicaciones independientes

Existen como aplicaciones separadas siguiendo los principios de separación de responsabilidades.

Esto permite tener un CMS universal entre todas las implementaciones de SmallBlog y permitiendo desarrollos independientes de aplicaciones de lectura del blog.

### API basada en tRPC

Contrario a APIs REST tradicionales, SmallBlog utiliza tRPC, un protocolo de comunicación basado en RPC (Remote Procedure Call).

Esto permite:

- Una definición centralizada de tipos e interfaces.
- Una mayor capacidad de hacer uso del LSP (Language Server Protocol) para autocompletado y validación de tipos.
- Un (pseudo) SDK para el cliente que permite interactuar con la API de manera más sencilla.
- "Esquivar" la necesidad de usar algunas de las convenciones de Angular que no son comunes en otros frameworks.
- "Esquivar" la necesidad de usar RXJS para manejar peticiones HTTP.

## Desarrollo

### Requisitos

- Node.js 21
- Bun (recomendado)

### Instalación

```bash
npm install

# O

bun install
```

### Ejecución

Se deben ejecutar tanto la SmallBlog o SmallEditor como la API.

#### Webapp

```bash
npm run smallblog
# O
bun smallblog
```

#### Editor

```bash
npm run smalleditor
# O
bun smalleditor
```

#### API

```bash
npm run api
# O
bun api
```
