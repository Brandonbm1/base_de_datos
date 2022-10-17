import { pool } from "../bdd/db.js";

export const createSprint = async (sprint) => {
  try {
    const {
      numSprint,
      estadoSprint,
      cantidadHistorias,
      fechaIni,
      fechaFin,
      fechaEntre,
      idProyecto,
      idEmpleadoCargo,
    } = sprint;
    const [savedSprint] = await pool.query(
      `INSERT INTO sprint (
        numSprint,
        estadoSprint,
        cantidadHistorias,
        fechaIni,
        fechaFin,
        fechaEntre,
        idProyecto,
        idEmpleadoCargo
      )
      VALUES(?,?,?,?,?,?,?,?)`,
      [
        numSprint,
        estadoSprint,
        cantidadHistorias,
        fechaIni,
        fechaFin,
        fechaEntre,
        idProyecto,
        idEmpleadoCargo,
      ]
    );
    return savedSprint;
  } catch (error) {
    return error;
  }
};

export const getSprints = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM sprint");
    return results;
  } catch (error) {
    return error;
  }
};

export const addNewHistoriaUsuario = async (idSprint) => {
  try {
    const [results] = await pool.query(
      "SELECT cantidadHistorias FROM sprint WHERE idSprint = ?",
      [idSprint]
    );
    const cantidad = results[0].cantidadHistorias + 1;
    const [result] = await pool.query(
      "UPDATE sprint SET cantidadHistorias = ? WHERE idSprint = ?",
      [cantidad, idSprint]
    );
    console.log(result);
  } catch (error) {
    return error;
  }
};

export const countSprints = async () => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(idSprint) as cantidad FROM sprint"
    );
    const cuenta = result[0].cantidad;
    return cuenta;
  } catch (error) {
    console.error(error);
  }
};
export const getFechaSprint = async (idSprint) => {
  try {
    const [result] = await pool.query(
      "SELECT fechaIni FROM sprint WHERE idSprint = ?",
      [idSprint]
    );

    return result[0].fechaIni;
  } catch (error) {
    console.error(error);
  }
};
