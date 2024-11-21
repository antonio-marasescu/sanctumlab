import { Request } from 'express';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export type AuthenticatedRequest = Request & { user: CognitoIdTokenPayload };
