import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class RustAwsLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaName = 'rs_hello';
    const target = 'x86_64-unknown-linux-musl';

    const rsHello = new lambda.Function(this, 'RustAwsLambda', {
      functionName: lambdaName,
      handler: 'main',
      runtime: lambda.Runtime.PROVIDED_AL2,
      code: lambda.Code.fromAsset(`lambda/${lambdaName}`, {
        bundling: {
          command: [
            'bash', '-c',
            `rustup target add ${target} && cargo build --release --target ${target} && cp target/${target}/release/${lambdaName} /asset-output/bootstrap`
          ],
          image: cdk.DockerImage.fromRegistry('rust:1.56-slim')
        }
      }),

    });

    const gw = new apigw.LambdaRestApi(this, `${lambdaName}_endpoint`, {
      handler: rsHello
    });
  }
}
