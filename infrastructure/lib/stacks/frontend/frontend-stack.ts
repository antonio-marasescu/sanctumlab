import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {
    CLOUDFRONT_DISTRIBUTION_ID,
    ORIGIN_ACCESS_IDENTITY_ID,
    WEBSITE_BUCKET_ID
} from './config/frontend.config';
import {
    Distribution,
    OriginAccessIdentity,
    ViewerProtocolPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

export function createFrontendStack(
    stack: cdk.Stack,
    props: InfrastructureStackProps
): Distribution {
    const websiteBucket = new Bucket(stack, WEBSITE_BUCKET_ID(props), {
        publicReadAccess: false,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true
    });

    const originAccessIdentity = new OriginAccessIdentity(
        stack,
        ORIGIN_ACCESS_IDENTITY_ID(props)
    );
    websiteBucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(
        stack,
        CLOUDFRONT_DISTRIBUTION_ID(props),
        {
            defaultBehavior: {
                origin: new S3Origin(websiteBucket, { originAccessIdentity }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            },
            errorResponses: [
                {
                    httpStatus: 404,
                    responsePagePath: '/index.html',
                    responseHttpStatus: 200
                }
            ],
            defaultRootObject: 'index.html',
            comment: `${props.stackConfig.appName} website cloudfront distribution ${props.stackConfig.tenantEnv}`
        }
    );

    createFrontendOutputs(stack, { distribution, websiteBucket });

    return distribution;
}

function createFrontendOutputs(
    stack: cdk.Stack,
    deps: { distribution: Distribution; websiteBucket: Bucket }
): void {
    new cdk.CfnOutput(stack, 'DistributionDomainName', {
        value: deps.distribution.distributionDomainName,
        description: 'The Distribution Domain Name'
    });

    new cdk.CfnOutput(stack, 'WebsiteBucketName', {
        value: deps.websiteBucket.bucketName,
        description: 'The Website Bucket Name'
    });
}
