import React, { Fragment, ReactNode } from "react";
import AudioH5Player from "./AudioH5player";
import AudioWaveSurferList from "./AudioWaveSurferList";

const H5SurferPlayer: React.FC<{
  fileAddComponent: ReactNode;
}> = (props) => {
  return (
    <Fragment>
      <AudioH5Player />
      <AudioWaveSurferList />
      {props.fileAddComponent}
    </Fragment>
  );
};
export default H5SurferPlayer;
