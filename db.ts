import { loadEnvConfig } from "@next/env";
import { Client, QueryResult } from "pg";

export async function dbClient(): Promise<Client> {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  if (process.env.POSTGRES_URL) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
    });

    return client;
  }
  const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DB,
    port: 5432,
  });

  return client;
}

export async function sql(
  query: string,
  values?: Array<any>
): Promise<QueryResult<any>> {
  const client = await dbClient();

  await client.connect();

  const res = await client.query(query, values);

  await client.end();

  return res;
}
