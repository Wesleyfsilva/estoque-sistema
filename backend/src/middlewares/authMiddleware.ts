import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import multer from "multer";

const storage = multer.memoryStorage(); // Armazena em memória (ou ajuste para salvar no disco)
export const upload = multer({ storage });


export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SUA_CHAVE_SECRETA") as JwtPayload;
    req.user = decoded; // Assumindo que você estendeu a interface Request
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};
