import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  console.error('Missing environment variable: FIREBASE_SERVICE_ACCOUNT_BASE64');
  console.error('Current environment variables:', Object.keys(process.env));
  throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set');
}

// 從環境變數讀取 Firebase 憑證
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString()
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

console.log('Environment variables:', {
  FIREBASE_SERVICE_ACCOUNT_BASE64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ? 'exists' : 'not found'
});

console.log('Firebase admin initialization status:', admin.apps.length ? 'Initialized' : 'Not initialized');

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.log('Auth middleware triggered');
  console.log('Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
  
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};