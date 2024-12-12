import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "py-2.5 px-2.5 flex justify-center h-full items-center w-full md:w-initial flex-shrink-0 font-medium font-sans relative z-[1] cursor-pointer overflow-hidden rounded-xl",
  variants: {
    disabled: {
      true: "opacity-100 cursor-default pointer-events-none border !bg-black border-opacity-100",
    },
    variant: {
      primary: "bg-blueBg text-grayText",
      secondary: "bg-green text-white px-8 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type variants = VariantProps<typeof button>;

type IProps = {
  icon?: ReactNode;
  loading?: boolean;
  containerClassName?: string;
  buttonType?: "dark" | "light";
} & (React.ComponentProps<"button"> & variants);

/**
 * Renders a button component with customizable properties.
 *
 * @param {IProps} ButtonProps - The properties of the button component.
 * @param {React.ReactNode} ButtonProps.children - The content of the button.
 * @param {Function} ButtonProps.onClick - The function to be called when the button is clicked.
 * @param {string} ButtonProps.className - The additional class name for the button.
 * @param {string} ButtonProps.type - The type of the button.
 * @param {boolean} ButtonProps.disabled - Indicates if the button is disabled.
 * @param {boolean} ButtonProps.loading - Indicates if the button is in a loading state.
 * @param {React.ReactNode} ButtonProps.icon - The icon to be displayed in the button.
 * @param {string} ButtonProps.variant - The variant style of the button.
 * @return {JSX.Element} - The rendered button component.
 */
const Button: React.ForwardRefExoticComponent<any> = React.forwardRef<
  HTMLDivElement,
  IProps
>(
  (
    {
      children,
      onClick,
      className,
      type,
      disabled,
      loading,
      icon,
      variant,
      buttonType = "dark",
      containerClassName,
      ...props
    }: IProps,
    ref,
  ) => {
    const disabledOrLoading = disabled || loading;
    const buttonClassName = twMerge(
      button({ variant, disabled: disabledOrLoading }),
      className,
    );

    return (
      <div
        className={containerClassName}
        style={
          containerClassName?.includes("bg-transparent")
            ? { background: "transparent", border: "1px solid gray" }
            : {}
        }
        {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        ref={ref}
      >
        <button
          className={buttonClassName + "disabled:bg-none"}
          onClick={onClick}
          type={type}
          disabled={disabledOrLoading}
        >
          {loading ? <div className="loader mr-2" /> : icon}
          {children}
        </button>
      </div>
    );
  },
);

Button.displayName = "Button";

export default Button;
