import { NextFunction, Response } from 'express';
import { AuthVerifierApiInstance } from '@sanctumlab/be/auth';
import { AuthenticatedRequest } from '../types/request.types';

const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

async function authGuard(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.error('Header not found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.error('Token not found');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const verifiedToken = await AuthVerifierApiInstance.authorize(token, {
        userPoolId: COGNITO_USER_POOL_ID as string,
        userPoolClientId: COGNITO_CLIENT_ID as string
    });

    if (!verifiedToken) {
        console.error('Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = verifiedToken;
    next();
}

export default authGuard;
