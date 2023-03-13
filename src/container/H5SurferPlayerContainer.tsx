import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import AudioFileAdd from "../component/h5surferPlayer/AudioFileAdd";
import H5SurferPlayer from "../component/h5surferPlayer/H5SurferPlayer";
import { useAppDispatch } from "../redux/config";
import {
  __cleanUpAudios,
  __getAudios,
  __getCollaboRequestedAudios
} from "../redux/slice/h5surferSlice";
import { __cleanUpPost } from "../redux/slice/postingSlice";

const H5SurferPlayerContainer: React.FC<{
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
    return () => {
      dispatch(__cleanUpAudios());
      dispatch(__cleanUpPost());
    };
  }, [id, postId, dispatch]);
  return (
    <Fragment>
      <H5SurferPlayer
        fileAddComponent={
          posting || collabo ? <AudioFileAdd isCollabo={collabo} /> : null
        }
      />
    </Fragment>
  );
};

export default H5SurferPlayerContainer;
