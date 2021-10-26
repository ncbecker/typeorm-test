import express from "express";
import { BankClientRelation } from "../entities/BankClientRelation";
import { getRepository } from "typeorm";
import { Bank } from "../entities/Bank";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/bank/:bankId/client/:clientId", async (req, res) => {
  const { bankId, clientId } = req.params;

  const bankRepository = await getRepository(Bank);
  const clientRepository = await getRepository(Client);
  const bankClientRelationRepository = await getRepository(BankClientRelation);

  const bank = await bankRepository.findOne(bankId);
  const client = await clientRepository.findOne(clientId);

  if (!bank || !client) {
    return res.json({ error: "bank or client not found" });
  }

  const newRelation = bankClientRelationRepository.create({ bank, client });
  await bankClientRelationRepository.insert(newRelation);

  return res.json({ success: "Connection successful" });
});

export { router as createBankerClientConnection };
