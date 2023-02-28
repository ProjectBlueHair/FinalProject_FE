import React from "react";
import { alarmDot } from "../pic";
import Img from "../../component/elem/Img";
import { Props } from "../../component/elem/StyleModel.types";

const AlarmDot: React.FC<Props> = (props) => {
  return <Img {...props} src={alarmDot} />;
};

export default AlarmDot;
