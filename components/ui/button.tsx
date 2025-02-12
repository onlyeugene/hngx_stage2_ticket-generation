interface ButtonProps {
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    type?: "button" | "submit" | "reset";
    label?: string
  }
  
  const Button: React.FC<ButtonProps> = ({
    onClick,
    className,
    children,
    type,
    isLoading,
    disabled,
    label
    // isError,
    // errorMessage,
  }) => {
    return (
      <>
        <button
          onClick={onClick}
          type={type}
          className={`py-2 px-5 rounded-md border ${className}`}
          disabled={isLoading || disabled}
        >
          {children}
          {label}
        </button>
      </>
    );
  };
  
  export default Button;
  