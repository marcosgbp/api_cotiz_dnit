# api_cotiz_dnit

**api_cotiz_dnit** es un proyecto que realiza scraping en la página de cotizaciones de DNIT, almacena los datos en una base de datos y expone una API para ser consumida por otros usuarios.

## Características

- **Scraping Automático:** Obtiene las cotizaciones actualizadas de la página oficial de DNIT.
- **Base de Datos:** Guarda las cotizaciones en una base de datos para consultas eficientes.
- **API REST:** Permite acceder a las cotizaciones a través de un endpoint público.

## Tecnologías

- Node.js
- Express
- Cheerio
- Axios
- Base de datos: PostgreSQL o MySQL (por confirmar)
- node-cron (para tareas automáticas)
