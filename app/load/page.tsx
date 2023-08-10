"use client";

import {
  Cog6ToothIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import Message from "@/components/message";
import { MessageType } from "@/components/message";
import { decrypt } from "@/lib/encryption";
import cn from "@/util/classnames";

export default function Share() {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setId(window.location.hash.replace(/^#/, ""));
    }
  }, []);

  const [passphrase, setPassphrase] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [remainingReads, setRemainingReads] = useState<number | undefined>();

  const [copied, setCopied] = useState(false);

  const onSubmit = async () => {
    try {
      setError("");
      setText("");
      setLoading(true);

      if (!id) {
        throw new Error("No id provided");
      }

      const res = await fetch(`/api/v1/load?id=${id}`);

      if (!res.ok) {
        throw new Error((await res.json()).message);
      }

      const { salt, iv, encrypted, remainingReads } = (await res.json()) as {
        salt: string;
        iv: string;
        encrypted: string;
        remainingReads: number;
      };

      setRemainingReads(remainingReads);

      decrypt(passphrase, salt, iv, encrypted)
        .then((decrypted) => setText(decrypted))
        .catch(() => {
          const e = new Error(
            `Decryption failed - ${
              remainingReads > 0
                ? "Check if passphrase is correct"
                : "This was the last time this document could be read. It was deleted from storage."
            }`
          );
          console.error(e);
          setError((e as Error).message);
        });
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
        Load and Decrypt
      </h1>
      {error && <Message message={error} type={MessageType.Error} />}
      <div className="mt-2">
        {text ? (
          <div>
            <label htmlFor="text" className="sr-only">
              Text
            </label>
            <div
              id="text"
              className="form-textarea mb-4 block max-h-[80vh] min-h-[120px] w-full overflow-auto whitespace-pre border-0 bg-transparent p-4 font-mono text-sm ring-1 ring-inset ring-neutral-50/50 placeholder:text-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary disabled:text-white sm:leading-6 md:text-base"
            >
              {text}
            </div>
            <div className="flex w-full">
              <button
                type="button"
                className="button-solid-white relative ml-auto mr-0 w-full md:w-auto"
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3_000);
                }}
              >
                {copied ? (
                  <ClipboardDocumentCheckIcon
                    className="-ml-0.5 h-5 w-5 md:mr-1"
                    aria-hidden="true"
                  />
                ) : (
                  <ClipboardDocumentIcon
                    className="-ml-0.5 h-5 w-5 md:mr-1"
                    aria-hidden="true"
                  />
                )}
                <span className="inline-block">Copy</span>
              </button>
            </div>

            {remainingReads !== undefined && (
              <div className="mt-3 text-center text-sm text-neutral-500 md:text-right">
                {remainingReads > 0 ? (
                  <p>
                    This document can be read{" "}
                    <span className="text-neutral-400">{remainingReads}</span>{" "}
                    more time{remainingReads > 1 && <span>s</span>}.
                  </p>
                ) : (
                  <p className="text-neutral-400">
                    This was the last time this document could be read. It was
                    deleted from storage.
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div>
                <label
                  htmlFor="id"
                  className="mb-2 block font-medium leading-6 text-white"
                >
                  ID
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  value={id}
                  placeholder="Enter the id of the document you want to load."
                  onChange={(e) => setId(e.target.value)}
                  required={true}
                  className="mb-4 block w-full border-0 bg-transparent py-1.5 font-mono text-sm text-white shadow-sm ring-1 ring-inset ring-neutral-50/50 placeholder:text-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
                />
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
                  className="mb-4 block w-full border-0 bg-transparent py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-neutral-50/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:text-base"
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
                <span>
                  {loading ? (
                    <Cog6ToothIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    "Load"
                  )}
                </span>
              </button>
            </form>
            <div className="mt-8">
              <ul className="space-y-2 text-xs text-neutral-500">
                <li>
                  <p>
                    <span className="font-semibold text-neutral-400">
                      Passphrase:
                    </span>{" "}
                    The passphrase is used to derive a key from it, which is
                    used to decrypt the data.
                  </p>
                </li>
                <li>
                  <p>
                    Clicking{" "}
                    <i className="font-semibold text-neutral-400">Load</i> will
                    retrieve the document associated with the provided ID before
                    decrypting the data with a key which will be derived from
                    the provided passphrase.
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
