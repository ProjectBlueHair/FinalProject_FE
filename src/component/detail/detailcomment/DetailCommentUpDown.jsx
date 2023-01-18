import React, { useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import DetailCommentSub from "../detailcommentsub/DetailCommentSub";

const DetailUpDown = ({ mcv }) => {
  const [comUpDown, setComUpDown] = useState(false);
  return (
    <div>
      {comUpDown ? <DetailCommentSub mcv={mcv} /> : ""}
      <div>
        <button onClick={() => setComUpDown(!comUpDown)}>
          {comUpDown ? (
            <span style={{ color: "gray" }}>
              <AiOutlineUp /> 댓글닫기
            </span>
          ) : (
            <span style={{ color: "gray" }}>
              <AiOutlineDown />
              댓글 보기
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DetailUpDown;
