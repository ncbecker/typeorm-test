import express from "express";
import { getRepository } from "typeorm";
import { Client } from "../entities/Client";

const router = express.Router();

router.delete("/api/client/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const clientRepository = await getRepository(Client);
  const client = await clientRepository.findOne(parseInt(clientId));

  const response = await clientRepository.delete(parseInt(clientId));

  return res.json(response);
});

export { router as deleteClientRouter };
