import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  message: string;
  type: MessageType;
};

export enum MessageType {
  Error = "error",
  Success = "success",
}

export default function Message({ message, type }: Props) {
  const color = type;

  return (
    <div
      className={`mb-4 border-[1px] border-l-8 border-${color} bg-${color}/10 p-4`}
    >
      <div className="flex">
        <div className="flex flex-shrink-0 flex-row justify-center">
          {type === MessageType.Error ? (
            <XCircleIcon
              className={`my-auto h-5 w-5 text-${color}`}
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className={`my-auto h-5 w-5 text-${color}`}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-${color}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
