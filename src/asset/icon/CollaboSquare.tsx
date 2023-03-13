import React from "react";
import {  collaboIcon } from "../pic";
import Img from "../../component/elem/Img";
import { Props } from "../../component/elem/StyleModel.types";

const CollaboSquare: React.FC<Props> = (props) => {
  return <Img {...props} src={collaboIcon} />;
};

export default CollaboSquare;
