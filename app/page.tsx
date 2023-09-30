import {
  ArchiveBoxXMarkIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative pt-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/50 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Easily and securely share text over the internet with WebShare
        </h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          <b>WebShare is the web&apos;s clipboard.</b> Effortlessly share text
          snippets between different devices where traditional methods like
          email and messaging services would be too cumbersome to use.
        </p>
        <div className="my-8 flex">
          <Link
            href="https://github.com/simonh1701/webshare"
            className="relative overflow-hidden px-4 py-1.5 text-sm leading-6 text-neutral-400 ring-1 ring-neutral-400/30 duration-150 hover:ring-neutral-400/70"
          >
            Check out WebShare on{" "}
            <span className="font-semibold text-white">
              GitHub <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(15%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(15%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-primary/50 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <FeatureOverview />
      </div>
    </div>
  );
}

const features = [
  {
    name: "Human-Readable IDs",
    description:
      "WebShare creates user-friendly, easy-to-recall IDs when you share data. This makes it easy to type in the ID when retrieving the data on another device.",
    icon: FingerPrintIcon,
  },
  {
    name: "Encryption",
    description:
      "WebShare uses a passphrase you choose to encrypt your data with AES before sending it to the server. Unencrypted data never leaves your browser.",
    icon: LockClosedIcon,
  },
  {
    name: "Automatic Deletion",
    description:
      "Your data will be deleted when a certain number of reads or a specified time has been reached.",
    icon: ArchiveBoxXMarkIcon,
  },
];

function FeatureOverview() {
  return (
    <div className="py-16 sm:py-24">
      <h2 className="text-3xl font-semibold leading-7 sm:text-4xl">Features</h2>
      <p className="mt-2 text-base leading-8 text-neutral-300 sm:text-lg">
        Take a look at what WebShare has to offer and if it is right for you.
      </p>
      <div className="relative overflow-hidden pt-8">
        <div className="mx-auto">
          <Image
            priority
            src="/images/notebooks-connected-through-database.jpg"
            alt="Two notebooks connected through a server/database"
            width={6000}
            height={3374}
          />
          <div className="flex w-full justify-end">
            <a
              href="https://www.freepik.com"
              className="text-right text-xs text-neutral-600 hover:text-neutral-700"
            >
              Designed by fullvector / Freepik
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 md:mt-16">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-neutral-300 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
