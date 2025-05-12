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
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKENS_SIGNING_ALG || 'RS256'
});

// export const jwtParse: RequestHandler = async (req, res, next) => {
//   console.log("✅ Reached jwtParse");
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Unauthorized: Missing token" });
//     return;
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const decoded = jwt.decode(token) as jwt.JwtPayload;
//  console.log("Decoded JWT:", decoded);
//     if (!decoded?.sub) {
//       res.status(401).json({ message: "Unauthorized: Invalid token" });
//       return;
//     }

//     const auth0Id = decoded.sub;
//   let user = await User.findOne({ auth0Id });

// if (!user) {
//   // 🔥 Create user if not found
// user = await User.create({
//   auth0Id,
//   email: decoded.email || `${auth0Id}@noemail.auth0`, // ensures uniqueness
//   name: decoded.name || "New User",
// });


//   console.log("👤 Created new user:", user);
// }

//     req.auth0Id = auth0Id;
//     req.userId = user._id.toString();

//     next();
//   } catch (err) {
//     console.error("JWT Parse Error:", err);
//     res.status(401).json({ message: "Unauthorized: Token parsing failed" });
//   }
// };

export const jwtParse: RequestHandler = async (req, res, next) => {
  console.log("✅ Reached jwtParse");
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    console.log("Decoded JWT:", decoded);

    if (!decoded?.sub) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    const auth0Id = decoded.sub;
    const email = decoded["email"]; // ✅ pulled from custom claim
    const name = decoded["name"];   // ✅ pulled from custom claim

    let user = await User.findOne({ auth0Id });

    if (!user) {
      // ✅ Ensure email uniqueness, fallback if missing (but unlikely now)
      const safeEmail = email || `${auth0Id}@noemail.auth0`;
      const safeName = name || "New User";

      user = await User.create({
        auth0Id,
        email: safeEmail,
        name: safeName,
      });

      console.log("👤 Created new user:", user);
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();

    next();
  } catch (err) {
    console.error("JWT Parse Error:", err);
    res.status(401).json({ message: "Unauthorized: Token parsing failed" });
  }
};



