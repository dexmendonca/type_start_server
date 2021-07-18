import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
export const isLoggedMiddleware = async (req:Request, res:Response, next:NextFunction) => {
	let blocked = true;
	if (req.headers.authorization) {
		const token = ((req.headers.authorization).split(' '))[1] || '';
		if (await jwt.verify(token)) {
			blocked = false;
		}
	}
	if (blocked) {
		res.status(401).json({ msg: 'Token inexistente, inválido ou expirado' });
	} else {
		next();
	}
};
