import { connectToDb } from "./connection.js";
import { cli } from "./Cli.js";

async function bootstrap() {
  await connectToDb();
  cli.runCli();
}

bootstrap();

