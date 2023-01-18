import React from "react";
import { alarmDot } from "../../asset/pic";
import Img from "./Img";

interface Props {
  mg?: string;
  pd?: string;
  wd?: string;
  hg?: string;
}
const AlarmDot: React.FC<Props> = (props) => {
  return <Img {...props} src={alarmDot} />;
};

export default AlarmDot;
