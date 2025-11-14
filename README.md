# Smiling Cups - Documentación Frontend

Este documento describe la arquitectura del proyecto frontend de Smiling Cups, migrado a un enfoque Domain-Driven Design (DDD). El objetivo es aislar la lógica de negocio, desacoplar los servicios de la interfaz de usuario y facilitar la futura integración con un backend real.

## 1. Puesta en Marcha

Para ejecutar el proyecto en desarrollo:

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd SmilingCups-Fronted

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El servidor se ejecuta en `http://localhost:5173`.

## 2. Ejecución del Fake API (json-server)

Para simular un backend, se usa `json-server`. Ejecuta en una terminal separada:

```bash
json-server --watch server/CoffeCupsFakeAPI.json --port 3000
```

Esto inicia el servidor en `http://localhost:3000`. El frontend apunta a esta URL desde `src/shared/infrastructure/BaseApi.js`.

## 3. Arquitectura DDD (Bounded Contexts)

El proyecto se organiza por dominios de negocio (Bounded Contexts):

- `src/iam`: Autenticación y gestión de usuarios
- `src/product`: Catálogo y productos (cafés)
- `src/payment`: Carrito, pedidos, suscripciones
- `src/profiles`: Estadísticas, favoritos
- `src/shared`: Código común (layouts, BaseApi, etc.)

### Estructura interna de cada módulo

Cada BC se divide en:

- `domain/`: Lógica de negocio pura (ej. `User.js`, `Coffee.js`).
- `infrastructure/`: Comunicación externa. Clases de API y assemblers.
- `application/`: Orquestación de la lógica. Stores de Pinia, etc.
- `components/`: Presentación. Vistas (`views/`) y componentes UI (`ui/`).

## 4. APIs y Conexión con Backend

### Módulo Compartido (`shared`)
- **Archivo**: `src/shared/infrastructure/BaseApi.js`
- **Acción**: Cambiar `baseURL` para apuntar al backend real (ej. `https://api.smilingcups.com/v1`).

### Módulo IAM (`iam`)
- **API**: `src/iam/infrastructure/IamApi.js`
- **Métodos**: `loginUser()`, `createUser()`, `getUserById()`
- **Lógica**: `src/iam/application/auth.js`

### Módulo Product (`product`)
- **API**: `src/product/infrastructure/ProductApi.js`
- **Métodos**: `getCoffees()`, `getCoffeeById()`, `getMysteryBoxes()`
- **Lógica**: `src/product/application/product.store.js`

### Módulo Payment (`payment`)
- **API**: `src/payment/infrastructure/PaymentApi.js`
- **Métodos**: `getOrders()`, `placeSubscriptionOrder()`
- **Lógica**: `src/payment/application/payment.store.js`

### Módulo Profiles (`profiles`)
- **API**: `src/profiles/infrastructure/ProfilesApi.js`
- **Métodos**: `getFavorites()`, `getProducerStats()`
- **Lógica**: (por crear) `src/profiles/application/profiles.store.js`

## 5. Integración con Backend Real

Pasos para conectar con el backend real:

1. **Actualizar BaseApi**: Modificar `baseURL` en `BaseApi.js`.
2. **Modificar métodos de API**: Actualizar lógica en cada archivo `...Api.js` según los endpoints reales.

Ejemplo:

```js
// Antes (Fake API)
this.http.get('users', { params: { email, password } })

// Después (Backend real)
this.http.post('/auth/login', { email, password })
```

3. **Implementar Assemblers**: Crear clases `...Assembler.js` en `infrastructure/` para transformar respuestas JSON en clases de dominio.
4. **Crear Clases de Dominio**: Implementar clases como `User.js`, `Coffee.js` en `domain/` con métodos de negocio (ej. `getFullName()`, `getPriceWithDiscount()`).
