# api_cotiz_dnit

**api_cotiz_dnit** es un proyecto que realiza scraping en la página de cotizaciones de DNIT, almacena los datos en una base de datos y expone una API REST para ser consumida por otros usuarios.

## Características

- **Scraping Automático:** Obtiene las cotizaciones actualizadas de la página oficial de DNIT.
- **Base de Datos:** Guarda las cotizaciones en una base de datos MySQL para consultas eficientes.
- **API REST:** Proporciona acceso a las cotizaciones mediante tres endpoints públicos.
- **Cron Job:** El scraping se ejecuta automáticamente cada hora.

## Tecnologías

- **Node.js**
- **Express**
- **Cheerio**
- **Axios**
- **MySQL**
- **node-cron**

## Endpoints de la API

| Endpoint                       | Método | Descripción                                                                                       |
|--------------------------------|--------|---------------------------------------------------------------------------------------------------|
| `/api/cotizaciones/ayer`       | `GET`  | Devuelve la cotización de ayer. Si no hay datos para ayer, devuelve la última cotización registrada. |
| `/api/cotizaciones/ultima`     | `GET`  | Devuelve la última cotización registrada.                                                        |
| `/api/cotizaciones/:fecha`     | `GET`  | Devuelve la cotización registrada para una fecha específica (formato: YYYY-MM-DD).               |

### Ejemplos de Respuesta

#### **GET /api/cotizaciones/ayer**
#### **GET /api/cotizaciones/ultima**
#### **GET /api/cotizaciones/2024-01-10**
```json
{
  "fecha": "2024-01-10",
  "dolar_compra": 7100.50,
  "dolar_venta": 7200.75,
  "real_compra": 1350.25,
  "real_venta": 1360.50,
  "peso_compra": 7.50,
  "peso_venta": 7.75
}
```

## **Instalación**
1. **Clona este repositorio:**
```bash
   git clone https://github.com/tu_usuario/api_cotiz_dnit.git
   cd api_cotiz_dnit
```
2. **Instala las dependencias:**
```bash
   npm install
```
3. **Configura las variables de entorno:**
- Crea un archivo `.env` en la raíz del proyecto con la configuración de la base de datos:
```env
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=cotizaciones_db
```
4. **Ejecuta las migraciones para crear la tabla `cotizaciones`:**
```sql
   CREATE TABLE cotizaciones (
     id INT AUTO_INCREMENT PRIMARY KEY,
     fecha DATE NOT NULL,
     dolar_compra DECIMAL(10, 2) NOT NULL,
     dolar_venta DECIMAL(10, 2) NOT NULL,
     real_compra DECIMAL(10, 2) NOT NULL,
     real_venta DECIMAL(10, 2) NOT NULL,
     peso_compra DECIMAL(10, 2) NOT NULL,
     peso_venta DECIMAL(10, 2) NOT NULL,
     yen_compra DECIMAL(10, 2) NOT NULL,
     yen_venta DECIMAL(10, 2) NOT NULL,
     euro_compra DECIMAL(10, 2) NOT NULL,
     euro_venta DECIMAL(10, 2) NOT NULL,
     UNIQUE (fecha)
   );
 ```
5. **Inicia el servidor:**
```bash
   npm start
```