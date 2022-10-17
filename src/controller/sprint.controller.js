import { createSprint, getSprints } from "../services/sprint.services.js";
import * as helpers from "../helpers.js";

const crearSprint = async () => {
  try {
    const idProyecto = await helpers.obtenerIdProyecto();
    const fechaIni = await helpers.obtenerFechaInicioSprint(idProyecto);
    const fechaFin = helpers.obtenerFechaFin(fechaIni);
    const fechaEntre = helpers.obtenerFechaEntregado(fechaIni);
    const estadoSprint = helpers.obtenerEstadoSprint(fechaEntre);
    const cantidadHistorias = 0;
    const idEmpleadoCargo = await helpers.obtenerIdEmpleado();
    const newSprint = {
      numSprint: helpers.obtenerNumeroAleatorio(1, 15),
      estadoSprint,
      cantidadHistorias,
      fechaIni,
      fechaFin,
      fechaEntre,
      idProyecto,
      idEmpleadoCargo,
    };
    const result = await createSprint(newSprint);
    return result;
  } catch (error) {
    return error;
  }
};

export const verSprints = async (_req, res) => {
  const result = await getSprints();
  res.json(result);
};

export const controladorCreadorSprint = async (req, res) => {
  const { cantidad } = req.params;
  const sprintsCreados = [];
  if (!cantidad || cantidad === 1) {
    const sprint = await crearSprint();
    sprintsCreados.push(sprint);
  } else {
    for (let i = 1; i <= cantidad; i++) {
      const sprint = await crearSprint();
      sprintsCreados.push(sprint);
    }
  }
  console.log(sprintsCreados);
  res.json(sprintsCreados);
};
