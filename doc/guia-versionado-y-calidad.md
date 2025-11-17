# Guía de Versionado y Calidad de Código

Esta guía describe el flujo de trabajo de Trunk-Based Development, el esquema de versionado SemVer, y las comprobaciones de calidad (linters, formateo y validación de commits) configuradas en este repositorio.

## Trunk-Based Development

- Branch principal: `main`.
- Trabajo en branches cortos y de vida breve, enfocados a cambios pequeños.
- Integración frecuente: merge rápido a `main` (idealmente varias veces al día).
- Evitar ramas largas; preferir feature flags o toggles para cambios incrementales.
- Cada push a `main` dispara el proceso de release automático.

## Convenciones de Commit (Conventional Commits)

- Formato: `tipo(alcance opcional): descripción breve`
- Tipos comunes:
  - `feat`: nueva funcionalidad (MINOR)
  - `fix`: corrección de bug (PATCH)
  - `docs`, `style`, `refactor`, `perf`, `test`, `chore`: no cambian versión por sí solos
  - `BREAKING CHANGE`: en el cuerpo del commit (MAJOR)
- Ejemplos:
  - `feat(auth): agregar login con JWT`
  - `fix(api): corregir validación de email`
  - `chore(ci): ajustar workflow de release`

## Versionado SemVer

- `MAJOR`: cambios incompatibles (señalados con `BREAKING CHANGE`).
- `MINOR`: nuevas funcionalidades compatibles (`feat`).
- `PATCH`: correcciones (`fix`).
- La versión se calcula automáticamente por `semantic-release` según el historial de commits.

## Release Automático y Changelog

- CI: GitHub Actions corre `semantic-release` en cada push a `main`.
- Genera: nueva versión, tag, release en GitHub y `CHANGELOG.md`.
- Actualiza `package.json` y crea un commit de release: `chore(release): x.y.z`.
- Publicación a npm: deshabilitada por ahora (`npmPublish: false`).

## Calidad de Código: Linters y Formateo

- Pre-commit (Husky + lint-staged):
  - Ejecuta `eslint --fix` en `*.{js,jsx,ts,tsx}`.
  - Ejecuta `prettier --write` en `*.{js,jsx,ts,tsx,css,scss,md,json,yml,yaml}`.
- Commit-msg (Husky + Commitlint): valida Conventional Commits.
- ESLint flat config (`eslint.config.cjs`):
  - Base `@eslint/js` + plugins `n` y `promise`.
  - Ignora `node_modules/`, `dist/`, `build/`, `coverage/`, `CHANGELOG.md`.
  - Compatibilidad con Prettier mediante `eslint-config-prettier`.
- Prettier (`.prettierrc.json`): formateo consistente (espacios, ancho de línea, comillas, etc.).
- EditorConfig (`.editorconfig`): normaliza indentación, codificación y saltos de línea en el editor.

## Comandos útiles

- Formateo:
  - `npm run format` — Aplica Prettier en todo el proyecto.
- Lint:
  - `npm run lint` — Analiza el código con ESLint.
  - `npm run lint:fix` — Intenta corregir automáticamente problemas con ESLint.
- Release local (simulación):
  - `npm run release -- --no-ci` — Ejecuta `semantic-release` sin entorno CI.

## Flujo de trabajo recomendado

1. Crea una rama corta desde `main` para tu cambio.
2. Realiza cambios pequeños y mantén el estado compilable.
3. Haz commit con formato Conventional Commits, puedes usar commitzend para ayudarte.
4. Al crear el commit, se ejecuta:
   - Pre-commit: `eslint --fix` y `prettier --write` sobre archivos staged.
   - Commit-msg: validación de mensaje con `commitlint`.
5. Abre PR hacia `main` y mergea pronto.
6. Al hacer push a `main`, el workflow ejecuta `semantic-release`:
   - Calcula el bump SemVer.
   - Actualiza `CHANGELOG.md` y `package.json`.
   - Crea tag y release en GitHub.

## Buenas prácticas

- Preferir `feat` y `fix` para cambios que afecten versión.
- Incluir `BREAKING CHANGE:` en el cuerpo cuando haya cambios incompatibles.
- Mantener PRs cortos y de fácil revisión.
- Evitar lint errors locales antes de subir: `npm run lint`.
- Ejecutar `npm run format` para mantener estilo consistente.

---

Si más adelante se requiere publicar en npm, añade el secreto `NPM_TOKEN` en GitHub y habilita la publicación removiendo `npmPublish: false` en `.releaserc.json`.

## Nombres de ramas por tipo de feature

Usaremos ramas cortas que reflejen el tipo de cambio, alineadas con Conventional Commits. Formato recomendado: `tipo/[id-history]-alcance-resumen-en-kebab-case` y opcionalmente el id del issue.

- Reglas de nombrado:
  - Kebab-case en minúsculas (`auth-login`, `user-profile-edit`).
  - Prefijos según tipo: `feat/`, `fix/`, `perf/`, `refactor/`, `docs/`, `chore/`, `ci/`, `test/`, `hotfix/`.
  - Alcance breve (módulo/área) y resumen conciso.
  - Si está asociada a una historia/ticket, incluir el ID después del tipo para trazabilidad clara: `feat/ABC-123-auth-login`.
  - Alternativa: referencia de issue al final (`-#123`).

- Ejemplos por tipo:
  - `feat/auth-login`
  - `feat/auth-2fa-#123`
  - `feat/ABC-123-auth-login`
  - `fix/api-email-validation`
  - `perf/images-lazy-loading`
  - `refactor/user-service-split`
  - `docs/add-contributing-guide`
  - `chore/update-dev-dependencies`
  - `ci/semantic-release-workflow`
  - `test/auth-unit-tests`
  - `hotfix/timezone-parsing-production`

- Flujo sugerido:
  - Crear rama: `git checkout -b feat/auth-login` o, si hay ticket, `git checkout -b feat/ABC-123-auth-login`
  - Commits con convención: `feat(auth): agregar login`
  - Push y PR a `main`; merge pronto.
  - Al merge en `main`, se ejecuta release automático.
