import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/config";
import {
  __cleanUp,
  __getAudios,
  __getCollaboRequestedAudios,
} from "../../redux/slice/h5surferSlice";
import AudioFileAdd from "./AudioFileAdd";
import AudioH5Player from "./AudioH5player";
import AudioWaveSurferList from "./AudioWaveSurferList";

const H5SurferPlayer: React.FC<{
  // detail?:boolean, posting?:boolean,collabo?:boolean, collaboApprove?:boolean
  page: "detail" | "posting" | "collabo" | "collaboApprove";
}> = (
  // { detail=false,posting=false,collabo=false,collaboApprove=false }
  { page }
) => {
  const detail = page === "detail";
  const posting = page === "posting";
  const collabo = page === "collabo";
  const collaboApprove = page === "collaboApprove";

  const { id, postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (collabo || detail) dispatch(__getAudios(Number(id)));
    if (collaboApprove) {
      dispatch(__getAudios(Number(postId)))
        .then((data) => {
          dispatch(__getCollaboRequestedAudios(Number(id)));
        })
        .catch((err) => alert(err));
    }
    return ()=>{
      dispatch(__cleanUp())
    }
  }, [id, postId, dispatch]);
  return (
    <Fragment>
      <AudioH5Player />
      <AudioWaveSurferList />
      {posting && <AudioFileAdd />}
      {collabo && <AudioFileAdd isCollabo={true} />}
    </Fragment>
  );
};

export default H5SurferPlayer;
