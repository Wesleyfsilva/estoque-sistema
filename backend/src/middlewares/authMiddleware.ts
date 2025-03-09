import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    console.log("Cabeçalho Authorization recebido:", authHeader);

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            console.error("Erro ao verificar token:", err);
            res.status(403).json({ error: 'Token inválido' });
            return;
        }
        console.log("Token verificado com sucesso:", decoded);
        next();
    });
};
