import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Entidades Financieras API
  app.get("/api/entidades-financieras", async (req, res) => {
    try {
      const entidades = await storage.getEntidadesFinancieras();
      res.json(entidades);
    } catch (error) {
      console.error("Error getting entidades financieras:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/api/entidades-financieras/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entidad = await storage.getEntidadFinanciera(id);
      if (!entidad) {
        return res.status(404).json({ error: "Entidad financiera no encontrada" });
      }
      res.json(entidad);
    } catch (error) {
      console.error("Error getting entidad financiera:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.post("/api/entidades-financieras", async (req, res) => {
    try {
      const entidad = await storage.createEntidadFinanciera(req.body);
      res.status(201).json(entidad);
    } catch (error) {
      console.error("Error creating entidad financiera:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
