import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

// Simple admin authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ error: "Authentication required" });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const env = process.env.NODE_ENV ?? 'development';
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (env === 'production' && (!adminUser || !adminPass)) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in production');
  }

  const resolvedUser = adminUser || 'ouassim';
  const resolvedPass = adminPass || 'ouassim';

  if (username === resolvedUser && password === resolvedPass) {
    next();
  } else {
    res.status(403).json({ error: "Invalid credentials" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes) - PROTECTED
  app.get("/api/contacts", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Appointment booking
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to book appointment" });
      }
    }
  });

  // Get all appointments (for admin purposes) - PROTECTED
  app.get("/api/appointments", requireAdmin, async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
