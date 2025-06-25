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

  // Users API
  app.post("/api/users", async (req, res) => {
    try {
      const userData = req.body;
      
      // Validar datos requeridos
      if (!userData.nombres || !userData.apellidos || !userData.dni || !userData.celular || !userData.email || !userData.password) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      // Verificar si el usuario ya existe
      const existingUser = await storage.getUserByUsername(userData.dni);
      if (existingUser) {
        return res.status(409).json({ error: "Ya existe un usuario con este DNI" });
      }

      const user = await storage.createUser(userData);
      // No devolver la contraseña en la respuesta
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/api/users/:dni", async (req, res) => {
    try {
      const dni = req.params.dni;
      const user = await storage.getUserByUsername(dni);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      // No devolver la contraseña
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Block Requests API
  app.post("/api/block-requests", async (req, res) => {
    try {
      const { userDni, selectedProducts, priority = "normal", reason } = req.body;
      
      if (!userDni || !selectedProducts) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }

      const blockRequest = await storage.createBlockRequest({
        userId: userDni,
        selectedProducts: JSON.stringify(selectedProducts),
        status: "pending",
        requestType: "block",
        priority,
        reason
      });

      res.status(201).json(blockRequest);
    } catch (error) {
      console.error("Error creating block request:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/api/block-requests", async (req, res) => {
    try {
      const blockRequests = await storage.getBlockRequests();
      res.json(blockRequests);
    } catch (error) {
      console.error("Error getting block requests:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/api/block-requests/user/:dni", async (req, res) => {
    try {
      const dni = req.params.dni;
      const blockRequests = await storage.getBlockRequestsByUser(dni);
      res.json(blockRequests);
    } catch (error) {
      console.error("Error getting user block requests:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.patch("/api/block-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "Estado es requerido" });
      }

      const updatedRequest = await storage.updateBlockRequestStatus(id, status);
      if (!updatedRequest) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }

      res.json(updatedRequest);
    } catch (error) {
      console.error("Error updating block request status:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
