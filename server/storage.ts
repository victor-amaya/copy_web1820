import { users, entidadFinanciera, type User, type InsertUser, type EntidadFinanciera, type InsertEntidadFinanciera } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getEntidadesFinancieras(): Promise<EntidadFinanciera[]>;
  getEntidadFinanciera(id: number): Promise<EntidadFinanciera | undefined>;
  createEntidadFinanciera(entidad: InsertEntidadFinanciera): Promise<EntidadFinanciera>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private entidades: Map<number, EntidadFinanciera>;
  currentUserId: number;
  currentEntidadId: number;

  constructor() {
    this.users = new Map();
    this.entidades = new Map();
    this.currentUserId = 1;
    this.currentEntidadId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.dni === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      fechaNacimiento: insertUser.fechaNacimiento || null,
      aceptaDatos: insertUser.aceptaDatos || false,
      aceptaAnuncios: insertUser.aceptaAnuncios || false
    };
    this.users.set(id, user);
    return user;
  }

  async getEntidadesFinancieras(): Promise<EntidadFinanciera[]> {
    return Array.from(this.entidades.values()).filter(e => e.activo);
  }

  async getEntidadFinanciera(id: number): Promise<EntidadFinanciera | undefined> {
    return this.entidades.get(id);
  }

  async createEntidadFinanciera(insertEntidad: InsertEntidadFinanciera): Promise<EntidadFinanciera> {
    const id = this.currentEntidadId++;
    const entidad: EntidadFinanciera = {
      ...insertEntidad,
      id,
      createdAt: new Date(),
      activo: insertEntidad.activo ?? true
    };
    this.entidades.set(id, entidad);
    return entidad;
  }
}

export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.dni, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getEntidadesFinancieras(): Promise<EntidadFinanciera[]> {
    return await db.select().from(entidadFinanciera).where(eq(entidadFinanciera.activo, true));
  }

  async getEntidadFinanciera(id: number): Promise<EntidadFinanciera | undefined> {
    const result = await db.select().from(entidadFinanciera).where(eq(entidadFinanciera.id, id));
    return result[0];
  }

  async createEntidadFinanciera(insertEntidad: InsertEntidadFinanciera): Promise<EntidadFinanciera> {
    const result = await db.insert(entidadFinanciera).values(insertEntidad).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
