import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WeddingApiCdkStack } from '../lib/wedding-api-cdk-stack';

const app = new cdk.App();
new WeddingApiCdkStack(app, 'WeddingCdkStack', {
  env: { account: '194722405234', region: 'eu-west-2' },
});