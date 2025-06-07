import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if email already exists
      const existingRegistration = await storage.getRegistrationByEmail(validatedData.email);
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "Email already registered. Please use a different email address." 
        });
      }

      const registration = await storage.createRegistration(validatedData);
      res.status(201).json({ 
        message: "Registration successful! We'll send you confirmation details soon.",
        registration: {
          id: registration.id,
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          registrationType: registration.registrationType
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid registration data",
          errors: error.errors 
        });
      }
      
      console.error("Registration error:", error);
      res.status(500).json({ 
        message: "Internal server error. Please try again later." 
      });
    }
  });

  // Get all registrations (for admin purposes)
  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Get registrations error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve registrations" 
      });
    }
  });

  // Get registration count
  app.get("/api/registrations/count", async (req, res) => {
    try {
      const registrations = await storage.getRegistrations();
      res.json({ 
        total: registrations.length,
        individual: registrations.filter(r => r.registrationType === 'individual').length,
        group: registrations.filter(r => r.registrationType === 'group').length
      });
    } catch (error) {
      console.error("Get registration count error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve registration count" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
