
# Marvel Comics Application

## Descripción
Esta es una aplicación web que permite a los usuarios registrarse, iniciar sesión, ver una lista de cómics de Marvel, ver detalles de cada cómic y gestionar una lista personalizada de cómics favoritos. El proyecto utiliza Angular para el front-end, NestJS para el back-end y MongoDB para la base de datos. La aplicación se basa en la API de Marvel para obtener información sobre los cómics.

## Características
- Registro de usuarios (nombre, identificación y correo electrónico).
- Iniciar sesión para acceder a la aplicación.
- Ver el listado de cómics con su respectiva imagen.
- Ver el detalle de cada cómic, mostrando la imagen y la información correspondiente.
- Crear una lista personalizada con los cómics favoritos.
- Persistencia de la información de los usuarios y sus preferencias.

## Requisitos Previos
- Node.js (versión 20.11.0)
- NestJS CLI (10.8.2)
- MongoDB (versión 4 o superior)

## Instalación

### Clonar el Repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/marvel-comics-app.git
cd marvel-comics-app
\`\`\`

### Configuración del Back-end (NestJS)
\`\`\`bash
cd marvel-backend
npm install
\`\`\`

#### Configurar Variables de Entorno
Crear un archivo `.env` en el directorio `marvel-backend` con el siguiente contenido:
\`\`\`
PORT=3000
MONGODB_URI=mongodb://localhost:27017/marvel-db
JWT_SECRET=tu_secreto_jwt
MARVEL_API_KEY=tu_marvel_api_key
MARVEL_PRIVATE_KEY=tu_marvel_private_key
\`\`\`

#### Ejecutar el Back-end
\`\`\`bash
npm run start:dev
\`\`\`

### Estructura del Proyecto del Back-end
\`\`\`
marvel-backend/
│
├── src/
│   ├── application/services
│   │   ├── auth.service.ts
│   │   ├── comic.service.ts
│   │   ├── user.service.ts
│   ├── domain/
│   │   ├── models/
│   │   │   ├── user.model.ts
│   ├── repositories/
│   │   │   ├── user.repository.ts
│   ├── infrastructure/
│   │   ├── config/
│   │   │   ├── configuration.ts
│   │   ├── marvel-api/
│   │   │   ├── marvel-api.module.ts
│   │   │   ├── marvel-api.service.ts
│   │   ├── middleware/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── jwt-strategy.ts
│   ├── interfaces/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── comic.controller.ts
│   │   │   ├── user.controller.ts
│   │   ├── dto/
│   │   │   ├── add-favorite.dto.ts
│   │   │   ├── create-user.dto.ts
│   │   │   ├── login-user.dto.ts
│   │   │   ├── remove-favorite.dto.ts
│   ├── routes/
│   ├── app.module.ts
│   ├── main.ts
├── .env
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
\`\`\`

## Arquitectura del Back-end
El back-end está desarrollado utilizando **Domain-Driven Design (DDD)** para asegurar una separación clara de las preocupaciones y una estructura escalable y mantenible. A continuación, se describen algunos de los principios y prácticas aplicadas:

### Domain-Driven Design (DDD)
- **Modelado del Dominio:** Los modelos de dominio representan entidades del mundo real como usuarios y cómics.
- **Repositorios:** Se encargan de la persistencia de las entidades de dominio, siguiendo el patrón de repositorio.
- **Servicios de Aplicación:** Contienen la lógica de negocio y coordinan las operaciones entre las entidades y los repositorios.

### Principios SOLID
- **Single Responsibility Principle (SRP):** Cada clase tiene una única responsabilidad. Por ejemplo, los controladores solo manejan las solicitudes HTTP.
- **Open/Closed Principle (OCP):** Las clases están abiertas para extensión pero cerradas para modificación. Utilizamos interfaces para definir contratos que pueden ser implementados por múltiples clases.
- **Liskov Substitution Principle (LSP):** Las clases derivadas deben ser sustituibles por sus clases base. Implementamos interfaces que pueden ser usadas de manera intercambiable.
- **Interface Segregation Principle (ISP):** Dividimos las interfaces grandes en interfaces más pequeñas y específicas.
- **Dependency Inversion Principle (DIP):** Dependemos de abstracciones en lugar de concreciones. Utilizamos inyección de dependencias para gestionar las instancias de clases.

### Buenas Prácticas
- **Inyección de Dependencias:** Utilizamos el sistema de inyección de dependencias de NestJS para gestionar las dependencias entre clases y servicios.
- **Modularización:** El código está organizado en módulos para una mejor mantenibilidad y escalabilidad.