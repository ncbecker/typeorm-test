import express from "express";
import { getRepository } from "typeorm";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  const { name } = req.body;

  const clientRepository = getRepository(Client);

  const client = new Client(name);

  await clientRepository.insert(client);

  res.send(`${client.name} saved to db`);
});

export { router as createClientRouter };
