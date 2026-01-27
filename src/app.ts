import express from "express";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;