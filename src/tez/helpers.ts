import { ValidationResult, validateAddress } from "@taquito/utils";
import { Signer } from "@taquito/taquito";

import { Asset, Token, FA2Token } from "./types";

export function toAssetSlug(asset: Asset) {
  return isTezAsset(asset) ? asset : toTokenSlug(asset.contract, asset.id);
}

export function toTokenSlug(contract: string, id = 0) {
  return `${contract}_${id}`;
}

export function isTezAddressValid(address: string) {
  return validateAddress(address) === ValidationResult.VALID;
}

export function isFA2Token(token: Token): token is FA2Token {
  return typeof token.id !== "undefined";
}

export function isTezAsset(asset: Asset): asset is "tez" {
  return asset === "tez";
}

export function isTokenAsset(asset: Asset): asset is Token {
  return asset !== "tez";
}

export class ReadOnlySigner implements Signer {
  constructor(private pkh: string, private pk: string) {}

  async publicKeyHash() {
    return this.pkh;
  }
  async publicKey() {
    return this.pk;
  }
  async secretKey(): Promise<string> {
    throw new Error("Secret key cannot be exposed");
  }
  async sign(): Promise<{
    bytes: string;
    sig: string;
    prefixSig: string;
    sbytes: string;
  }> {
    throw new Error("Cannot sign");
  }
}
