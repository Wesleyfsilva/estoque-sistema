import { JwtPayload } from "jsonwebtoken"; // Opcional, se usar JWT para autenticação

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Adicione o tipo apropriado para `user`
    }
  }
}
