export type CognitoConfig = {
    userPoolId: string;
    userPoolClientId: string;
};

export type VerifiedTokenContext = {
    email: string;
    tokenType: string;
    sub: string;
    roles: string;
    name: string;
};
