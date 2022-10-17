import { pool } from "../bdd/db.js";

export const createError = async (error) => {
  try {
    console.log(error);
    const { nombreError, descripcionError, idEmpleado, idPruebas } = error;
    const [savedError] = await pool.query(
      "INSERT INTO error (nombreError, descripcionError, idEmpleado, idPruebas) VALUES (?,?,?,?)",
      [nombreError, descripcionError, idEmpleado, idPruebas]
    );
    return savedError;
  } catch (e) {
    console.error(e);
  }
};
export const getErrores = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM error");
    return result;
  } catch (error) {
    console.error(error);
  }
};
