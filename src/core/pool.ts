// import path from "path";
// import Piscina from "piscina";
import memoize from "p-memoize";
import { Tezos } from "../tez";

import { fetchBalance as fetchBalancePure } from "./balance";

// const pool = new Piscina({
//   filename: path.resolve(__dirname, "worker.js"),
//   maxQueue: "auto",
//   concurrentTasksPerWorker: 100000,
// });

export const loadBalance = async (account: string, assetSlug: string) => {
  const blockHash = await Tezos.rpc.getBlockHash();
  return loadBalancePure(account, assetSlug, blockHash);
};

export const loadBalancePure = memoize(fetchBalance, {
  cacheKey: ([account, assetSlug, blockHash]) =>
    `${account}_${assetSlug}_${blockHash}`,
  maxAge: 60_000,
});

export function fetchBalance(
  account: string,
  assetSlug: string,
  _blockHash: string
): Promise<string> {
  return fetchBalancePure({ account, assetSlug });
  // return pool.run({ account, assetSlug }, { name: "fetchBalance" });
}
