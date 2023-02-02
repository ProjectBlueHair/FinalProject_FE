import { CSSProperties, MouseEventHandler } from "react";

export interface Props {
    mg?: string;
    pd?: string;
    wd?: string;
    hg?: string;
    style? : CSSProperties
    onClick?: MouseEventHandler

  }
  export interface SpanProps {
    fc?: string;
    fs?: string;
    fw?: string;
    children?: React.ReactNode;
    type?: string;
    style? : CSSProperties
  }
 export interface ButtonProps {
  btnType?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  mg?: string;
  pd?: string;
  fc?: string;
  fs?: string;
  fw?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler;
} 