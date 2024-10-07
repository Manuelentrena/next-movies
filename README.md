<p align="center"><img src="https://raw.githubusercontent.com/Manuelentrena/next-movies/refs/heads/main/public/ticket.webp" width="200" alt="Next Movies Logo"></p>

<p align="center">
<a href="https://github.com/Manuelentrena/next-movies/actions"><img src="https://github.com/Manuelentrena/next-movies/actions/workflows/deploy.yaml/badge.svg" alt="Build Status"></a>
<a href="https://app.codecov.io/gh/Manuelentrena/next-movies"><img src="https://img.shields.io/codecov/c/github/Manuelentrena/next-movies" alt="Test Coverage"></a>
</p>

# Next Movies

## Descripción

Esta aplicación permite a los usuarios buscar películas y series a través de una interfaz intuitiva, visualizar los resultados, obtener detalles de cada película o serie, y gestionar una lista de favoritos. Los favoritos se administran utilizando **Global State**, asegurando que la información persista incluso al recargar la página.

<p align="center"><img src="https://res.cloudinary.com/manuelentrena/image/upload/v1728259665/Next-Movie/2024-10-07_02h07_34_lkrupl.png" width="800" alt="Next Movies Mobile"></p>

## Funcionalidades

- **Búsqueda**: Un campo de entrada siempre visible para realizar consultas de películas y series.
- **Mostrar Resultados**: Los resultados de la búsqueda se presentan en una lista que incluye el póster y el título de cada película o serie.
- **Detalle de Películas**: Al hacer clic en el póster de una película o serie, se redirige a una página con más información detallada.
- **Favoritos**: Permite agregar o quitar películas y series de una lista de favoritos, claramente visible en la interfaz de usuario.
- **Filtrado por Tipo**: Opción para filtrar la lista según películas o series.
- **Sincronización del Estado**: Muestra un contador del número de películas/series en la lista de favoritos.
- **Persistencia**: Los datos de la lista de favoritos se almacenan y mantienen al recargar la página.
- **Estilo Personalizado**: Diseño estético y moderno.
- **Tipado con TypeScript**: Todas las estructuras de datos están tipadas para garantizar un desarrollo más seguro y eficiente.

## Tecnologías Utilizadas

- **Next.js 14**
- **Redux Toolkit**
- **OMDb API**
- **TypeScript**
- **Fetch API**

## Comandos

A continuación, se describen los comandos disponibles para gestionar el proyecto:

- **`dev`**: `next dev`  
  Inicia el servidor de desarrollo, permitiendo ver los cambios en tiempo real durante el desarrollo.

- **`build`**: `next build`  
  Compila la aplicación para producción, generando los archivos optimizados.

- **`start`**: `next start`  
  Inicia la aplicación en modo producción, sirviendo los archivos generados por el comando `build`.

- **`test`**: `jest --watch`  
  Ejecuta las pruebas unitarias en modo interactivo, observando cambios en los archivos.

- **`test:ci`**: `jest --ci`  
  Ejecuta las pruebas en un entorno de integración continua (CI), finalizando el proceso con un código de error si alguna prueba falla.

- **`test:coverage`**: `jest --coverage`  
  Ejecuta las pruebas y genera un informe de cobertura, mostrando qué porcentaje de código está cubierto por pruebas.

- **`lint`**: `eslint .`  
  Verifica el código en busca de errores y problemas de estilo utilizando ESLint.

- **`format`**: `prettier --write .`  
  Formatea todos los archivos en el proyecto de acuerdo a las reglas definidas en la configuración de Prettier.

- **`prepare`**: `husky`  
  Configura los hooks de Git utilizando Husky, permitiendo ejecutar scripts en eventos de Git.

## Requisitos para Docker

Para ejecutar la aplicación utilizando Docker, asegúrate de tener Docker y Docker Compose instalados en tu máquina. Luego, puedes levantar el proyecto utilizando el siguiente comando:

```bash
docker-compose -f docker/docker-compose.dev.yaml up
```

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Manuelentrena/next-movies.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd next-movies
   ```

3. Instala las dependencias (opcional si usas Docker):

   ```bash
   npm install
   ```

4. Configuración del Archivo `.env`

   ```
   NEXT_PUBLIC_BASE_URL="https://www.omdbapi.com/?apikey="
   NEXT_PUBLIC_API_KEY="YOUR-API-KEY"
   ```

5. Levanta la aplicación (opcional si no usas Docker):
   ```bash
   npm run dev
   ```
