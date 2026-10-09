# Guía de configuración de laptops · CNA Sistemas

Guía interactiva de 14 pantallas (portada, índice, 11 pasos y cierre) para la configuración inicial de laptops con Windows 11. Implementa el diseño **Guia Setup Canva** de Claude Design.

## Funciones

- Responsive: en computadores y TV mantiene el diseño de presentación a pantalla completa; en celulares, tablets en vertical y ventanas angostas el contenido se apila, se desplaza verticalmente y los botones Anterior/Siguiente quedan fijos abajo.
- Las capturas se amplían a pantalla completa al tocarlas (o con Enter).
- Navegación con los botones, la barra de progreso, el índice, las flechas ← → del teclado (también Inicio/Fin) o deslizando en pantallas táctiles.
- Cada pantalla tiene su propio enlace (`#p-1` … `#p-11`, `#p-indice`, `#p-fin`) y la guía recuerda en qué pantalla se quedó el usuario.
- El comando, el nombre del equipo, la contraseña y la respuesta de seguridad se copian con un clic.
- Al imprimir o guardar como PDF (Ctrl+P), sale una pantalla por hoja.

## Estructura

```
public/
  index.html        página principal
  css/styles.css    estilos (colores y tipografías de marca en :root)
  js/content.js     TODO el contenido: textos, valores y capturas
  js/app.js         renderizado y navegación
  img/screens/      pantallas de Windows 11 recreadas (generadas)
screens/            fuente de las pantallas: screens.js (HTML), oobe.css y render.js
server.js           servidor Express (opcional) para servir public/
test/               pruebas (node --test)
```

Para cambiar un texto, un valor o una captura, edita solo `public/js/content.js`.

## Pantallas de Windows 11

Las imágenes de cada paso no son fotos ni capturas de terceros: son recreaciones de la configuración de Windows 11 hechas en HTML/CSS (`screens/`), con la opción que hay que elegir resaltada en azul. Para cambiarlas, edita `screens/screens.js` o `screens/oobe.css` y vuelve a generarlas:

```bash
npx playwright install chromium   # solo la primera vez
npm run screens                   # escribe public/img/screens/*.jpg
```

## Uso local

```bash
npm install
npm start          # http://localhost:3000  (PORT para cambiar el puerto)
npm test
```

`public/` es un sitio estático: también se puede abrir `public/index.html` directamente en el navegador, sin servidor.

## Despliegue

- **GitHub Pages:** el workflow `.github/workflows/pages.yml` prueba y publica `public/` en cada push a `main`. Actívalo una vez en *Settings → Pages → Source: GitHub Actions*.
- **Cualquier hosting estático** (Netlify, Vercel, S3…): publica la carpeta `public/`.
- **Servidor Node / Docker:** `docker build -t cna-guia . && docker run -p 3000:3000 cna-guia`. Incluye `/healthz` para monitoreo.

> ⚠️ La guía muestra la contraseña y el nombre que se asignan a los equipos. Si el repositorio o el sitio son públicos, cualquiera podrá verlos.
