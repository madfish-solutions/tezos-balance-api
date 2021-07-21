import express from "express";

import { fetchAllBalances } from "../core";

export const routes = express.Router();

routes.get("/healthz", async (_req, res) => {
  res.send({ message: "OK" }).status(200);
});

type GetBalancesBody = {
  account: string;
  assetSlugs: string[];
};

routes.post("/balances", async (req, res) => {
  const { account, assetSlugs }: GetBalancesBody = req.body;

  const balances = await fetchAllBalances(account, assetSlugs);
  res.json(balances);
});
