import React from "react";
import {  collaboIcon } from "../pic";
import Img from "../../component/elem/Img";

interface Props {
  mg?: string;
  pd?: string;
  wd?: string;
  hg?: string;
}
const CollaboSquare: React.FC<Props> = (props) => {
  return <Img {...props} src={collaboIcon} />;
};

export default CollaboSquare;
