import { Request } from 'express';
import { VerifiedTokenContext } from '@sanctumlab/be/auth';

export type AuthenticatedRequest = Request & {
    userContext: VerifiedTokenContext;
};
