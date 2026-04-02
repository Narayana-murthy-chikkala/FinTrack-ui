export function Table({ className, children, ...props }) {
  return (
    <table className={`table ${className || ""}`} {...props}>
      {children}
    </table>
  );
}

export function TableHead({ children, ...props }) {
  return <thead {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }) {
  return <tr {...props}>{children}</tr>;
}

export function TableHeader({ children, ...props }) {
  return <th {...props}>{children}</th>;
}

export function TableCell({ children, ...props }) {
  return <td {...props}>{children}</td>;
}
