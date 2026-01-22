import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { AdminUser } from './db-schemas';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(user: AdminUser): string {
    const payload: JWTPayload = {
      userId: user._id!,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
      issuer: 'webbuddies',
    });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  static extractTokenFromRequest(request: NextRequest): string | null {
    // Check Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check cookies
    const tokenCookie = request.cookies.get('auth-token');
    if (tokenCookie) {
      return tokenCookie.value;
    }

    return null;
  }

  static async authenticateRequest(request: NextRequest): Promise<JWTPayload | null> {
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      return null;
    }

    return this.verifyToken(token);
  }

  static requireAuth(handler: (request: NextRequest, user: JWTPayload) => Promise<Response>) {
    return async (request: NextRequest): Promise<Response> => {
      const user = await this.authenticateRequest(request);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Authentication required' }),
          { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return handler(request, user);
    };
  }

  static requireRole(role: string, handler: (request: NextRequest, user: JWTPayload) => Promise<Response>) {
    return this.requireAuth(async (request: NextRequest, user: JWTPayload) => {
      if (user.role !== role && user.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'Insufficient permissions' }),
          { 
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return handler(request, user);
    });
  }
}

// Utility function to create auth cookies
export function createAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return `auth-token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`;
}

// Utility function to clear auth cookies
export function clearAuthCookie(): string {
  return 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict';
}