import clsx from "clsx";

interface Props {
  children: string;
  onClick?: (...args: any) => any;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: Props) => {
  return (
    <button
      {...{ onClick, type }}
      className={clsx(
        "border-1 w-1/4 rounded-lg py-1 font-semibold duration-150",
        variant === "primary" &&
          "border-secondary bg-primary text-secondary hover:bg-secondary hover:text-primary",
        variant === "secondary" &&
          "border-primary bg-secondary text-primary hover:bg-primary hover:text-secondary"
      )}
    >
      {children}
    </button>
  );
};
