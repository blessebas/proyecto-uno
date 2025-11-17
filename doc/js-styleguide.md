# JavaScript Style Guide

Guía de estilos para escribir JavaScript limpio, consistente y fácil de mantener, basada en principios de **Clean Code**, intención clara, semántica y buenas prácticas modernas.

---

## 1. Convención de nombres

### 1.1. Variables

Las variables deben describir claramente **qué representan**.

**Reglas:**

* Usar **camelCase**.
* Ser **descriptivas**, nunca abreviadas sin necesidad.
* Evitar nombres genéricos como `data`, `item`, `value`.
* Usar sustantivos para variables.

**Ejemplos correctos:**

```js
const userAge = 38;
const isUserLoggedIn = true;
const selectedProductIds = [];
const apiResponseTimeMs = 120;
```

**Incorrecto:**

```js
const x = 38;
const flag = true;
const arr = [];
```

---

### 1.2. Métodos / Funciones

Los nombres de funciones deben **predecir acciones**. Deben ser verbales y expresar intención.

**Reglas:**

* Usar **camelCase**.
* Comenzar con un **verbo**.
* Nombrar según la intención, no la implementación.
* Una función = una acción.

### Convención para handlers de eventos

Usar `handle` **únicamente** cuando la función responda a un **evento de usuario** (click, input, keydown, focus, submit, etc.).

**Formato recomendado:**

```
handle + Intención + Evento
```

Ejemplos:

```js
handleSubmitClick();
handleRegisterClick();
handleOpenModalClick();
handleEmailChangeInput();
handleEscapeKeydown();
```

### Convención para funciones que interactúan con APIs

Para peticiones a APIs u operaciones de negocio **no se usa `handle`**.

Usar verbos que describan la acción:

* `get` → obtener datos
* `create` → crear un recurso
* `update` → actualizar
* `delete` → eliminar
* `fetch` → traer datos externos

Ejemplos:

```js
getUsers();
createUser(data);
updateUserProfile(userId, payload);
deleteSession();
fetchOrders();
```

---

### 1.3. Clases

Usar **PascalCase**.

```js
class UserProfileManager {}
class ShoppingCart {}
```

---

### 1.4. Constantes

Usar **SCREAMING_SNAKE_CASE**.

```js
const API_BASE_URL = "https://api.example.com";
const MAX_ATTEMPTS = 3;
```

---

## 2. Estructura y formato

### 2.1. Indentación

* 2 espacios.

### 2.2. Punto y coma

* Siempre usar punto y coma `;`.

### 2.3. Líneas cortas

* Mantener las líneas por debajo de 100–120 caracteres.

### 2.4. Imports y exports

* Preferir exports nombrados; evitar `export default`.
* Ordenar imports: node/builtin → terceros → internos; en cada grupo, alfabético.
* Usar rutas absolutas con alias cuando estén definidos (ver `jsconfig.json`).

---

## 3. Funciones

### 3.1. Funciones pequeñas

Una función debe hacer **solo una cosa**.

```js
// ❌ Incorrecto: hace muchas cosas
function processUser(user) {
  validateUser(user);
  updateUser(user);
  sendEmail(user);
}

// ✔️ Correcto: funciones enfocadas
function validateUser(user) {}
function updateUser(user) {}
function notifyUserByEmail(user) {}
```

### 3.2. Funciones puras

* Evitar efectos secundarios cuando sea posible.

### 3.3. Parámetros

* Máximo **3 parámetros**.
* Si hay más, usar un **objeto**.

```js
function createUser({ name, age, email }) {}
```

---

## 4. Objetos y Arrays

### 4.1. Objetos con nombres claros

```js
const user = {
  id: 1,
  fullName: "Juan Pérez",
  age: 30,
  isAdmin: false,
};
```

### 4.2. Arrays representando colecciones

Usar sustantivo plural:

```js
const products = [];
const activeUsers = [];
```

---

## 5. Control de flujo

### 5.1. Evitar anidamiento profundo

```js
// ❌ Incorrecto
if (user) {
  if (user.isActive) {
    if (!user.isBanned) {
      // ...
    }
  }
}

// ✔️ Correcto
if (!user) return;
if (!user.isActive) return;
if (user.isBanned) return;
```

### 5.2. Usar early return

Hace el código más limpio.

### 5.3. Igualdad y valores falsy

* Usar `===`/`!==` siempre.
* Usar `??` para defaults y `?.` para acceso seguro.
* Definir explícitamente `null` vs `undefined` en APIs internas.

---

## 6. Comentarios (JSDoc)

Los comentarios deben usarse **solo cuando aporten intención o contexto**, y el formato estándar será **JSDoc**.

### ✔️ Formato JSDoc recomendado

```js
/**
 * Calcula el total final del carrito, incluyendo impuestos y descuentos.
 * @param {Array} items - Lista de productos del carrito.
 * @returns {number} Total calculado.
 */
function calculateFinalPrice(items) {
  // ...
}
```

### ✔️ JSDoc para funciones que manejan eventos

```js
/**
 * Maneja el clic para enviar el formulario de registro.
 * @param {MouseEvent} event
 */
function handleRegisterSubmitClick(event) {
  // ...
}
```

### ✔️ JSDoc para funciones de API

```js
/**
 * Obtiene la lista de usuarios desde el servidor.
 * @returns {Promise<Array>} Lista de usuarios.
 */
async function getUsers() {
  // ...
}
```

### ❌ No usar comentarios obvios

```js
// Incrementa i en 1
i = i + 1;
```

---

## 7. Promesas y Async

### 7.1. Usar async/await

```js
async function loadUserProfile(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 7.2. Manejo de errores

```js
async function fetchData() {
  try {
    const res = await fetch("/api");
    return await res.json();
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
```

### 7.3. Errores de dominio

* Lanzar instancias de error con contexto (`name`, `code`, `cause`).
* No lanzar strings.

---

## 8. Buenas prácticas generales

✔️ Preferir const antes que let
✔️ Evitar var
✔️ Evitar mutaciones innecesarias
✔️ Nombres descriptivos ante todo
✔️ Que el código se lea como una historia clara
✔️ No comentar código muerto, eliminarlo

✔️ Evitar `console.log` en producción; permitir solo `console.warn/error`
✔️ Usar template strings en lugar de concatenación
✔️ Limitar complejidad ciclomática y profundidad de anidamiento

### 8.1. Inmutabilidad

* No reasignar parámetros de funciones.
* Preferir copias (`{...obj}`, `[...arr]`, `map/filter/reduce`).

### 8.2. Seguridad (Express/EJS)

* Usar middlewares de seguridad (helmet, rate limiting) en prod.
* No loguear secretos ni datos sensibles.
* Mantener la lógica de vistas simple y escapar por defecto.

### 8.3. Fechas e i18n

* Trabajar en UTC por defecto.
* Usar `Intl`/`date-fns` y evitar manipular fechas crudas.

### 8.4. Testing

* Estructura AAA (Arrange, Act, Assert).
* Convención de nombres `*.test.js` y mocks aislados.
* Cobertura mínima acordada por el equipo.

### 8.5. Tipado gradual

* Mejorar JSDoc con `@typedef`/`@template` para contratos más claros.
* Activar `checkJs` en `jsconfig.json` si se desea validación adicional sin migrar a TS.

---

## 9. Ejemplo completo

```js
// Carga y renderiza información del usuario
async function initializeUserPanel() {
  const user = await loadUser();
  if (!user) return;

  renderUserInfo(user);
}

async function loadUser() {
  try {
    const response = await fetch("/api/user");
    return response.json();
  } catch (error) {
    console.error("Failed to load user", error);
    return null;
  }
}

function renderUserInfo(user) {
  const userNameElement = document.getElementById("user-name");
  userNameElement.textContent = user.fullName;
}
```

---
