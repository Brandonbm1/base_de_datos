import { createCliente, getCliente } from "../services/cliente.services.js";
import * as helpers from "../helpers.js";

const crearCliente = async () => {
  const primerNombre = helpers.obtenerNombre();
  const segundoNombre = helpers.obtenerNombre();
  const primerApellido = helpers.obtenerApellido();
  const segundoApellido = helpers.obtenerApellido();

  const newClient = {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    identificacion: helpers.obtenerNumeroAleatorio(1000000000, 7000000000),
    direccion: helpers.obtenerDireccion(),
    telefono: helpers.obtenerNumeroAleatorio(3000000000, 3255555555),
    correo: helpers.obtenerCorreo(
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido
    ),
  };

  const clienteGuardado = await createCliente(newClient);
  console.log(clienteGuardado);
  return clienteGuardado;
};

export const verClientes = async (_req, res) => {
  const clientes = await getCliente();
  res.json(clientes);
};

export const controladorCreadorClientes = async (req, res) => {
  const { cantidad } = req.params;
  const clientesCreados = [];
  if (!cantidad || cantidad === 1) {
    const cliente = await crearCliente();
    clientesCreados.push(cliente);
  } else {
    for (let i = 1; i <= cantidad; i++) {
      const cliente = await crearCliente();
      clientesCreados.push(cliente);
    }
  }
  res.json(clientesCreados);
};
