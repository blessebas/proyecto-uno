# CSS Style Guide

Guía de estilos para escribir CSS limpio, consistente y mantenible.

---

## 1. Convención de Nombres

### 1.1. BEM (Block–Element–Modifier)

Usar BEM para todas las clases CSS.

**Formato general:**

```
.block
.block__element
.block--modifier
.block__element--modifier
```

**Ejemplo:**

```css
.card {
}
.card__title {
}
.card__button {
}
.card__button--primary {
}
```

---

### 1.2. Variables (CSS)

- Definir tokens con CSS Custom Properties (kebab-case):

```css
:root {
  --color-primary: #1a73e8;
  --spacing-lg: 2rem;
  --font-family-base: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
```

---

## 2. Orden de Propiedades CSS

El orden recomendado sigue estos grupos:

1. **Positioning**  
   `position`, `z-index`, `top/right/bottom/left`

2. **Display & Box Model**  
   `display`, `overflow`, `box-sizing`, `width/height`, `padding`, `margin`, `border`

3. **Color**  
   `background`, `color`

4. **Text**  
   `font-*`, `line-height`, `text-*`

5. **Other**  
   `cursor`, `pointer-events`, `transition`, etc.

### Ejemplo aplicado

```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff;

  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```

---

## 3. Segmentación con Comentarios

Los comentarios se utilizarán **solo cuando se requiera**, para separar bloques lógicos o mejorar la legibilidad.

```css
/* ==========================
   Component: Card
   ========================== */
.card {
  position: relative;
  padding: 1rem;
  border-radius: 8px;
}

/* --- Element: Title --- */
.card__title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

/* --- Modifier: Highlighted --- */
.card--highlighted {
  background-color: #f9f5d7;
}
```

---

## 4. Buenas Prácticas

### ✔️ Mantener clases pequeñas y semánticas

```css
.user-profile__avatar {
}
.user-profile__name {
}
```

### ✔️ Evitar el sobre-anidado

❌ Malo:

```css
.card {
  /* No anidar selectores; usar clases BEM planas */
  color: red;
}
```

✔️ Bueno:

```css
.card {
}
.card__header {
}
.card__title {
}
```

### ✔️ Preferir clases BEM antes que selectores de etiqueta

```css
/* Mejor */
.button {
}

/* Evitar */
button {
}
```

---

## 5. Ejemplo Completo

```css
/* ==========================
   Component: Card
   ========================== */

.card {
  /* Positioning */
  position: relative;

  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e2e2;
  border-radius: 10px;

  /* Color */
  background-color: #ffffff;

  /* Text */
  font-family: var(--font-family-base);

  /* Other */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* --- Element: Title --- */
.card__title {
  /* Display & Box Model */
  margin-bottom: 0.75rem;

  /* Text */
  font-size: 1.25rem;
  font-weight: 600;
}

/* --- Modifier: Primary --- */
.card--primary {
  /* Display & Box Model */
  border-color: #1a73e8;

  /* Color */
  background-color: #eaf2ff;
}
```

---
