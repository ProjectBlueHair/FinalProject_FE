import React from "react";
import {  collaboIcon } from "../pic";
import Img from "../../component/elem/Img";
import { Props } from "../../model/StyleModel";

const CollaboSquare: React.FC<Props> = (props) => {
  return <Img {...props} src={collaboIcon} />;
};

export default CollaboSquare;
