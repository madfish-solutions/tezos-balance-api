import { loadBalance } from "./pool";

export async function fetchAllBalances(account: string, assetSlugs: string[]) {
  const balances: Record<string, string> = {};
  await Promise.all(
    assetSlugs.map(async (assetSlug) => {
      const balance = await loadBalance(account, assetSlug);
      balances[assetSlug] = balance;
    })
  );
  return balances;
}
