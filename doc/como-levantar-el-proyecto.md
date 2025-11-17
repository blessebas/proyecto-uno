# Cómo levantar el proyecto

Este proyecto es una app Node.js (Express + EJS) con base de datos MySQL. Puedes levantarlo con Docker (recomendado) o sin Docker.

## Requisitos
- Docker y Docker Compose instalados
- Opcional sin Docker: Node.js 20.x y MySQL 8.x

## Variables de entorno
Crea/ajusta el archivo `.env` en la raíz. Valores de ejemplo utilizados por Docker Compose:

```
NODE_ENV=development

APP_URL=http://localhost:3004
APP_PORT=3004

DB_HOST=db          # Dentro de Docker, la app se conecta al servicio "db"
DB_USER=appuser
DB_PASSWORD=apppass
DB_NAME=appdb
DB_PORT=3307        # Puerto publicado hacia tu máquina (host)
DB_ROOT_PASSWORD=rootpass

LIVERELOAD_PORT=35729
```

- La app lee `APP_PORT` en `server.js` para escuchar en el puerto indicado (`server.js:37-40`).
- La conexión a MySQL usa las variables `DB_*` (`config/db.js:3-7`).

## Levantar con Docker (desarrollo)
- Arrancar (con hot-reload y volumen del código):
  - `docker compose up -d --build`
- Acceder a la app: `http://localhost:${APP_PORT}` (por defecto `http://localhost:3004`)
- Conectarte a MySQL desde tu máquina (Workbench/CLI):
  - Host: `127.0.0.1`
  - Port: `${DB_PORT}` (ej. `3307`)
  - User: `appuser`
  - Password: `apppass`
  - Schema: `appdb`
- Ver logs:
  - App: `docker compose logs -f app`
  - DB: `docker compose logs -f db`
- Apagar:
  - `docker compose down`
- Apagar y borrar datos (ojo: destruye la base del contenedor):
  - `docker compose down -v`

Notas dev:
- El servicio `app` monta el código con `.:/app` y usa `node --watch` para recargar.
- Para ver cambios en vistas EJS en tiempo real se desactivó la caché en `server.js` (`server.js:24-28`).

## Levantar con Docker (producción)
Hay un archivo de ejemplo `docker-compose.production.yml` pensado para despliegues sin volúmenes y sin watch.

- Ajusta `.env` con los valores reales de tu entorno.
- Construye o usa una imagen publicada (recomendado usar la imagen del CI):
  - Si usas imagen del CI: establece `image: seysww/proyecto-uno:<version>` en `app`.
- Levanta:
  - `docker compose -f docker-compose.production.yml up -d`

Recomendaciones prod:
- No publiques el puerto de MySQL hacia Internet salvo que sea estrictamente necesario.
- Mantén `DB_HOST=db` y `DB_PORT=3306` para la app dentro de la red de Docker.

## Levantar SIN Docker (local)
- Instala dependencias: `npm ci`
- Arranca con envs locales: `npm run dev` (usa `node --env-file=.env server.js`)
- La app queda en `http://localhost:${APP_PORT}`. Asegúrate que tu MySQL local tenga un usuario y base que coincidan con `.env`, o ajusta `.env` a tu instalación local (`DB_HOST=localhost`, `DB_PORT=3306`, etc.).

## Troubleshooting
- Puerto ocupado (MySQL local vs contenedor):
  - Cambia `DB_PORT` en `.env` (por ejemplo, `3307`) y recrea: `docker compose up -d --build`.
- “Access denied for user”: valida credenciales de `.env` y que el usuario exista en el contenedor:
  - `docker compose exec db mysql -uroot -p$DB_ROOT_PASSWORD -e "SELECT user,host FROM mysql.user;"`
- El contenedor `db` está "unhealthy": suele faltar `MYSQL_ROOT_PASSWORD` o el volumen tiene datos inconsistentes. Ajusta `.env` y, si es necesario, reinicia limpio con `docker compose down -v`.

## Rutas y código relevantes
- Puerto del servidor: `server.js:37-40`
- Config DB (Sequelize): `config/db.js:3-7`
- Ruta pública: `routes/public.routes.js:5`
- Vista de inicio: `views/home.view.ejs:1-3`

---

Si necesitas un workflow de CI/CD, el repo incluye:
- Releases automáticos con semantic-release (`.github/workflows/release.yml:1-29`, `.releaserc.json:1-17`).
- Publicación de imagen Docker en releases (`.github/workflows/docker-image.yml:1-39`).