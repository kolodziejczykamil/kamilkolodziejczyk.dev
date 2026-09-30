import { useId } from "react";

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
};

const MESSAGE_ROWS = 5;

const controlClassName =
  "w-full rounded-md border bg-ink-raised/60 px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-signal focus:bg-ink-raised focus:outline-none";

export function FormField({
  name,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  multiline = false,
  className = "",
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const sharedProps = {
    id,
    name,
    placeholder,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `${controlClassName} ${error ? "border-danger" : "border-line hover:border-line-strong"}`,
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea rows={MESSAGE_ROWS} {...sharedProps} className={`${sharedProps.className} resize-y`} />
      ) : (
        <input type={type} autoComplete={autoComplete} {...sharedProps} />
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
