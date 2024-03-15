"use client";

import { ArchiveBoxIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface HistoryEntry {
  id: string;
  documentId: string;
  operation: string;
  date: Date;
  additionalInfo: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[] | undefined>(undefined);

  useEffect(() => {
    const stored = sessionStorage.getItem("history");
    const storedHistory: HistoryEntry[] = stored
      ? JSON.parse(stored).map(
          (entry: Omit<HistoryEntry, "date"> & { date: string }) => ({
            ...entry,
            date: new Date(entry.date),
          })
        )
      : [];

    setHistory(storedHistory.reverse());
  }, []);

  return (
    <div className="mb-16">
      <h1 className="tracking-tigh mb-6 text-3xl font-bold sm:text-4xl">
        History
      </h1>
      {history == undefined ? (
        <ul role="list" className="animate-pulse divide-y divide-neutral-500">
          <li key="0" className="relative flex items-center space-x-4 py-4">
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <div className="flex gap-x-2">
                    <div className="my-auto h-6 w-12 truncate bg-neutral-500" />
                    <span className="w-[5px] text-center leading-6 text-neutral-500">
                      /
                    </span>
                    <div className="my-auto h-6 w-36 truncate bg-neutral-500" />
                    <span className="absolute inset-0" />
                  </div>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2 text-xs leading-5 text-neutral-300">
                <div className="my-auto h-5 w-12 truncate bg-neutral-500" />
                <div className="w-[5px]">
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-auto h-0.5 w-0.5 flex-none fill-neutral-500"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
                <div className="my-auto h-5 w-64 truncate bg-neutral-500" />
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-neutral-300"
              aria-hidden="true"
            />
          </li>
          <li key="1" className="relative flex items-center space-x-4 py-4">
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <div className="flex gap-x-2">
                    <div className="my-auto h-6 w-12 truncate bg-neutral-500" />
                    <span className="w-[5px] text-center leading-6 text-neutral-500">
                      /
                    </span>
                    <div className="my-auto h-6 w-36 truncate bg-neutral-500" />
                    <span className="absolute inset-0" />
                  </div>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2 text-xs leading-5 text-neutral-300">
                <div className="my-auto h-5 w-12 truncate bg-neutral-500" />
                <div className="w-[5px]">
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-auto h-0.5 w-0.5 flex-none fill-neutral-500"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
                <div className="my-auto h-5 w-64 truncate bg-neutral-500" />
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-neutral-300"
              aria-hidden="true"
            />
          </li>
          <li key="2" className="relative flex items-center space-x-4 py-4">
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <div className="flex gap-x-2">
                    <div className="my-auto h-6 w-12 truncate bg-neutral-500" />
                    <span className="w-[5px] text-center leading-6 text-neutral-500">
                      /
                    </span>
                    <div className="my-auto h-6 w-36 truncate bg-neutral-500" />
                    <span className="absolute inset-0" />
                  </div>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2 text-xs leading-5 text-neutral-300">
                <div className="my-auto h-5 w-12 truncate bg-neutral-500" />
                <div className="w-[5px]">
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-auto h-0.5 w-0.5 flex-none fill-neutral-500"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
                <div className="my-auto h-5 w-64 truncate bg-neutral-500" />
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-neutral-300"
              aria-hidden="true"
            />
          </li>
        </ul>
      ) : history.length > 0 ? (
        <ul role="list" className="divide-y divide-neutral-100/50">
          {history.map((historyEntry) => {
            const url = new URL(window.location.href);
            url.pathname = "/load";
            url.hash = historyEntry.documentId;

            const href = url.toString();

            return (
              <li
                key={historyEntry.id}
                className="relative flex items-center space-x-4 py-4"
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                      <Link href={href} className="flex gap-x-2">
                        <span className="truncate leading-6">
                          {historyEntry.operation}
                        </span>
                        <span className="w-[5px] text-center leading-6 text-neutral-300">
                          /
                        </span>
                        <span className="whitespace-nowrap font-mono leading-6">
                          {historyEntry.documentId}
                        </span>
                        <span className="absolute inset-0" />
                      </Link>
                    </h2>
                  </div>
                  <div className="mt-3 flex items-center gap-x-2 text-xs leading-5 text-neutral-300">
                    <p className="whitespace-nowrap leading-5">
                      {getRelativeTime(historyEntry.date)}
                    </p>
                    <div className="w-[5px]">
                      <svg
                        viewBox="0 0 2 2"
                        className="mx-auto h-0.5 w-0.5 flex-none fill-neutral-500"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                    </div>
                    <p className="truncate leading-5">
                      {historyEntry.additionalInfo}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-neutral-300"
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="relative block h-full border-2 border-dashed border-neutral-50/50 p-12 text-center">
          <ArchiveBoxIcon
            className="mx-auto h-6 w-6 text-neutral-50/50"
            aria-hidden="true"
          />
          <span className="text-md mt-2 block font-semibold">
            There is nothing in your history yet.
          </span>
          <span className="mt-2 block text-sm text-neutral-50/50">
            Share or load a document to add it to your history.
          </span>
        </div>
      )}
      <div className="mt-8">
        <ul className="space-y-2 text-xs text-neutral-500">
          <li>
            <p>
              The history is stored in your browser. Only actions performed in
              the same browser tab as this one will show up. The history will be
              deleted as soon as you close this tab.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

const formatter = new Intl.RelativeTimeFormat(`en`, { style: `narrow` });

function getRelativeTime(date: Date): string {
  const dateTimestamp = new Date().getTime();
  const dateInSeconds = Math.floor(dateTimestamp / 1000);
  const nowTimestamp = date.getTime();
  const nowInSeconds = Math.floor(nowTimestamp / 1000);
  const difference = dateInSeconds - nowInSeconds;
  let output = ``;
  if (difference < 60) {
    // Less than a minute has passed:;
    output = formatter.format(-difference, `second`);
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = formatter.format(-Math.floor(difference / 60), `minute`);
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = formatter.format(-Math.floor(difference / 3600), `hour`);
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = formatter.format(-Math.floor(difference / 86400), `days`);
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = formatter.format(-Math.floor(difference / 2620800), `month`);
  } else {
    // More than a year has passed:
    output = formatter.format(-Math.floor(difference / 31449600), `years`);
  }

  return output;
}
