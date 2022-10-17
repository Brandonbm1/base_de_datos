import express from "express";
import routes from "./src/routes/routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = 5000;

app.listen(PORT);
