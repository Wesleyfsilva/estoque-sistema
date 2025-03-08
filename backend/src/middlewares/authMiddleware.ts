import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Acesso negado' });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET || 'secrettoken';
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto `req`
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        res.status(401).json({ error: 'Token inválido ou expirado' });
        return;
    }
};
