import { CSSProperties, KeyboardEventHandler, MouseEventHandler } from "react";

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
  onKeyDown?: React.KeyboardEventHandler<Element>
} 
export interface ImgProps {
  style?: CSSProperties;
  wd?: string;
  hg?: string;
  mhg?: string;
  pd?: string;
  mg?: string | number;
  overFlow?: string;
  bg?: string;
  shadow?: string;
  radius?: string;
  border?: string;
  borderBottom?: string;
  borderTop?: string;
  borderRight?: string;
  borderLeft?: string;
  type?: string;
  z?:string | number;
  cursor?:string
  id?:string;
  filter? : string
  src?:any;
  onClick?:any
  key?: string | number
  children?: React.ReactNode;
  className?: string

}