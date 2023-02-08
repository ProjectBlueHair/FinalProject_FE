import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { more } from "../../../asset/pic";
import useToggleOutSideClick from "../../../modal/hooks/useToggleOutSideClick";
import {
  __deleteComment,
  __getComment,
  __putComment,
} from "../../../redux/slice/comment";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import Img from "../../elem/Img";
import DetailCommentSubLike from "./DetailCommentSubLike";

const DetailCommentSubDeleteUpdate = ({ re }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subUPDEL, setSubUPDEL] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(re.contents);
  const [contentSubOpen, setContentSubOpen] = useState(false);
  const { id } = useParams();
  const moreSubRef = useRef(null);

  useToggleOutSideClick(moreSubRef, setContentSubOpen);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, [id]);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  const onChangeSubComment = (e) => {
    const a = e.target.value;
    setComUpdateInput(a);
  };
  // 대댓글 삭제
  const onSubCommentDelete = async (comSubId) => {
    await dispatch(__deleteComment(comSubId));
    dispatch(__getComment(id));
  };
  // 수정/ 수정 확인 교체
  const onSubUp = () => {
    setSubUPDEL(true);
    setContentSubOpen(false);
  };
  // 수정 완료
  const onUpdateSubCom = async (comID) => {
    await dispatch(__putComment({ comID, comUpdateInput }));
    dispatch(__getComment(id));
    setSubUPDEL(false);
  };
  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };

  if (subUPDEL === false) {
    return (
      <SubAllDiv>
        <DetailComSubHeader>
          <div
            onClick={() => MypageMove(re.nickname)}
            style={{ cursor: "pointer" }}
          >
            {re.nickname}
          </div>
          {re?.nickname !== userInformation?.nickname ? (
            ""
          ) : contentSubOpen ? (
            <span>
              <Img
                wd="2rem"
                src={more}
                onClick={() => setContentSubOpen(!contentSubOpen)}
              />
              <MoreSubBtn ref={moreSubRef}>
                <button onClick={onSubUp}>수정</button>
                <button
                  onClick={() => onSubCommentDelete(re.id)}
                  style={{ cursor: "pointer" }}
                >
                  삭제
                </button>
              </MoreSubBtn>
            </span>
          ) : (
            <Img
              wd="2rem"
              src={more}
              onClick={() => setContentSubOpen(!contentSubOpen)}
              style={{ cursor: "pointer" }}
            />
          )}
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>{re.contents}</div>
        </DetailComSubContent>
        <DetailCommentSubLike re={re} />
      </SubAllDiv>
    );
  } else {
    return (
      <div>
        <DetailComSubHeader>
          <div>{re.nickname}</div>
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>
            <input
              type="text"
              name="subUpdate"
              value={comUpdateInput}
              onChange={onChangeSubComment}
            />
          </div>
        </DetailComSubContent>

        <ContentSubBTW>
          <DetailCommentSubLike re={re} />
          <SubUpClear>
            <button
              onClick={() => setSubUPDEL(false)}
              style={{ cursor: "pointer" }}
            >
              취소
            </button>
            <button
              onClick={() => onUpdateSubCom(re.id)}
              style={{ cursor: "pointer" }}
            >
              수정하기
            </button>
          </SubUpClear>
        </ContentSubBTW>
      </div>
    );
  }
};

export default DetailCommentSubDeleteUpdate;

const SubAllDiv = styled.div`
  max-width: 100%;
`;

const DetailComSubHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
  span {
    width: 2rem;
    height: 2rem;
  }
`;

const DetailComSubContent = styled.div`
  width: 100%;
  div {
    width: 99%;
  }
  input {
    border: transparent;
    background-color: transparent;
    border-bottom: 1px solid #ff4d00;
    width: 100%;
  }
`;

const MoreSubBtn = styled.div`
  background-color: white;
  width: 7rem;
  height: 7rem;
  border: 1px solid #ff4d00;
  border-radius: 10px;
  position: relative;
  right: 0px;
  top: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    width: 4rem;
    font-size: 17px;
    :hover {
      border: transparent;
      background-color: #ff4d00;
      border-radius: 20px;
      color: white;
    }
  }
`;

const ContentSubBTW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubUpClear = styled.div`
  button {
    border: transparent;
    background-color: #ff4d00;
    border-radius: 20px;
    color: white;
    padding: 1px 5px;
    margin-right: 4px;
  }
`;
