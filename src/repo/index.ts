import levelRocksDB from "level-rocksdb";

import { DB_PATH } from "./defaults";

export const repo = levelRocksDB(DB_PATH, (err) => {
  if (err) throw err;
});
