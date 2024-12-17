import { z } from 'zod';

export type CognitoConfig = {
    userPoolId: string;
    userPoolClientId: string;
};

export const VerifiedTokenContextSchema = z.object({
    email: z.string(),
    tokenType: z.string(),
    sub: z.string(),
    roles: z.string().optional(),
    name: z.string()
});

export type VerifiedTokenContext = z.infer<typeof VerifiedTokenContextSchema>;

export enum UserRole {
    ADMIN = 'admin'
}
