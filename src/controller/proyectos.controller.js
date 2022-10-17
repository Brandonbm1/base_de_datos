import { createProyecto, getProyectos } from "../services/proyecto.services.js";
import * as helpers from "../helpers.js";

const crearProyecto = async () => {
  try {
    const nombreProyecto = helpers.obtenerNombreProyecto();
    const fechaIni = helpers.obtenerFechaInicio();
    const fechaFin = helpers.obtenerFechaFin(fechaIni);
    const fechaEntre = helpers.obtenerFechaEntregado(fechaIni);
    const estado = helpers.obtenerEstado(fechaEntre);
    const precioProyecto = helpers.obtenerNumeroAleatorio(
      1000000000,
      9999999999
    );
    const costoProyecto = helpers.obtenerNumeroAleatorio(100000000, 999999999);
    const costoManoDeObra = helpers.obtenerNumeroAleatorio(1000000, 9999999);
    const utilidadProyecto = precioProyecto - (costoProyecto + costoManoDeObra);
    const idCliente = await helpers.obtenerIdCliente();
    const idEmpleado = await helpers.obtenerIdEmpleado();
    const newProyecto = {
      nombreProyecto,
      fechaIni,
      fechaFin,
      fechaEntre,
      estado,
      precioProyecto,
      costoProyecto,
      costoManoDeObra,
      utilidadProyecto,
      idCliente,
      idEmpleado,
    };

    const proyectoGuardado = await createProyecto(newProyecto);
    return proyectoGuardado;
  } catch (error) {
    return error;
  }
};

export const verProyectos = async (_req, res) => {
  const proyectos = await getProyectos();
  res.json(proyectos);
};

export const controladorCreadorProyectos = async (req, res) => {
  const { cantidad } = req.params;
  const proyectosCreados = [];
  if (!cantidad || cantidad === 1) {
    const proyecto = await crearProyecto();
    proyectosCreados.push(proyecto);
  } else {
    for (let i = 1; i <= cantidad; i++) {
      const proyecto = await crearProyecto();
      proyectosCreados.push(proyecto);
    }
  }
  console.log(proyectosCreados);
  res.json(proyectosCreados);
};
