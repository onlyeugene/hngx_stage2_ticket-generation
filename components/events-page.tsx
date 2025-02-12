import React from "react";
import Button from "./ui/button";

interface Props {
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const EventsPage = ({
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Props) => {
  return (
    <div className="flex flex-col container items-center justify-center py-4 px-10 border rounded-3xl bg-[#041e23] border-primary max-w-5xl">
      {title && <h1 className="text-white text-xl font-semibold mb-4">{title}</h1>}
      
      <div className="w-full h-full">{body}</div>

      <div className="flex flex-col gap-2 md:p-6 w-full mt-20 justify-center items-center">
        <div className="flex md:flex-row flex-col-reverse gap-4 md:w-11/12 w-full">
          {secondaryAction && secondaryActionLabel && (
            <Button
              disabled={disabled}
              onClick={secondaryAction}
              className="text-lighter border-lighter w-full py-3 hover:bg-primary"
              label={secondaryActionLabel}
            />
          )}
          <Button
            disabled={disabled}
            onClick={onSubmit}
            className="text-white py-3 w-full bg-lighter border-lighter hover:bg-[#249fb588]"
            label={actionLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
