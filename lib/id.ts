import { ID_LENGTH } from "@/lib/constants";
import { toBase58 } from "@/util/base58";

export function generateId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  return toBase58(bytes);
}
