"use client";

import { useState } from "react";
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

import { HistoryEntry } from "@/app/history/page";
import Message from "@/components/message";
import { MessageType } from "@/components/message";
import TextCopy from "@/components/textcopy";
import { encrypt } from "@/lib/encryption";
import cn from "@/util/classnames";
import { toBase58 } from "@/util/base58";

export default function Share() {
  const [passphrase, setPassphrase] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [reads, setReads] = useState<number>(3);
  const [ttl, setTtl] = useState<number>(10);
  const [ttlMultiplier, setTtlMultiplier] = useState<number>(60);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [id, setId] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setError("");
      setLink("");
      setLoading(true);

      const { salt, iv, encrypted } = await encrypt(passphrase, text);

      const { id } = (await fetch("/api/v1/store", {
        method: "POST",
        body: JSON.stringify({
          salt: toBase58(salt),
          iv: toBase58(iv),
          encrypted: toBase58(encrypted),
          reads,
          ttl: ttl * ttlMultiplier,
        }),
      })
        .then((r) => r.json())
        .catch((e) => setError((e as Error).message))) as { id: string };

      const url = new URL(window.location.href);
      url.pathname = "/load";
      url.hash = id;

      const history = JSON.parse(
        sessionStorage.getItem("history") ?? "[]"
      ) as Array<HistoryEntry>;

      const newHistoryEntry: HistoryEntry = {
        id: self.crypto.randomUUID(),
        documentId: id,
        operation: "Shared",
        date: new Date(),
        additionalInfo: `Document expires at ${new Date(
          new Date().getTime() + ttl * ttlMultiplier * 1000
        ).toUTCString()}`,
      };

      history.push(newHistoryEntry);

      sessionStorage.setItem("history", JSON.stringify(history));

      setCopiedId(false);
      setCopiedLink(false);
      setId(id);
      setLink(url.toString());
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-16">
      <h1 className="tracking-tigh mb-6 text-3xl font-bold sm:text-4xl">
        Encrypt and Share
      </h1>
      {error && <Message message={error} type={MessageType.Error} />}
      <div className="mt-2">
        {link ? (
          <>
            <Message
              message="Your document was sucessfully encrypted and stored"
              type={MessageType.Success}
            />
            <h2 className="mb-2 mt-4 text-lg font-semibold leading-6">
              Document ID
            </h2>
            <TextCopy
              text={id}
              copied={copiedId}
              setCopied={setCopiedId}
              icon={
                <DocumentTextIcon
                  className="h-5 w-5 text-neutral-50/50"
                  aria-hidden="true"
                />
              }
            />
            <h2 className="mb-2 mt-4 text-lg font-semibold leading-6">
              Share with others
            </h2>
            <TextCopy
              text={link}
              copied={copiedLink}
              setCopied={setCopiedLink}
              icon={
                <LinkIcon
                  className="h-5 w-5 text-neutral-50/50"
                  aria-hidden="true"
                />
              }
            />
          </>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (text.length <= 0) return;
                onSubmit();
              }}
            >
              <div>
                <label htmlFor="text" className="sr-only">
                  Text
                </label>
                <textarea
                  id="text"
                  name="text"
                  rows={10}
                  value={text}
                  minLength={1}
                  placeholder="Enter the text you want to share and press the button below."
                  onChange={(e) => {
                    const LIMIT = 50_000;
                    const text = e.target.value;

                    if (text && text.length > LIMIT) {
                      setError(
                        `Character limit exceeded. Limit: ${LIMIT}. Current: ${text.length}`
                      );
                    } else {
                      setError("");
                    }

                    setText(e.target.value);
                  }}
                  required={true}
                  className="mb-4 block max-h-[80vh] min-h-[120px] w-full appearance-none whitespace-nowrap border-0 bg-transparent font-mono text-sm ring-1 ring-inset ring-neutral-50/50 placeholder:text-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-full">
                  <label
                    htmlFor="reads"
                    className="mb-2 block font-medium leading-6 text-white"
                  >
                    Reads
                  </label>
                  <input
                    id="reads"
                    name="reads"
                    type="number"
                    value={reads}
                    min={1}
                    max={10}
                    onChange={(e) => setReads(e.target.valueAsNumber)}
                    required={true}
                    className="mb-4 block w-full appearance-none border-0 bg-transparent py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="ttl"
                    className="mb-2 block font-medium leading-6 text-white"
                  >
                    Time To Live
                  </label>
                  <div className="relative">
                    <input
                      id="ttl"
                      name="ttl"
                      type="number"
                      value={ttl}
                      min={1}
                      max={60}
                      onChange={(e) => setTtl(e.target.valueAsNumber)}
                      required={true}
                      className="mb-4 block w-full appearance-none border-0 bg-transparent py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="ttlMultiplier" className="sr-only">
                        TTL Multiplier
                      </label>
                      <select
                        id="ttlMultiplier"
                        name="ttlMultiplier"
                        defaultValue={60}
                        onChange={(e) =>
                          setTtlMultiplier(parseInt(e.target.value))
                        }
                        required={true}
                        className="h-full border-0 bg-transparent py-0 pl-2 text-right text-sm text-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm md:text-base"
                      >
                        <option value={60}>
                          {ttl === 1 ? "Minute" : "Minutes"}
                        </option>
                        <option value={60 * 60}>
                          {ttl === 1 ? "Hour" : "Hours"}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="passphrase"
                  className="mb-2 block font-medium leading-6 text-white"
                >
                  Passphrase
                </label>
                <input
                  id="passphrase"
                  name="passphrase"
                  type="password"
                  autoComplete="current-password"
                  value={passphrase}
                  minLength={8}
                  onChange={(e) => setPassphrase(e.target.value)}
                  required={true}
                  className="mb-4 block w-full appearance-none border-0 bg-transparent py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "button-solid-white mt-4 w-full disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:ring-0",
                  loading ? "animate-pulse" : ""
                )}
              >
                <span className="font-bold">
                  {loading ? (
                    <Cog6ToothIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    "Share"
                  )}
                </span>
              </button>
            </form>
            <div className="mt-8">
              <ul className="space-y-2 text-xs text-neutral-500">
                <li>
                  <p>
                    <span className="font-semibold text-neutral-400">
                      Reads:
                    </span>{" "}
                    The number of reads determines how often the data can be
                    shared, before it deletes itself.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-semibold text-neutral-400">
                      Time To Live:
                    </span>{" "}
                    The TTL determines the time after which the data is
                    automatically deleted from the database.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-semibold text-neutral-400">
                      Passphrase:
                    </span>{" "}
                    The passphrase is used to derive a key from it, which is
                    used to encrypt the data.
                  </p>
                </li>
                <li>
                  <p>
                    Clicking{" "}
                    <i className="font-semibold text-neutral-400">Share</i> will
                    derive a new symmetrical key from the provided passphrase
                    and encrypt your data before sending only the encrypted data
                    to the server. You will receive an ID with which you can
                    then retrieve the document again.
                  </p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
