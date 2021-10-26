import express from "express";
import { Bank } from "../entities/Bank";
import { getRepository } from "typeorm";

const router = express.Router();

router.post("/api/bank", async (req, res) => {
  const { name } = req.body;

  const bankerRepository = getRepository(Bank);

  const newBank = bankerRepository.create({ name });

  await bankerRepository.insert(newBank);

  res.send(`${newBank.name} saved to db`);
});

export { router as createBankerRouter };
