import express from "express";
import cors from "cors";
import "./jobs/cronScraping.js";
import cotizacionesRoutes from "./routes/cotizaciones.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// Rutas de la API
app.use("/api/cotizaciones", cotizacionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
