import path from "path";
import Piscina from "piscina";
import memoize from "p-memoize";
import { Tezos } from "../tez";

const pool = new Piscina({
  filename: path.resolve(__dirname, "worker.js"),
  maxQueue: "auto",
  concurrentTasksPerWorker: 1000,
});

export const loadBalance = memoize(fetchBalance, {
  cacheKey: ([account, assetSlug]) => `${account}_${assetSlug}`,
});

export function fetchBalance(
  account: string,
  assetSlug: string
): Promise<string> {
  return pool.run({ account, assetSlug }, { name: "fetchBalance" });
}

let latestBlockHash: string | undefined;
(async function cleanBalancesCacheAndDefer() {
  const blockHash = await Tezos.rpc.getBlockHash();
  if (latestBlockHash && blockHash !== latestBlockHash) {
    memoize.clear(loadBalance);
  }

  latestBlockHash = blockHash;
  setTimeout(cleanBalancesCacheAndDefer, 1_000);
})();
