import cron from "node-cron";
import { scrapeCotizaciones } from "../scrapping/scrapeCotizaciones.js";
import { connectDB } from "../database/db.js";
import { saveCotizaciones } from "../controllers/saveCotizaciones.js";

// el cron se ejecutara cada 1 hora
cron.schedule("0 * * * *", async () => {
  console.log("Ejecutando scraping de cotizaciones...");
  const db = await connectDB();
  const cotizaciones = await scrapeCotizaciones();
  await saveCotizaciones(cotizaciones, db);
  console.log("Scraping completado y datos guardados.");
});
