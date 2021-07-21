import memoize from "p-memoize";

import { Asset, loadContract } from "../tez";

export const toAsset = memoize(async (assetSlug: string): Promise<Asset> => {
  // For tezos
  if (assetSlug === "tez") return assetSlug;

  // For token
  const [tokenContractAddress, tokenIdStr = "0"] = assetSlug.split("_");
  const tokenContract = await loadContract(tokenContractAddress);

  return {
    contract: tokenContractAddress,
    ...(tokenContract.methods.update_operators ? { id: +tokenIdStr } : {}),
  };
});
