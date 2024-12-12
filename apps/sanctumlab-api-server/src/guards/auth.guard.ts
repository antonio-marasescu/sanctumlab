import { NextFunction, Response } from 'express';
import {
    AuthVerifierApiInstance,
    VerifiedTokenContext
} from '@sanctumlab/be/auth';
import { AuthenticatedRequest } from '../types/request.types';
import { JsonObject } from 'aws-jwt-verify/safe-json-parse';

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
    const token = authHeader?.split(' ')[1];
    if (!token) {
        console.error('Token not found');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const verifiedToken = await AuthVerifierApiInstance.authorize(token, {
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolClientId: COGNITO_CLIENT_ID
    });

    if (!verifiedToken) {
        console.error('Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const additionalContext: VerifiedTokenContext = {
        tokenType: verifiedToken.token_use,
        sub: verifiedToken.sub,
        name: (verifiedToken as JsonObject)['name'] as string,
        roles: verifiedToken['cognito:groups']?.toString(),
        email: (verifiedToken as JsonObject)['email'] as string
    };

    req.userContext = additionalContext;
    next();
}

export default authGuard;
