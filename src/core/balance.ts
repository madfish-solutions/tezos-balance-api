import BigNumber from "bignumber.js";
import retry from "async-retry";

import { Tezos, loadContract, isFA2Token } from "../tez";
import { toAsset } from "./helpers";

export async function fetchBalance(account: string, assetSlug: string) {
  const asset = await toAsset(assetSlug);

  let nat: BigNumber | undefined;

  if (asset === "tez") {
    nat = await retry(() => Tezos.tz.getBalance(account), { retries: 5 });
  } else {
    const contract = await loadContract(asset.contract);

    if (isFA2Token(asset)) {
      try {
        const response = await retry(
          () =>
            contract.views
              .balance_of([{ owner: account, token_id: asset.id }])
              .read(),
          { retries: 5 }
        );
        nat = response[0].balance;
      } catch {}
    } else {
      try {
        nat = await retry(() => contract.views.getBalance(account).read(), {
          retries: 5,
        });
      } catch {}
    }

    if (!nat || nat.isNaN()) {
      nat = new BigNumber(0);
    }
  }

  return nat.toFixed();
}
