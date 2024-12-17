import { AuthorizationType, TokenAuthorizer } from 'aws-cdk-lib/aws-apigateway';

export type ApiRestResourceConfig = {
    [resource: string]: {
        methods: string[];
        subResources?: ApiRestResourceConfig;
    };
};
