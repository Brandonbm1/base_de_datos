import { pool } from "../bdd/db.js";

export const createCliente = async (cliente) => {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      identificacion,
      direccion,
      telefono,
      correo,
    } = cliente;

    const [savedCliente] = await pool.query(
      "INSERT INTO cliente (primerNombreCliente, segundoNombreCliente, primerApellidoCliente, segundoApellidoCliente, identificacionCliente, direccionCliente, telefonoCliente, correoCliente) VALUES (?,?,?,?,?,?,?,?)",
      [
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        identificacion,
        direccion,
        telefono,
        correo,
      ]
    );

    return savedCliente;
  } catch (error) {
    console.error(error);
  }
};
export const getCliente = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM cliente");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const countClientes = async () => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(idCliente) as cantidad FROM cliente"
    );
    const cuenta = result[0].cantidad;
    return cuenta;
  } catch (error) {
    console.error(error);
  }
};
