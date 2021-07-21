import { assertEnv } from "../system/env";

assertEnv("RPC_BASE_URL");

export const RPC_BASE_URL = process.env.RPC_BASE_URL!;

assertEnv("READ_ONLY_SIGNER_PK");
assertEnv("READ_ONLY_SIGNER_PK_HASH");

export const READ_ONLY_SIGNER_PK = process.env.READ_ONLY_SIGNER_PK!;
export const READ_ONLY_SIGNER_PK_HASH = process.env.READ_ONLY_SIGNER_PK_HASH!;
