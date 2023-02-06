import { useEffect } from "react";
import styled from "styled-components";
// import Img from "../../elem/Img";
// import { more } from "../../../asset/pic";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getComment } from "../../../redux/slice/comment";
import DetailDeleteAndUpdate from "./DetailCommentDeleteAndUpdate";
import DetailUpDown from "./DetailCommentUpDown";

const DetailCommentView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(__getComment(id));
  }, [id]);

  const mainCommentView = useSelector((state) => state.comment.comment);
  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };
  return (
    <div>
      {mainCommentView?.map((mcv) => (
        <DetailComTotal key={mcv.id}>
          <DetailComTopImg
            src={mcv.profileImg}
            onClick={() => MypageMove(mcv?.nickname)}
          />
          <DetailComTop>
            <DetailDeleteAndUpdate mcv={mcv} />
            <div>
              <DetailUpDown mcv={mcv} />
            </div>
          </DetailComTop>
        </DetailComTotal>
      ))}
    </div>
  );
};

export default DetailCommentView;

// 댓글 전체 div
const DetailComTotal = styled.div`
  display: flex;
  margin: 0 auto 10px;
  width: 95%;
`;

// 댓글 이미지 원모양
const DetailComTopImg = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
  cursor: pointer;
`;

// 댓글 프로필우측 div 전체
const DetailComTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  word-wrap: break-word;
`;
