import express from "express";
import cors from "cors";
import postController from "./controllers/post-controller";

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Bem-vindo!");
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use("/api", postController);

app.use((_req, res) => {
  res.status(404).send();
});

app.listen(PORT, () => {
  console.info(`Servidor no ar ${HOSTNAME}:${PORT}.`);
});
