import {
  nombres,
  apellidos,
  roles,
  tiposContratos,
  nivelesAcademicos,
  dependencias,
  ciudades,
  nombreProyectos,
} from "./assets/listas.js";
import { format } from "date-fns";
import { countClientes } from "./services/cliente.services.js";
import { countEmpleados } from "./services/empleado.services.js";
import {
  countProyectos,
  getFechaProyecto,
} from "./services/proyecto.services.js";
import {
  countSprints,
  getFechaSprint,
  addNewHistoriaUsuario,
} from "./services/sprint.services.js";
import {
  countHistorias,
  getFechaHistoria,
} from "./services/historias.services.js";
import { countPruebas } from "./services/pruebas.services.js";
export const obtenerNumeroAleatorio = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const cantNombres = nombres.length - 1;
const cantApellidos = apellidos.length - 1;
const cantRoles = roles.length - 1;
const cantTiposContratos = tiposContratos.length - 1;
const cantNivelesAcademicos = nivelesAcademicos.length - 1;
const cantDependencias = dependencias.length - 1;
const cantCiudades = ciudades.length - 1;
const cantNombresProyectos = nombreProyectos.length - 1;

export const obtenerCorreo = (
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido
) => {
  const newCorreo =
    primerNombre.slice(0, 3) +
    segundoNombre.slice(0, 2) +
    primerApellido.slice(0, 3) +
    segundoApellido.slice(0, 2) +
    obtenerNumeroAleatorio(0, 100) +
    "@correo.com";

  return newCorreo.toLowerCase();
};
export const obtenerFecha = (date1, date2) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || "01-01-1970";
  var date2 = date2 || new Date();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    return format(
      new Date(getRandomArbitrary(date2, date1)),
      "yyyy-MM-dd HH:mm:ss"
    );
  } else {
    return format(
      new Date(getRandomArbitrary(date1, date2)),
      "yyyy-MM-dd HH:mm:ss"
    );
  }
};

export const obtenerNombre = () => {
  const index = obtenerNumeroAleatorio(0, cantNombres);
  return nombres[index];
};

export const obtenerApellido = () => {
  const index = obtenerNumeroAleatorio(0, cantApellidos);
  return apellidos[index];
};

export const obtenerDireccion = () => {
  const direccion = `Calle ${obtenerNumeroAleatorio(
    1,
    50
  )} #${obtenerNumeroAleatorio(1, 30)}-${obtenerNumeroAleatorio(1, 30)}`;
  return direccion;
};

// PARA EL EMPLEADO
export const obtenerRole = () => {
  const index = obtenerNumeroAleatorio(0, cantRoles);
  return roles[index];
};

export const obtenerGenero = () => {
  const index = obtenerNumeroAleatorio(0, 1);
  return index === 0 ? "Hombre" : "Mujer";
};

export const obtenerTipoContrato = () => {
  const index = obtenerNumeroAleatorio(0, cantTiposContratos);
  return tiposContratos[index];
};

export const obtenerNivelEducativo = () => {
  const index = obtenerNumeroAleatorio(0, cantNivelesAcademicos);
  return nivelesAcademicos[index];
};

export const obtenerDependencia = () => {
  const index = obtenerNumeroAleatorio(0, cantDependencias);
  return dependencias[index];
};

export const obtenerFechaNacimiento = () => {
  return obtenerFecha("01/01/1980", "01/01/2005");
};

export const obtenerLugarNacimiento = () => {
  const index = obtenerNumeroAleatorio(0, cantCiudades);
  return ciudades[index];
};

//----------PROYECTO--------------***
export const obtenerNombreProyecto = () => {
  const index = obtenerNumeroAleatorio(0, cantNombresProyectos);
  return nombreProyectos[index];
};
export const obtenerFechaInicio = () => {
  return obtenerFecha("01/01/2019", "12/31/2022");
};
export const obtenerFechaFin = (fechaIni) => {
  let fecha = obtenerFecha(fechaIni, "12-31-2022");
  return fecha;
};
export const obtenerFechaEntregado = (fechaIni) => {
  const entregado = obtenerNumeroAleatorio(0, 1);
  if (entregado === 0) return null;
  let fecha = obtenerFecha(fechaIni, "10-16-2022");
  return fecha;
};
export const obtenerEstado = (fechaEntre) => {
  if (fechaEntre) return "Finalizado";
  return "En desarrollo";
};
export const obtenerIdCliente = async () => {
  const numeroClientes = await countClientes();
  return obtenerNumeroAleatorio(1, numeroClientes);
};

export const obtenerIdEmpleado = async () => {
  const numeroEmpleados = await countEmpleados();
  return obtenerNumeroAleatorio(1, numeroEmpleados);
};
// ------SPRINTS---------***

export const obtenerEstadoSprint = (fechaEntregado) => {
  if (fechaEntregado) return "Finalizado";
  else {
    const num = obtenerNumeroAleatorio(0, 2);
    if (num === 0) return "Iniciado";
    if (num === 1) return "En desarrollo";
    return "En testing";
  }
};

export const obtenerFechaInicioSprint = async (idProyecto) => {
  try {
    const fechaProyecto = await getFechaProyecto(idProyecto);

    const fechaInicio = obtenerFecha(fechaProyecto, "12/31/2022");
    return fechaInicio;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerIdProyecto = async () => {
  const numeroProyectos = await countProyectos();
  return obtenerNumeroAleatorio(2, numeroProyectos);
};

// ------ HISTORIAS DE USUARIO ----------***

export const obtenerPrioridadHistoria = () => {
  const prioridad = obtenerNumeroAleatorio(1, 5);
  if (prioridad === 1) return "Muy alta";
  if (prioridad === 2) return "Alta";
  if (prioridad === 3) return "Media";
  if (prioridad === 4) return "Baja";
  return "Muy baja";
};
export const obtenerDificultadHistoria = () => {
  const dificultad = obtenerNumeroAleatorio(1, 5);
  if (dificultad === 5) return "Muy dificil";
  if (dificultad === 4) return "Dificil";
  if (dificultad === 3) return "Media";
  if (dificultad === 2) return "Facil";
  return "Muy facil";
};

export const obtenerIdSprint = async () => {
  const numeroSprints = await countSprints();
  return obtenerNumeroAleatorio(1, numeroSprints);
};
export const obtenerFechaInicioHistoria = async (idSprint) => {
  try {
    const fechaSprint = await getFechaSprint(idSprint);
    const fechaInicio = obtenerFecha(fechaSprint, "12/31/2022");
    return fechaInicio;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerEstadoHistoria = (fechaEntregado) => {
  if (fechaEntregado) return "Finalizado";
  else {
    const num = obtenerNumeroAleatorio(0, 2);
    if (num === 0) return "Iniciado";
    if (num === 1) return "En desarrollo";
    return "En testing";
  }
};

export const agregarHistoriaASprint = async (idSprint) => {
  addNewHistoriaUsuario(idSprint);
};

// ---------- PRUEBA ------------***

export const obtenerFechaInicioPrueba = async (idHistoria) => {
  try {
    const fechaHistoria = await getFechaHistoria(idHistoria);
    const fechaInicio = obtenerFecha(fechaHistoria, "12/31/2022");
    return fechaInicio;
  } catch (error) {
    console.error(error);
  }
};
export const obtenerIdHistoria = async () => {
  try {
    const cantidadHistorias = await countHistorias();
    return obtenerNumeroAleatorio(1, cantidadHistorias);
  } catch (error) {
    console.error(error);
  }
};
export const obtenerIdPruebas = async () => {
  try {
    const cantidadPruebas = await countPruebas();
    return obtenerNumeroAleatorio(1, cantidadPruebas);
  } catch (error) {
    console.error(error);
  }
};
