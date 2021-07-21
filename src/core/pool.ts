import { spawn, Pool, Worker, ModuleThread } from "threads";
import memoize from "p-memoize";

type Balance = typeof import("./balance");

const spawnWorker = () => spawn<Balance>(new Worker("./worker"));
const pool = Pool(spawnWorker, { concurrency: 4 });

export const loadBalance = memoize(fetchBalance, {
  cacheKey: ([account, assetSlug]) => `${account}_${assetSlug}`,
  maxAge: 60_000,
});

export function fetchBalance(account: string, assetSlug: string) {
  return enqueue((b) => b.fetchBalance(account, assetSlug));
}

async function enqueue<T>(factory: (w: ModuleThread<Balance>) => Promise<T>) {
  const result = await pool.queue(factory);
  return result as T;
}
