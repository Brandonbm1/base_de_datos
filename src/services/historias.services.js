import { pool } from "../bdd/db.js";

export const createHistoria = async (historia) => {
  try {
    const {
      nombreHistoria,
      descripcionHistoria,
      prioridadHistoria,
      estadoHistoria,
      dificultadHistoria,
      fechaIni,
      fechafin,
      fechaEntre,
      idProyecto,
      idSprint,
      idEmpleado,
    } = historia;
    const [savedHistoria] = await pool.query(
      `INSERT INTO historias_de_usuario (
        nombreHistoria,
        descripcionHistoria,
        prioridadHistoria,
        estadoHistoria,
        dificultadHistoria,
        fechaIni,
        fechafin,
        fechaEntre,
        idProyecto,
        idSprint,
        idEmpleado
        )

        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nombreHistoria,
        descripcionHistoria,
        prioridadHistoria,
        estadoHistoria,
        dificultadHistoria,
        fechaIni,
        fechafin,
        fechaEntre,
        idProyecto,
        idSprint,
        idEmpleado,
      ]
    );
    return savedHistoria;
  } catch (error) {
    console.error(error);
  }
};

export const getHistorias = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM historias_de_usuario");
    return result;
  } catch (error) {
    return error;
  }
};

export const getFechaHistoria = async (idHistoria) => {
  try {
    const [result] = await pool.query(
      "SELECT fechaIni from historias_de_usuario WHERE idHistorias_de_usuario = ?",
      [idHistoria]
    );
    return result[0].fechaIni;
  } catch (error) {
    console.error(error);
  }
};

export const countHistorias = async () => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(idHistorias_de_usuario) as cantidad FROM historias_de_usuario"
    );
    const cantidad = result[0].cantidad;
    return cantidad;
  } catch (error) {
    console.error(error);
  }
};
