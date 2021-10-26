import dotenv from "dotenv";
import express from "express";
import { createConnection, getRepository } from "typeorm";
import { Bank } from "./entities/Bank";
import { Client } from "./entities/Client";
import { createBankerRouter } from "./routes/createBanker";
import { createBankerClientConnection } from "./routes/createBankerClientConnection";
import { createClientRouter } from "./routes/createClient";
import { deleteClientRouter } from "./routes/deleteClient";

dotenv.config();

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/entities/*.ts`],
      synchronize: false,
    });
    console.log("Connected to Postgres");

    app.use(express.json());
    app.use(createClientRouter);
    app.use(deleteClientRouter);
    app.use(createBankerRouter);
    app.use(createBankerClientConnection);

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to Postgres");
  }
  const clientRepository = getRepository(Client);
  const bankerRepository = getRepository(Bank);

  console.log(await clientRepository.find());
  console.log(await bankerRepository.find());
  console.log(await clientRepository.query("SELECT * FROM client LIMIT 1"));
};

main();
