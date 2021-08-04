import assert from "assert";
import express from "express";
import mem from "mem";
import { BadRequest } from "http-errors";

import { fetchAllBalances } from "../core";
import { isTezAddressValid, isAssetSlugValid } from "../tez";

export const routes = express.Router();

routes.get("/healthz", async (_req, res) => {
  res.send({ message: "OK" }).status(200);
});

type GetBalancesBody = {
  account: string;
  assetSlugs: string[];
};

routes.post("/", async (req, res) => {
  const { account, assetSlugs }: GetBalancesBody = req.body;

  validateAccount(account);
  for (const slug of assetSlugs) validateAssetSlug(slug);

  const balances = await fetchAllBalances(account, assetSlugs);
  res.json(balances);
});

const validateAccount = mem((address: string) => {
  assert(isTezAddressValid(address), new BadRequest("Invalid account address"));
});

const validateAssetSlug = mem((slug: string) => {
  assert(isAssetSlugValid(slug), new BadRequest("Invalid asset slug"));
});
