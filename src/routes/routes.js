import { Router } from "express";
import {
  controladorCreadorClientes,
  verClientes,
} from "../controller/cliente.controller.js";
import {
  controladorCreadorEmpleados,
  verEmpleados,
} from "../controller/empleado.controller.js";
import {
  controladorCreadorProyectos,
  verProyectos,
} from "../controller/proyectos.controller.js";
import {
  controladorCreadorSprint,
  verSprints,
} from "../controller/sprint.controller.js";
import {
  controladorCreadorHistorias,
  verHistorias,
} from "../controller/historias.controller.js";
import {
  controladorCreadorPruebas,
  verPruebas,
} from "../controller/pruebas.controller.js";
import {
  controladorCreadorErrores,
  verErrores,
} from "../controller/error.controller.js";

const router = Router();

router.get("/clientes", verClientes);
router.get("/clientes/:cantidad", controladorCreadorClientes);
router.get("/empleados", verEmpleados);
router.get("/empleados/:cantidad", controladorCreadorEmpleados);
router.get("/proyectos", verProyectos);
router.get("/proyectos/:cantidad", controladorCreadorProyectos);
router.get("/sprints", verSprints);
router.get("/sprints/:cantidad", controladorCreadorSprint);
router.get("/historias", verHistorias);
router.get("/historias/:cantidad", controladorCreadorHistorias);
router.get("/pruebas", verPruebas);
router.get("/pruebas/:cantidad", controladorCreadorPruebas);
router.get("/errores", verErrores);
router.get("/errores/:cantidad", controladorCreadorErrores);

export default router;
