import { Request, Response, NextFunction, RequestHandler } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}


// import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next(); // Only call next if authenticated
};


export const jwtCheck = auth({
  audience: 'crm-api',
  issuerBaseURL: 'https://dev-nw4732a114m4rzix.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export const jwtParse: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded?.sub) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    const auth0Id = decoded.sub;
    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();

    next();
  } catch (err) {
    console.error("JWT Parse Error:", err);
    res.status(401).json({ message: "Unauthorized: Token parsing failed" });
  }
};