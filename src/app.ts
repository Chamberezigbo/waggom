import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRouter from "./router/admin/adminRouter.js";
import testimonyRouter from './router/testimonyRouter.js';
import admissionRouter from './router/admissionRouter.js';
import eventRouter from './router/eventRouter.js';
import studentRouter from './router/studentRouter.js'
import contactRouter from './router/contactRouter.js'
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
  origin: "*", // Change to your frontend URL in production, e.g. "https://your-frontend.com"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/admin", authRouter);
app.use("/api/students", studentRouter);
app.use('/api/testimonies', testimonyRouter);
app.use('/api/admissions', admissionRouter);
app.use('/api/events', eventRouter);
app.use('/api/contact-us', contactRouter);
app.use('/uploads', express.static('uploads', { 
  // Optional: force inline display for images
  setHeaders: (res, path) => {
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(path)) {
      res.setHeader('Content-Disposition', 'inline');
    }
  }
}));

// Optional: raw JSON for Postman
app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

app.get("/health", (_req, res) => res.json({ ok: true }));

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

export default app;