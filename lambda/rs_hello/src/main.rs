use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
use serde::{Deserialize, Serialize};
use simple_logger::SimpleLogger;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();

    let func = handler_fn(rs_hello);
    lambda_runtime::run(func).await?;
    Ok(())
}

#[derive(Deserialize)]
struct Request {
    name: String,
}

#[derive(Serialize)]
struct Response {
    req_id: String,
    msg: String,
}

async fn rs_hello(event: Request, ctx: Context) -> Result<Response, Error> {
    let name = event.name;
    Ok(Response {
        req_id: ctx.request_id,
        msg: format!("Hello {}!", name),
    })
}
