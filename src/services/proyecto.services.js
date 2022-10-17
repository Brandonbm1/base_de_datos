import { pool } from "../bdd/db.js";

export const createProyecto = async (proyecto) => {
  // console.log(proyecto);
  try {
    const {
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
    } = proyecto;
    const [savedProyecto] = await pool.query(
      `INSERT INTO proyecto (
        nombreProyecto, 
        fechaIni, 
        fechaFin, 
        fechaEntre, 
        estado, 
        precioProyecto, 
        costoProyecto, 
        utilidadProyecto,
         costoManodeObra, 
         idCliente, 
         idEmpleado
         )
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nombreProyecto,
        fechaIni,
        fechaFin,
        fechaEntre,
        estado,
        precioProyecto,
        costoProyecto,
        utilidadProyecto,
        costoManoDeObra,
        idCliente,
        idEmpleado,
      ]
    );
    return savedProyecto;
  } catch (error) {
    console.error(error);
  }
};

export const getProyectos = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM proyecto");
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getFechaProyecto = async (idProyecto) => {
  try {
    const [result] = await pool.query(
      "SELECT fechaIni FROM proyecto WHERE idProyecto = ?",
      idProyecto
    );
    return result[0].fechaIni;
  } catch (error) {
    console.error(error);
  }
};

export const countProyectos = async () => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(idProyecto) as cantidad FROM proyecto"
    );
    const cuenta = result[0].cantidad;

    return cuenta;
  } catch (error) {
    console.error(error);
  }
};
