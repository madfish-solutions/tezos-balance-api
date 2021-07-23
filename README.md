# Tezos Balance API

This microservice is used to provide ultimately simple API for fetching tezos and token balances for account.

# Configuration

The service can accept the following `ENV` variables:

| Variable                   | Default                                                  | Description                                                  |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| `SERVER_PORT`              | `3000`                                                   | Expected server port                                         |
| `SERVER_HOST`              | `0.0.0.0`                                                | Expected server host                                         |
| `RPC_BASE_URL`             | `"https://mainnet-tezos.giganode.io/"`                   | RPC URL to be used                                           |
| `READ_ONLY_SIGNER_PK`      | `edpkvWbk81uh1DEvdWKR4g1bjyTGhdu1mDvznPUFE2zDwNsLXrEb9K` | Public key of account with balance used for dry-running      |
| `READ_ONLY_SIGNER_PK_HASH` | `tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A`                   | Public key hash of account with balance used for dry-running |

For default mainnet configuration, they might be left unchanged.

You can jsut copy `.env.example`:

```
cp .env.example .env
```

# API

The following endpoints are currently available:

- [GET] `/healthz`

```json
{ "message": "OK" }
```

- [POST] `/`, where `body` structure looks like:

### Request:

```json
{
  "account": "tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A",
  "assetSlugs": ["tez", "KT1WLerY6wbecTK9MjxTfkPvEQQ8HryPQrCM_0"]
}
```

- `account` is a tezos account address.
- `assetSlugs` is an array of asset slugs: `"tez"` for tezos, and `"{{token_contract_address}}_{{token_id}}"` for tokens. For FA1.2 tokens `token_id` must be `0`.

### Response:

```json
{
  "tez": "1000000",
  "KT1WLerY6wbecTK9MjxTfkPvEQQ8HryPQrCM_0": "333999000000"
}
```

# Running the service

- NodeJS and yarn:

```bash
yarn && yarn start
```

- Docker:

```bash
docker build -t tez-balance .
docker run -p 3000:3000 tez-balance
```
