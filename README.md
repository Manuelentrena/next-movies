# Aplicación de Búsqueda de Películas y Series

## Descripción

Esta aplicación permite a los usuarios buscar películas y series a través de la interfaz del repositorio, visualizar los resultados, ver detalles de cada película o serie y guardar una lista de favoritas. Los favoritos se gestionan y persisten utilizando **Global State**, lo que garantiza que se mantengan al recargar la página.

## Funcionalidades

- **Búsqueda**: Input de búsqueda siempre visible para realizar consultas de películas y series.
- **Mostrar resultados**: Los resultados de la búsqueda se muestran en una lista con el póster y el título de la película o serie.
- **Detalle de películas**: Al hacer clic en el póster de una película o serie, se redirige a una página con más detalles.
- **Favoritos**: Permitir agregar o quitar películas y series a una lista de favoritos, que se muestra claramente en la UI.
- **Filtrar por tipo**: Opción para filtrar la lista por películas o series.
- **Sincronización del estado**: Mostrar el contador del número de películas/series de la lista de favoritos.
- **Persistencia**: Los datos de la lista de favoritos se guardan y se mantienen al recargar la página.
- **Estilo**: Estilos personalizados.
- **Tipado**: Datos están tipadas usando **TypeScript**.

## Tecnologías Utilizadas

- **Next 14**
- **Redux Toolkit**
- **OMDb API**
- **TypeScript**
- **Fetch**

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Manuelentrena/next-movies.git
   ```
