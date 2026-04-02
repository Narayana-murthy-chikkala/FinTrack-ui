export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className,
  children,
  ...props
}) {
  const baseClasses = `btn btn-${variant} btn-${size}`;
  const finalClasses = `${baseClasses} ${className || ""}`;

  return (
    <button
      type={type}
      className={finalClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
