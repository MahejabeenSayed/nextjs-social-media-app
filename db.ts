import { loadEnvConfig } from "@next/env";
import { Client } from "pg";

export async function dbClient() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DB,
    port: parseInt(process.env.PORT!),
  });
  return client;
}

