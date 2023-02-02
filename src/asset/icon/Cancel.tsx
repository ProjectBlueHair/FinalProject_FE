import React from "react";
import Img from "../../component/elem/Img";
import { Props } from "../../model/StyleModel";
import { cancel } from "../pic";

const Cancel: React.FC<Props> = (props) => {
  return <Img {...props} src={cancel} />;
};

export default Cancel;