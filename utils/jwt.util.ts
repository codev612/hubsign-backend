import * as jwt from 'jsonwebtoken'; 

// Define the payload interface
export interface JWTPayload {
  random: string;
  timestamp: number;
}

// Ensure the environment variable is set
const secretKey: string = process.env.JWT_SECRET || 'jwt-secret-key-esign';

// if (!secretKey) {
//   throw new Error('JWT_SECRET environment variable is not set.');
// }

// Function to generate uid
export const generateJWTId = (): string => {
  const payload: JWTPayload = {
    random: Math.random().toString(5).substring(2), // Random string
    timestamp: Date.now(), // Timestamp for uniqueness
  };

  return jwt.sign(payload, secretKey);
};