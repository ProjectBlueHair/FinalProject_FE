import React from "react";
import Img from "../../component/elem/Img";
import { Props } from "../../model/StyleModel";
import { mainLogoMini } from "../pic";

const MainLogo: React.FC<Props> = (props) => {
  return <Img {...props} src={mainLogoMini} />;
};

export default MainLogo;
