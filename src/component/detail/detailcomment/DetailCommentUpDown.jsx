import React, { useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import styled from "styled-components";
import DetailCommentSub from "../detailcommentsub/DetailCommentSub";

const DetailUpDown = ({ mcv }) => {
  const [comUpDown, setComUpDown] = useState(false);
  return (
    <div>
      {comUpDown ? <DetailCommentSub mcv={mcv} /> : ""}
      <div>
        <UpDownBtn onClick={() => setComUpDown(!comUpDown)}>
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
        </UpDownBtn>
      </div>
    </div>
  );
};

export default DetailUpDown;

// 댓글 더보기 버튼
const UpDownBtn = styled.button`
  margin-top: 5px;
  border: transparent;
`;
