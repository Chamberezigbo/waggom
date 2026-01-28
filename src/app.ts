import express from "express";
import cors from "cors";
import authRouter from "./router/admin/adminRouter.js";
import testimonyRouter from './router/testimonyRouter.js';
import admissionRouter from './router/admissionRouter.js';
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
  origin: "*", // Change to your frontend URL in production, e.g. "https://your-frontend.com"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/api/admin", authRouter);
app.use('/api/testimonies', testimonyRouter);
app.use('/api/admissions', admissionRouter);
app.use('/uploads', express.static('uploads', { 
  // Optional: force inline display for images
  setHeaders: (res, path) => {
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(path)) {
      res.setHeader('Content-Disposition', 'inline');
    }
  }
}));

app.get("/health", (_req, res) => res.json({ ok: true }));

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

export default app;