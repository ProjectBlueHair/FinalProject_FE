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