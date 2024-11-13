import { configDotenv } from 'dotenv';
import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

configDotenv();

const cognitoUserPoolId = process.env.COGNITO_USER_POOL_ID;
const cognitoUsername = process.env.COGNITO_GUEST_USERNAME;

const argv = yargs(hideBin(process.argv))
    .option('password', {
        alias: 'p',
        type: 'string',
        description: 'Password to be used for the Cognito user'
    })
    .option('length', {
        alias: 'l',
        type: 'number',
        default: 6,
        description: 'Length of the password if generated'
    })
    .help().argv;

function generateRandomPassword(length = 12) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
        ''
    );
}

function generateAccessCode() {
    if (!cognitoUserPoolId) {
        console.error('User Pool Id is missing from environment variables');
        process.exit(1);
    }
    if (!cognitoUsername) {
        console.error('Guest username is missing from environment variables');
        process.exit(1);
    }

    const password = argv.password || generateRandomPassword(argv.length);
    try {
        execSync(`aws cognito-idp admin-set-user-password \
        --user-pool-id ${cognitoUserPoolId} \
        --username  ${cognitoUsername} \
        --password ${password} \
        --permanent`);
        console.log(
            'Access code generated successfully. Access Code: ',
            password
        );
    } catch (error) {
        console.error('Failed to generate access code:', error);
        process.exit(1);
    }
}

generateAccessCode();
