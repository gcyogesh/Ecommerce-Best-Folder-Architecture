// types.d.ts or wherever you define types in your project
import { Request } from "express";
import UserModel from "../models/UserSchema"; // Adjust path based on your actual model

// Extend the existing Request type to include a user property
interface AuthRequest extends Request {
    user?: UserModel; // Adjust UserModel to match your actual user model
}
