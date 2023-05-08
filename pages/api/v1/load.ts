import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "id param is missing" },
      { status: 400 }
    );
  }

  const key = ["webshare", id].join(":");

  const data = await redis.hgetall<{
    salt: string;
    iv: string;
    encrypted: string;
    remainingReads: number;
  }>(key);

  if (!data) {
    return NextResponse.json(
      { message: "Document not found - Check if id is correct" },
      { status: 404 }
    );
  }

  await redis.hincrby(key, "remainingReads", -1);

  if (data.remainingReads <= 1) {
    await redis.del(key);
  }

  return NextResponse.json({
    salt: data.salt,
    iv: data.iv,
    encrypted: data.encrypted,
    remainingReads: data.remainingReads - 1,
  });
}

export const config = {
  runtime: "edge",
};
