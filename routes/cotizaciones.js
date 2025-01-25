import express from "express";
import {
  getCotizacionAyer,
  getUltimaCotizacion,
  getCotizacionPorFecha,
} from "../controllers/cotizacionesController.js";

const router = express.Router();

// Rutas
router.get("/ayer",getCotizacionAyer);// cotización de ayer o última disponible
router.get("/ultima", getUltimaCotizacion); // Última cotización registrada
router.get("/:fecha", getCotizacionPorFecha); // Cotización específica por fecha

export default router;
