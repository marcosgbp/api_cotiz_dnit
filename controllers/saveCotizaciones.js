export const saveCotizaciones = async (cotizaciones, db) => {
    try {
      // Ordenar las cotizaciones por la fecha en orden ascendente
      cotizaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  
      for (const cotizacion of cotizaciones) {
        const { fecha, dolar, real, peso, yen, euro } = cotizacion;
  
        // Verifica si ya existe una cotización para esa fecha
        const [rows] = await db.execute(
          "SELECT * FROM cotizaciones WHERE fecha = ?",
          [fecha]
        );
  
        if (rows.length === 0) {
          // Inserta nueva cotización
          await db.execute(
            "INSERT INTO cotizaciones (fecha, dolar_compra, dolar_venta, real_compra, real_venta, peso_compra, peso_venta, yen_compra, yen_venta, euro_compra, euro_venta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              fecha,
              dolar.compra,
              dolar.venta,
              real.compra,
              real.venta,
              peso.compra,
              peso.venta,
              yen.compra,
              yen.venta,
              euro.compra,
              euro.venta,
            ]
          );
          console.log(`Cotización para ${fecha} guardada exitosamente.`);
        } else {
          console.log(`Cotización para ${fecha} ya existe. No se guarda.`);
        }
      }
    } catch (error) {
      console.error("Error al guardar las cotizaciones:", error.message);
    }
  };
  