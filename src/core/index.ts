import { loadBalance } from "./pool";

export function fetchAllBalances(account: string, assetSlugs: string[]) {
  return Promise.all(
    assetSlugs.map((assetSlug) => loadBalance(account, assetSlug))
  );
}
