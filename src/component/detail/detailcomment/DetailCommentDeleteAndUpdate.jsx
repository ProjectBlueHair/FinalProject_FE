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
import DetailCommentLike from "./DetailCommentLike";

const DetailDeleteAndUpdate = ({ mcv }) => {
  const [comUpdate, setcomUpdate] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(mcv.contents);
  const [contentOpen, setContentOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const moreRef = useRef(null);

  useToggleOutSideClick(moreRef, setContentOpen);
  // 삭제
  const onComDelete = (comId) => {
    dispatch(__deleteComment(comId));
  };
  // 유저 정보
  useEffect(() => {
    dispatch(__getUserInfo());
  }, [id]);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  // 수정
  const onChangeComUpdate = (e) => {
    const upInput = e.target.value;
    setComUpdateInput(upInput);
  };
  const onComUpdateNo = () => {
    setcomUpdate(true);
    setContentOpen(false);
  };
  const onComUpdateYes = (comID) => {
    dispatch(__putComment({ comID, comUpdateInput }));
    setcomUpdate(false);
  };
  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };
  if (comUpdate === false) {
    return (
      <div>
        <DetailComHeader>
          <div
            onClick={() => MypageMove(mcv?.nickname)}
            style={{ cursor: "pointer" }}
          >
            {mcv?.nickname}
          </div>
          {userInformation?.nickname !== mcv?.nickname ? (
            ""
          ) : contentOpen ? (
            <span>
              <Img
                wd="2rem"
                src={more}
                onClick={() => setContentOpen(!contentOpen)}
                style={{ cursor: "pointer" }}
              />
              <MoreBtn ref={moreRef}>
                <button onClick={onComUpdateNo}>수정</button>
                <button onClick={() => onComDelete(mcv.id)}>삭제</button>
              </MoreBtn>
            </span>
          ) : (
            <Img
              wd="2rem"
              src={more}
              onClick={() => setContentOpen(!contentOpen)}
              style={{ cursor: "pointer" }}
            />
          )}
        </DetailComHeader>
        <DetailComContent>
          <div>{mcv?.contents}</div>
        </DetailComContent>
        <DetailCommentLike mcv={mcv} />
      </div>
    );
  } else {
    return (
      <div>
        <DetailComHeader>
          <div>{mcv?.nickname}</div>
        </DetailComHeader>
        <DetailComContent>
          <input
            type="text"
            name="comUpdate"
            value={comUpdateInput}
            onChange={onChangeComUpdate}
          />
        </DetailComContent>
        <ContentBTW>
          <DetailCommentLike mcv={mcv} />
          <UpClear>
            <button
              onClick={() => setcomUpdate(false)}
              style={{ cursor: "pointer" }}
            >
              취소
            </button>
            <button
              onClick={() => onComUpdateYes(mcv.id)}
              style={{ cursor: "pointer" }}
            >
              수정하기
            </button>
          </UpClear>
        </ContentBTW>
      </div>
    );
  }
};

export default DetailDeleteAndUpdate;

// 닉네임과 수정 삭제 버튼 부분
const DetailComHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  span {
    width: 2rem;
    height: 2rem;
  }
`;

// 댓글 내용 부분
const DetailComContent = styled.div`
  width: 100%;
  margin: 5px auto;
  div {
    width: 99%;
  }
  // 수정 input
  input {
    border: transparent;
    background-color: transparent;
    border-bottom: 1px solid #ff4d00;
    width: 99%;
    margin-right: 10px;
    margin-top: 5px;
  }
`;

const ContentBTW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreBtn = styled.div`
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

const UpClear = styled.div`
  button {
    border: transparent;
    background-color: #ff4d00;
    border-radius: 20px;
    color: white;
    padding: 1px 5px;
    margin-right: 5px;
  }
`;
