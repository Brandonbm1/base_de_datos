import {
  createHistoria,
  getHistorias,
} from "../services/historias.services.js";
import * as helpers from "../helpers.js";

export const crearHistoria = async () => {
  try {
    const idProyecto = await helpers.obtenerIdProyecto();
    const idSprint = await helpers.obtenerIdSprint();
    const idEmpleado = await helpers.obtenerIdEmpleado();
    const fechaIni = await helpers.obtenerFechaInicioHistoria(idSprint);
    const fechafin = helpers.obtenerFechaFin(fechaIni);
    const fechaEntre = helpers.obtenerFechaEntregado(fechaIni);
    const estadoHistoria = helpers.obtenerEstadoHistoria(fechaEntre);
    const newHistoria = {
      nombreHistoria: "Historia de usuario",
      descripcionHistoria: "Esta es una historia de usuario",
      prioridadHistoria: helpers.obtenerPrioridadHistoria(),
      estadoHistoria,
      dificultadHistoria: helpers.obtenerDificultadHistoria(),
      fechaIni,
      fechafin,
      fechaEntre,
      idProyecto,
      idSprint,
      idEmpleado,
    };
    helpers.agregarHistoriaASprint(idSprint);
    const savedHistoria = await createHistoria(newHistoria);
    console.log(savedHistoria);
    return savedHistoria;
  } catch (error) {
    console.error(error);
  }
};

export const verHistorias = async (_req, res) => {
  const historias = await getHistorias();
  res.json(historias);
};

export const controladorCreadorHistorias = async (req, res) => {
  try {
    const { cantidad } = req.params;
    const historiasCreadas = [];
    if (!cantidad || cantidad === 1) {
      const historia = await crearHistoria();
      historiasCreadas.push(historia);
    } else {
      for (let i = 1; i <= cantidad; i++) {
        const historia = crearHistoria();
        historiasCreadas.push(historia);
      }
    }
    res.json(historiasCreadas);
  } catch (error) {
    console.error(error);
  }
};
