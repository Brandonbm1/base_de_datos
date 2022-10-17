import { createEmpleado, getEmpleados } from "../services/empleado.services.js";
import * as helpers from "../helpers.js";

const crearEmpleado = async () => {
  const primerNombre = helpers.obtenerNombre();
  const segundoNombre = helpers.obtenerNombre();
  const primerApellido = helpers.obtenerApellido();
  const segundoApellido = helpers.obtenerApellido();
  const newEmpleado = {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoDocumento: "Cedula",
    documento: helpers.obtenerNumeroAleatorio(1000000000, 7000000000),
    role: helpers.obtenerRole(),
    codigo: helpers.obtenerNumeroAleatorio(1, 800),
    genero: helpers.obtenerGenero(),
    tipoContrato: helpers.obtenerTipoContrato(),
    nivelAcademico: helpers.obtenerNivelEducativo(),
    titulo: "Sistemas",
    dependencia: helpers.obtenerDependencia(),
    estadoCivil:
      helpers.obtenerNumeroAleatorio(0, 1) === 0 ? "Soltero" : "Casado",
    fechaNacimiento: helpers.obtenerFechaNacimiento(),
    lugarNacimiento: helpers.obtenerLugarNacimiento() || "Santa Marta",
  };

  const empleadoGuardado = await createEmpleado(newEmpleado);
  console.log(empleadoGuardado);
  return empleadoGuardado;
};

export const verEmpleados = async (_req, res) => {
  const empleados = await getEmpleados();
  res.json(empleados);
};

export const controladorCreadorEmpleados = async (req, res) => {
  const { cantidad } = req.params;
  const empleadosCreados = [];
  if (!cantidad || cantidad === 1) {
    const empleado = await crearEmpleado();
    empleadosCreados.push(empleado);
  } else {
    for (let i = 1; i <= cantidad; i++) {
      const empleado = await crearEmpleado();
      empleadosCreados.push(empleado);
    }
  }
  console.log(empleadosCreados);
  res.json(empleadosCreados);
};
