import React from "react";
import Img from "../../component/elem/Img";
import { Props } from "../../component/elem/StyleModel.types";
import { cancel } from "../pic";

const Cancel: React.FC<Props> = (props) => {
  return <Img {...props} src={cancel} />;
};

export default Cancel;