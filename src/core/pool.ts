import path from "path";
import Piscina from "piscina";
import memoize from "p-memoize";

const pool = new Piscina({
  filename: path.resolve(__dirname, "worker.js"),
  maxQueue: "auto",
  concurrentTasksPerWorker: 1000,
});

export const loadBalance = memoize(fetchBalance, {
  cacheKey: ([account, assetSlug]) => `${account}_${assetSlug}`,
  maxAge: 60_000,
});

export function fetchBalance(
  account: string,
  assetSlug: string
): Promise<string> {
  return pool.run({ account, assetSlug }, { name: "fetchBalance" });
}
