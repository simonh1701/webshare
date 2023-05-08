import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/randomwords";

type Request = {
  encrypted: string;
  ttl: number;
  reads: number;
  iv: string;
  salt: string;
};

const redis = Redis.fromEnv();

export default async function handler(req: NextRequest) {
  const { encrypted, ttl, reads, iv, salt } = (await req.json()) as Request;

  const id = generate({ min: 1, max: 1, wordsPerString: 3, separator: "-" })[0];
  const key = ["webshare", id].join(":");

  const tx = redis.multi();

  tx.hset(key, {
    salt,
    iv,
    encrypted,
    remainingReads: reads >= 1 ? reads : 1,
  });

  tx.expire(key, ttl);

  await tx.exec();

  return NextResponse.json({ id });
}

export const config = {
  runtime: "edge",
};
