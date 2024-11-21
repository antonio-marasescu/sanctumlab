import * as cdk from 'aws-cdk-lib';

export const LAMBDA_HANDLER_NAME = 'main';
export const API_LAMBDA_TIMEOUT = cdk.Duration.minutes(2);

export const DEFAULT_LAMBDA_CODE = `
export const ${LAMBDA_HANDLER_NAME} = async (event) => {
    return {
        statusCode: 404,
        headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers':
                  'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
              'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            message: "Resource not found"
        })
    };
};
`;
