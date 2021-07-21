declare module "level-rocksdb" {
  import type { LevelUp } from "levelup";
  export default function LevelRocksDB(
    location: string,
    callback?: (err?: any) => void
  ): LevelUp;
}
