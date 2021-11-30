# Example of AWS Lambda with API gateway using RUST

Simple AWS Lambda with API gateway built in Rust using CDK CLI TypeScript client.


Lambda ( [rs_hello](lambda/rs_hello)) is located in the lambda folder an it's just a simple hello world that will display Hello + name. It uses the oficial [lambda_runtime](https://crates.io/crates/lambda_runtime) package from AWS but also [aws_lambda_events
](https://crates.io/crates/aws_lambda_events) that provides strongly-typed AWS Lambda event structs for Rust.

Lambda and ApiGateway specs for CDK are defined in [lib](lib)


