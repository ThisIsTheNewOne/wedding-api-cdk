import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class WeddingApiCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda for GraphQL
    const graphqlLambda = new lambda.Function(this, 'GraphqlLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'graphql-lambda.handler',
      code: lambda.Code.fromAsset('lib'),  // Path to your compiled Lambda
    });

    // API Gateway
    const api = new apigateway.LambdaRestApi(this, 'GraphqlApiGateway', {
      handler: graphqlLambda,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,  // Allow all for now; restrict to localhost or production later
        allowMethods: ['POST'],                     // Allow only POST
        allowHeaders: ['Content-Type'],             // Allow necessary headers
      },
    });

    // Define Resource and Methods
    const graphql = api.root.addResource('graphql');
    graphql.addMethod('POST');
    graphql.addMethod('GET');

    new cdk.CfnOutput(this, 'GraphqlApiEndpoint', {
      value: api.url ?? 'Something went wrong with API deployment',
      description: 'GraphQL API Gateway endpoint',
    });
  }
}