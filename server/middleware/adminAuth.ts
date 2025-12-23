/**
 * Admin Authentication Middleware
 * Protège les routes /api/admin/* avec JWT
 */

import type { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// jsonwebtoken ships as CommonJS; normalize to support ESM import
const jwtModule = jwt as unknown as typeof import('jsonwebtoken') & {
  default?: typeof import('jsonwebtoken');
};
const jwtLib = jwtModule.default ?? jwtModule;

const env = process.env.NODE_ENV ?? 'development';

function requireEnv(name: 'JWT_SECRET' | 'ADMIN_USERNAME' | 'ADMIN_PASSWORD') {
  const value = process.env[name];
  if (!value && env === 'production') {
    throw new Error(`${name} must be set in production`);
  }
  return value;
}

const JWT_SECRET = requireEnv('JWT_SECRET') || 'dev-secret-change-me';
const ADMIN_USERNAME = requireEnv('ADMIN_USERNAME') || 'ouassim';
const ADMIN_PASSWORD = requireEnv('ADMIN_PASSWORD') || 'ouassim';

export interface AdminUser {
  username: string;
  role: 'admin';
}

// Extend Express Request to include admin user
declare global {
  namespace Express {
    interface Request {
      admin?: AdminUser;
    }
  }
}

/**
 * Middleware: Vérifie le token JWT dans les headers
 */
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'No token provided' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    const decoded = jwtLib.verify(token, JWT_SECRET) as AdminUser;
    req.admin = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwtLib.JsonWebTokenError) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Invalid token' 
      });
    }
    if (error instanceof jwtLib.TokenExpiredError) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Token expired' 
      });
    }
    return res.status(500).json({ 
      error: 'Internal error', 
      message: 'Authentication failed' 
    });
  }
}

/**
 * Vérifie les credentials admin (username/password)
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Génère un JWT token pour l'admin
 */
export function generateAdminToken(username: string): string {
  const payload: AdminUser = {
    username,
    role: 'admin',
  };

  return jwtLib.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token valide 7 jours
  });
}

/**
 * Vérifie un token sans middleware (pour route /verify)
 */
export function verifyAdminToken(token: string): AdminUser | null {
  try {
    return jwtLib.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}
