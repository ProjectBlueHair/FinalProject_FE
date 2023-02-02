import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useTypeModal from "../../../modal/hooks/useTypeModal";
import { __getComment, __postCommentSub } from "../../../redux/slice/comment";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import DetailCommentSubDeleteUpdate from "./DetailCommentSubDeleteUpdate";

const DetailCommentSub = ({ mcv }) => {
  const [comSubV, setComSubV] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { $openModal, $closeModal } = useTypeModal();
  useEffect(() => {
    dispatch(__getUserInfo());
  }, [id]);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  const onChangeCommentSub = (e) => {
    const comSub = e.target.value;
    setComSubV(comSub);
  };

  const onClickComSub = async () => {
    const sub = { detailId: mcv?.id, id, comSubV };
    if (comSubV.trim() === "") {
      $openModal({
        type: "alert",
        props: {
          message: "댓글을 입력해 주세요.",
          type: "info",
        },
      });
    } else {
      await dispatch(__postCommentSub(sub));
      dispatch(__getComment(id));
      setComSubV("");
    }
  };

  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };

  const KPH = (e) => {
    $closeModal();
    if (e.key === "Enter") {
      onClickComSub();
    }
  };
  return (
    <div>
      {mcv.replyList?.map((re) => (
        <DetailComSubTotal key={re.id}>
          <DetailComTopSubImg
            src={re.profileImg}
            onClick={() => MypageMove(re.nickname)}
            style={{ cursor: "pointer" }}
          />
          <DetailComSubTop>
            <DetailCommentSubDeleteUpdate re={re} />
          </DetailComSubTop>
        </DetailComSubTotal>
      ))}

      {userInformation === undefined ? (
        ""
      ) : (
        <SubCommentWrite>
          <DetailComTopSubImg src={userInformation?.profileImg} />
          <div>
            <input
              type="text"
              name="commentSub"
              value={comSubV}
              onChange={onChangeCommentSub}
              onKeyPress={KPH}
            />
            <button onClick={onClickComSub}>댓글</button>
          </div>
        </SubCommentWrite>
      )}
    </div>
  );
};
export default DetailCommentSub;

// 대댓글 각각 div
const DetailComSubTotal = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
`;

// 대댓글 이미지
const DetailComTopSubImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

// 대댓글 우측 div
const DetailComSubTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 대댓글 input 부분
const SubCommentWrite = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
  input {
    width: 95%;
    border: transparent;
    background-color: transparent;
    padding-left: 1rem;
    margin-left: 1rem;
  }
  button {
    color: #ff4d00;
    border: transparent;
    cursor: pointer;
  }
`;
