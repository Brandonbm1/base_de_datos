import { pool } from "../bdd/db.js";

export const createEmpleado = async (empleado) => {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      documento,
      role,
      codigo,
      genero,
      tipoContrato,
      nivelAcademico,
      titulo,
      dependencia,
      estadoCivil,
      fechaNacimiento,
      lugarNacimiento,
    } = empleado;
    const [savedEmpleado] = await pool.query(
      "INSERT INTO empleado (primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado, tipoDocumentoEmpleado, documentoEmpleado, roleEmpleado, codigoEmpleado, generoEmpleado, tipoContratoEmpleado, nivelAcademicoEmpleado, tituloEmpleado, dependenciaEmpleado, estadoCivilEmpleado, fechaNacimientoEmpleado, lugarNacimientoEmpleado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        tipoDocumento,
        documento,
        role,
        codigo,
        genero,
        tipoContrato,
        nivelAcademico,
        titulo,
        dependencia,
        estadoCivil,
        fechaNacimiento,
        lugarNacimiento,
      ]
    );
    return savedEmpleado;
  } catch (error) {
    return error;
  }
};
export const getEmpleados = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM empleado");
    return results;
  } catch (error) {
    return error;
  }
};

export const countEmpleados = async () => {
  try {
    const [results] = await pool.query(
      "SELECT COUNT(idEmpleado) as cantidad FROM empleado"
    );

    const cuenta = results[0].cantidad;
    return cuenta;
  } catch (error) {
    return error;
  }
};
