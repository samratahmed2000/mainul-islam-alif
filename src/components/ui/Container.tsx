import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className={`site-container ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
