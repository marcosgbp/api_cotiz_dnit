import axios from "axios";
import { load } from "cheerio";

// Función para convertir el nombre del mes a número
const getMonthNumber = (monthName) => {
  const months = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
  };
  return months[monthName.toLowerCase()] || "00";
};

const URL = "https://www.dnit.gov.py/web/portal-institucional/cotizaciones";

const scrapeCotizaciones = async () => {
  try {
    // 1. Realizar la solicitud HTTP
    const { data } = await axios.get(URL);
    const $ = load(data);

    // 2. Filtrar secciones por los años 2024 y 2025
    const resultados = [];
    $("div.journal-content-article").each((index, element) => {
      const titulo = $(element).find("h4.section__midtitle").text().trim();
      const regex = /mes de ([a-zA-Z]+) (\d{4})/;
      const match = titulo.match(regex);

      if (match) {
        // Extraemos el mes y año del título
        const [_, mes, año] = match; 
        const mesNumero = getMonthNumber(mes);
        if (año === "2024" || año === "2025") {
          console.log(`Procesando el mes de ${mes} (${mesNumero}) del año ${año}...`);

          // 3. Extraer datos de la tabla asociada
          const tabla = $(element).find("table tbody");
          tabla.find("tr").each((rowIndex, row) => {
            const celdas = $(row).find("td");
            if (celdas.length > 0) {
              const dia = $(celdas[0]).text().trim();
              const dolarCompra = $(celdas[1]).text().trim().replace(/\./g, "").replace(",", ".");
              const dolarVenta = $(celdas[2]).text().trim().replace(/\./g, "").replace(",", ".");
              const realCompra = $(celdas[3]).text().trim().replace(/\./g, "").replace(",", ".");
              const realVenta = $(celdas[4]).text().trim().replace(/\./g, "").replace(",", ".");
              const pesoCompra = $(celdas[5]).text().trim().replace(/\./g, "").replace(",", ".");
              const pesoVenta = $(celdas[6]).text().trim().replace(/\./g, "").replace(",", ".");
              const yenCompra = $(celdas[7]).text().trim().replace(/\./g, "").replace(",", ".");
              const yenVenta = $(celdas[8]).text().trim().replace(/\./g, "").replace(",", ".");
              const euroCompra = $(celdas[9]).text().trim().replace(/\./g, "").replace(",", ".");
              const euroVenta = $(celdas[10]).text().trim().replace(/\./g, "").replace(",", ".");

              resultados.push({
                fecha: `${año}-${mesNumero}-${dia.padStart(2, "0")}`,
                dolar: { compra: parseFloat(dolarCompra), venta: parseFloat(dolarVenta) },
                real: { compra: parseFloat(realCompra), venta: parseFloat(realVenta) },
                peso: { compra: parseFloat(pesoCompra), venta: parseFloat(pesoVenta) },
                yen: { compra: parseFloat(yenCompra), venta: parseFloat(yenVenta) },
                euro: { compra: parseFloat(euroCompra), venta: parseFloat(euroVenta) },
              });
            }
          });
        }
      }
    });

    // 4. Mostrar los resultados
    console.log("Cotizaciones extraídas:", resultados);
    return resultados;
  } catch (error) {
    console.error("Error al realizar el scraping:", error.message);
  }
};

// Ejecutar el scraping
scrapeCotizaciones();
