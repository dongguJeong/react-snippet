import { type SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name?: string;
  size?: number | string;
  color?: string;
  rotate?: number;
  className?: string;
}

export function Icon({
  name,
  size = 24,
  color = "currentColor",
  rotate = 0,
  className = "",
  children,
  ...props
}: IconProps) {
  const sizeValue = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${className}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        color,
      }}
      {...props}
    >
      {children}

      <style>{`
        .icon {
          display: inline-block;
          vertical-align: middle;
          flex-shrink: 0;
        }
      `}</style>
    </svg>
  );
}

// 기본 제공 아이콘들
export function CheckIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function XIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronDownIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronUpIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M18 15L12 9L6 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronLeftIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronRightIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function SearchIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function CalendarIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function MinusIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function PlusIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
