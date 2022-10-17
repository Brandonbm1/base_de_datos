import { createPrueba, getPruebas } from "../services/pruebas.services.js";
import * as helpers from "../helpers.js";

export const crearPrueba = async () => {
  try {
    const idHistoria = await helpers.obtenerIdHistoria();
    const fechaIni = await helpers.obtenerFechaInicioPrueba(idHistoria);
    const fechaFin = helpers.obtenerFechaFin(fechaIni);
    const fechaEntre = helpers.obtenerFechaEntregado(fechaIni);
    const newPrueba = {
      nombrePrueba: "Prueba",
      descripcionPrueba: "Descripcion prueba",
      fechaIni,
      fechaFin,
      fechaEntre,
      idHistorias_de_usuario: idHistoria,
    };
    const savedPrueba = await createPrueba(newPrueba);
    return savedPrueba;
  } catch (error) {
    console.error(error);
  }
};

export const verPruebas = async (_req, res) => {
  const pruebas = await getPruebas();
  res.json(pruebas);
};

export const controladorCreadorPruebas = async (req, res) => {
  try {
    const { cantidad } = req.params;
    const pruebasCreadas = [];
    if (!cantidad || cantidad === 1) {
      const prueba = await crearPrueba();
      pruebasCreadas.push(prueba);
    } else {
      for (let i = 1; i <= cantidad; i++) {
        const prueba = await crearPrueba();
        pruebasCreadas.push(prueba);
      }
    }
    res.json(pruebasCreadas);
  } catch (error) {
    console.error(error);
  }
};
