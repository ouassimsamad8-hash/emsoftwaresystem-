import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  language: text("language").notNull().default('en'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Appointment bookings
export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  consultationType: text("consultation_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  projectDescription: text("project_description").notNull(),
  language: text("language").notNull().default('en'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  projectDescription: z.string().min(20, "Please provide more details about your project"),
  consultationType: z.enum(['discovery', 'quote', 'consultation']),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Content types for bilingual content
export interface Translation {
  en: string;
  fr: string;
}

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: Translation;
  shortDescription: Translation;
  fullDescription: Translation;
  features: Translation[];
  benefits: Translation[];
}

export interface Project {
  id: string;
  slug: string;
  title: Translation;
  category: string;
  categoryLabel: Translation;
  description: Translation;
  image: string;
  technologies: string[];
  challenge: Translation;
  solution: Translation;
  results: Translation[];
  screenshots: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Translation;
  excerpt: Translation;
  content: Translation;
  category: string;
  categoryLabel: Translation;
  image: string;
  author: string;
  authorAvatar: string;
  readTime: number;
  publishedDate: string;
}

export interface FAQ {
  id: string;
  category: string;
  categoryLabel: Translation;
  question: Translation;
  answer: Translation;
}
