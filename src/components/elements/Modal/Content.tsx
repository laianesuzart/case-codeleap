import type { ReactNode } from "react";

interface TextContent {
  text: string;
  children?: never;
}

interface NodeContent {
  children: ReactNode;
  text?: never;
}

type Props = TextContent | NodeContent;

export function Content({ text, children }: Props) {
  return <>{children ? children : <p className="leading-tight">{text}</p>}</>;
}
