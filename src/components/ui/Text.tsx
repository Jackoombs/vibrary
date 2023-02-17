import clsx from "clsx";

interface Props {
  variant?: "primary" | "secondary";
  children: string;
  size?: "text-sm" | "text-md" | "text-lg";
  textCenter?: boolean;
}

export const Text = ({
  children,
  variant = "primary",
  size = "text-md",
  textCenter = false,
}: Props) => {
  return (
    <p
      className={clsx(
        "my-8 text-lg font-medium",
        variant === "primary" && "text-primary",
        variant === "secondary" && "text-secondary",
        textCenter && "text-center",
        size
      )}
    >
      {children}
    </p>
  );
};
