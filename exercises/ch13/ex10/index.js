import { readdir, stat } from "fs/promises";
import { join } from "path";

export async function fetchSumOfFileSizes(path) {
  const files = await readdir(path);
  const statsPromises = files.map((file) => stat(join(path, file)));
  const statsArray = await Promise.all(statsPromises);
  const total = statsArray.reduce((acc, stats) => acc + stats.size, 0);

  return total;
}
