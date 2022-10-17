import { pool } from "../bdd/db.js";

export const createPrueba = async (prueba) => {
  try {
    const {
      nombrePrueba,
      descripcionPrueba,
      fechaIni,
      fechaFin,
      fechaEntre,
      idHistorias_de_usuario,
    } = prueba;

    const [savedPrueba] = await pool.query(
      "INSERT INTO pruebas (nombrePrueba, descripcionPrueba, fechaIni, fechaFin, fechaEntre, idHistorias_de_usuario) VALUES (?,?,?,?,?,?)",
      [
        nombrePrueba,
        descripcionPrueba,
        fechaIni,
        fechaFin,
        fechaEntre,
        idHistorias_de_usuario,
      ]
    );
    return savedPrueba;
  } catch (error) {
    console.error(error);
  }
};
export const getPruebas = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM pruebas");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const countPruebas = async () => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(idPruebas) as cantidad FROM pruebas"
    );
    const cuenta = result[0].cantidad;
    return cuenta;
  } catch (error) {
    console.error(error);
  }
};
