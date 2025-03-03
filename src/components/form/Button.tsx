import { PropsWithChildren } from "react";
import classNames from "classnames";

const defaultStyles =
  "text-center text-sm p-4 bg-[#0D503F] text-white w-full rounded-md font-medium hover:brightness-75 duration-300 flex items-center justify-center cursor-pointer";

interface ButtonProps extends PropsWithChildren {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string; // tailwind/bootstrap classes
  onClick?: () => any;
}

export const Button = ({
  type,
  disabled,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classNames(defaultStyles, className, {
        "hover:brightness-100 cursor-not-allowed": disabled,
      })}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
