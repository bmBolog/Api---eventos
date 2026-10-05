import express from "express";
import cors from "cors";

import palestrantesRoutes from "./routes/palestrantesRoutes";
import eventosRoutes from "./routes/eventosRoutes";
import relacaoRoutes from "./routes/relacaoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/palestrantes", palestrantesRoutes);
app.use("/eventos", eventosRoutes);
app.use("/relacao", relacaoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});