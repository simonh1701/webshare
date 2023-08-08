import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

import cn from "@/util/classnames";

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
      className={cn(
        "mb-4 border-[1px] border-l-8 p-4",
        type === MessageType.Error
          ? "border-error bg-error/10"
          : "border-success bg-success/10"
      )}
    >
      <div className="flex">
        <div className="flex flex-shrink-0 flex-row justify-center">
          {type === MessageType.Error ? (
            <XCircleIcon
              className="my-auto h-5 w-5 text-error"
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className="my-auto h-5 w-5 text-success"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p
            className={
              type === MessageType.Error ? "text-error" : "text-success"
            }
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
