import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

export default function TextCopy({
  text,
  copied,
  setCopied,
  icon,
}: {
  text: string;
  copied: boolean;
  setCopied: Dispatch<SetStateAction<boolean>>;
  icon: any;
}) {
  return (
    <div className="flex">
      <div className="relative flex flex-grow items-stretch">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <input
          value={text}
          disabled={true}
          readOnly={true}
          className="block w-full border-0 bg-transparent py-1.5 pl-10 pr-2 font-mono text-sm ring-1 ring-inset ring-neutral-50/50 md:text-base"
        />
      </div>
      <button
        type="button"
        className="button-solid-white relative -ml-px"
        onClick={() => {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 3_000);
        }}
      >
        {copied ? (
          <ClipboardDocumentCheckIcon
            className="-ml-0.5 h-5 w-5"
            aria-hidden="true"
          />
        ) : (
          <ClipboardDocumentIcon
            className="-ml-0.5 h-5 w-5"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
