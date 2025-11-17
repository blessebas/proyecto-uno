# HTML Style Guide

Guía de estilos para escribir HTML claro, consistente y fácil de mantener. Incluye convención de nombres, estructura recomendada y **orden estándar de atributos**.

---

## 1. Convención de nombres

### 1.1. Clases

Las clases seguirán la misma convención definida en la guía CSS:

* **BEM** para estructura
* **kebab-case** como formato

Ejemplos:

```html
<div class="card card--primary">
  <h2 class="card__title">Título</h2>
</div>
```

---

## 2. Convenciones generales

### ✔️ Indentación

Usar **2 espacios** por nivel de anidación.

### ✔️ Atributos en minúsculas y uso responsable de id

```html
<input type="text" disabled />
```

- Usar `id` solo cuando aporte (asociación `label[for]`, accesibilidad, anclas). Evitarlo por defecto.

### ✔️ Etiquetas siempre cerradas

```html
<!-- Correcto -->
<img src="photo.jpg" alt="Profile" />

<!-- Incorrecto -->
<img src="photo.jpg">
```

---

## 3. Orden de atributos HTML

El orden de atributos será consistente para mejorar la lectura del markup.

### **Orden recomendado:**

1. **Identificación** → `id`, `class`
2. **Configuración del componente** → `type`, `role`, atributos propios de la etiqueta
3. **Datos y valores** → `name`, `value` (puedes ubicar aquí `data-*` si aplica)
4. **Accesibilidad** → `aria-*`, `alt`, `title`
5. **Estado** → `disabled`, `readonly`, `required`, etc.
6. **Comportamiento (sin JS todavía)** → `href`, `src`, `for`
7. **Eventos de JavaScript** → `onclick`, `onchange`, `oninput`, etc. *(evitar inline cuando sea posible)*
8. **Styling** → `style` *(evitar cuando sea posible)*

---

### Ejemplo aplicado:

```html
<button
  id="main-action"
  class="button button--primary"
  type="button"
  name="submitBtn"
  aria-label="Guardar cambios"
  disabled
  data-track="save"
>
  Guardar
</button>
```

---

## 4. Reglas específicas

### ✔️ Usar atributos semánticos

```html
<button type="submit">Enviar</button>
```

### ✔️ Preferir elementos semánticos a `<div>` innecesarios

```html
<header>
  <nav></nav>
</header>
```

### ✔️ Accesibilidad mínima

- Siempre usar `alt` en imágenes.
- Añadir `loading="lazy"` y definir `width`/`height` para evitar CLS cuando aplique.
- En enlaces con `target="_blank"`, incluir `rel="noopener noreferrer"`.
- Mantener jerarquía de encabezados (`h1`→`h2`→`h3`), idealmente una `h1` por vista.
- Declarar `lang` (y `dir` si aplica) en `<html>`.
- Usar `<button>` para acciones y `<a>` para navegación.

```html
<img src="user.png" alt="Foto de usuario" loading="lazy" width="128" height="128" />

<a href="/ayuda" target="_blank" rel="noopener noreferrer">Ayuda</a>
```

---

## 5. Comentarios

Los comentarios en HTML se usarán **solo cuando se requiera**, para marcar secciones importantes o estructuras complejas.

```html
<!-- Header principal -->
<header class="header">
  ...
</header>
```

---

## 6. Ejemplo completo

```html
<!-- Tarjeta de usuario -->
<article class="user-card user-card--premium">
  <img
    class="user-card__avatar"
    src="avatar.jpg"
    alt="Foto del usuario"
  />

  <h2 class="user-card__name">Juan Pérez</h2>

  <button
    class="user-card__button button button--primary"
    type="button"
    aria-label="Enviar mensaje"
    data-track="message"
  >
    Enviar mensaje
  </button>
</article>
```

---
