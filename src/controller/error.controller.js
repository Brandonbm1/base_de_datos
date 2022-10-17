import { createError, getErrores } from "../services/error.services.js";
import * as helpers from "../helpers.js";

export const crearError = async () => {
  try {
    const idEmpleado = await helpers.obtenerIdEmpleado();
    const idPruebas = await helpers.obtenerIdPruebas();
    const newError = {
      nombreError: "Error en ejecucion",
      descripcionError: "Fallo cuando estaba en ejecucion",
      idEmpleado,
      idPruebas,
    };
    const savedError = createError(newError);
    return savedError;
  } catch (error) {
    console.error(error);
  }
};

export const verErrores = async (_req, res) => {
  const errores = await getErrores();
  res.json(errores);
};

export const controladorCreadorErrores = async (req, res) => {
  try {
    const { cantidad } = req.params;
    const erroresCreados = [];
    if (!cantidad || cantidad === 1) {
      const error = await crearError();
      erroresCreados.push(error);
    } else {
      for (let i = 1; i < cantidad; i++) {
        const error = await crearError();
        erroresCreados.push(error);
      }
    }
    res.json(erroresCreados);
  } catch (e) {
    console.error(e);
  }
};
