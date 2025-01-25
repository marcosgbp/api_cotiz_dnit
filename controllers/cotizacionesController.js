import { connectDB } from "../database/db.js";

// Obtiene la cotización de ayer o la última disponible
export const getCotizacionAyer = async (req, res) => {
  const db = await connectDB();
  try {
    const fechaAyer = new Date();
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    const fechaAyerString = fechaAyer.toISOString().split("T")[0];

    const [rows] = await db.execute(
      "SELECT fecha, dolar_compra, dolar_venta, real_compra, real_venta, peso_compra, peso_venta, yen_compra, yen_venta, euro_compra,euro_venta FROM cotizaciones WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1",
      [fechaAyerString]
    );

    if (rows.length > 0) {
      const cotizacion = rows[0];
      cotizacion.fecha = cotizacion.fecha.toISOString().split("T")[0];
      res.json(cotizacion);
    } else {
      res.status(404).json({ message: "No hay cotizaciones disponibles." });
    }
  } catch (error) {
    console.error("Error al obtener la cotización de ayer:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  } finally {
    await db.end();
  }
};

// Obtiene la última cotización registrada
export const getUltimaCotizacion = async (req, res) => {
  const db = await connectDB();
  try {
    const [rows] = await db.execute(
      "SELECT fecha, dolar_compra, dolar_venta, real_compra, real_venta, peso_compra, peso_venta, yen_compra, yen_venta, euro_compra,euro_venta FROM cotizaciones ORDER BY fecha DESC LIMIT 1"
    );

    if (rows.length > 0) {
      const cotizacion = rows[0];
      cotizacion.fecha = cotizacion.fecha.toISOString().split("T")[0];
      res.json(cotizacion);
    } else {
      res.status(404).json({ message: "No hay cotizaciones registradas." });
    }
  } catch (error) {
    console.error("Error al obtener la última cotización:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  } finally {
    await db.end();
  }
};

// Obtiene una cotización específica por fecha
export const getCotizacionPorFecha = async (req, res) => {
  const { fecha } = req.params;
  const db = await connectDB();
  try {
    const [rows] = await db.execute(
      "SELECT fecha, dolar_compra, dolar_venta, real_compra, real_venta, peso_compra, peso_venta, yen_compra, yen_venta, euro_compra,euro_venta FROM cotizaciones WHERE fecha = ?",
      [fecha]
    );

    if (rows.length > 0) {
      const cotizacion = rows[0];
      cotizacion.fecha = cotizacion.fecha.toISOString().split("T")[0];
      res.json(cotizacion);
    } else {
      res.status(404).json({
        message: `No hay cotización registrada para la fecha ${fecha}.`,
      });
    }
  } catch (error) {
    console.error(`Error al obtener la cotización para la fecha ${fecha}:`, error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  } finally {
    await db.end();
  }
};
