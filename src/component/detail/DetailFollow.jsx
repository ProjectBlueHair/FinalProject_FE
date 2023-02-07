import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookies } from "../../dataManager/cookie";
import {
  __getDetailCollabo,
  __getUserInfo,
  __putDetailFollow,
} from "../../redux/slice/detailSlice";

const DetailFollow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [followMore, setFollowMore] = useState(true);
  useEffect(() => {
    dispatch(__getDetailCollabo(id));
    dispatch(__getUserInfo());
  }, [id]);
  const userInfo = useSelector((state) => state.user.user);
  //작곡가 프로필/ 이름/ 악기 이름
  const detailCollabo = useSelector((state) => state.detail.collabo.data);
  const detailFollowOne = detailCollabo?.slice(0, 1);
  const detailFollowAll = detailCollabo?.slice(1);
  const moreClicker = () => {
    setFollowMore(!followMore);
  };
  const acToken = getCookies("accesstoken");
  const FollowClick = async (fol) => {
    const follow = {
      isFollowed: fol.isFollowed,
      myFollowingMemberNickname: fol.nickname,
    };
    await dispatch(__putDetailFollow(follow));
    dispatch(__getDetailCollabo(id));
  };

  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };

  return (
    <FollowAll>
      {detailFollowOne?.map((collabo, index) => (
        <FollowTotal key={index}>
          <FollowTop>
            <FollowImgText>
              <img
                src={collabo.profileImg}
                alt=""
                onClick={() => MypageMove(collabo?.nickname)}
                style={{ cursor: "pointer" }}
              />
              <FollowMiddle>
                <FollowWriteInstrument>
                  {collabo?.musicPartsList?.map((part, index) => (
                    <div key={index}>{part}</div>
                  ))}
                  <span
                    onClick={() => MypageMove(collabo?.nickname)}
                    style={{ cursor: "pointer" }}
                  >
                    {collabo.nickname}
                  </span>
                </FollowWriteInstrument>
                <div style={{ marginTop: "10px" }}>
                  팔로워 {collabo.followerCount} 명
                </div>
              </FollowMiddle>
            </FollowImgText>
            <FollowBtn>
              {acToken === undefined ? (
                ""
              ) : userInfo.nickname === collabo.nickname ? (
                ""
              ) : (
                <button
                  onClick={() => FollowClick(collabo)}
                  style={{
                    backgroundColor: collabo?.isFollowed
                      ? "#ff4d00"
                      : "transparent",
                    color: collabo?.isFollowed ? "white" : "black",
                  }}
                >
                  {collabo?.isFollowed ? "팔로우 취소" : "팔로우"}
                </button>
              )}
            </FollowBtn>
          </FollowTop>
          <FollowContent>{collabo.contents}</FollowContent>
        </FollowTotal>
      ))}
      {detailCollabo?.length > 1 ? (
        followMore ? (
          <div
            onClick={moreClicker}
            style={{
              width: "13rem",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <AiOutlineDown /> 공동 작업자 보기
          </div>
        ) : (
          <>
            {detailFollowAll?.map((collabo, index) => (
              <FollowTotal key={index}>
                <FollowTop>
                  <FollowImgText>
                    <img
                      src={collabo.profileImg}
                      alt=""
                      onClick={() => MypageMove(collabo?.nickname)}
                      style={{ cursor: "pointer" }}
                    />
                    <FollowMiddle>
                      <FollowWriteInstrument>
                        {collabo?.musicPartsList?.map((part, index) => (
                          <div key={index}>{part}</div>
                        ))}
                        <span
                          onClick={() => MypageMove(collabo?.nickname)}
                          style={{ cursor: "pointer" }}
                        >
                          {collabo.nickname}
                        </span>
                      </FollowWriteInstrument>
                      <div style={{ marginTop: "10px" }}>
                        팔로워 {collabo.followerCount} 명
                      </div>
                    </FollowMiddle>
                  </FollowImgText>
                  <FollowBtn>
                    {acToken === undefined ? (
                      ""
                    ) : userInfo.nickname === collabo.nickname ? (
                      ""
                    ) : (
                      <button
                        onClick={() => FollowClick(collabo)}
                        style={{
                          backgroundColor: collabo?.isFollowed
                            ? "#ff4d00"
                            : "transparent",
                          color: collabo?.isFollowed ? "white" : "black",
                        }}
                      >
                        {collabo?.isFollowed ? "팔로우 취소" : "팔로우"}
                      </button>
                    )}
                  </FollowBtn>
                </FollowTop>
                <FollowContent>{collabo.contents}</FollowContent>
              </FollowTotal>
            ))}
            <div
              onClick={moreClicker}
              style={{
                width: "5rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <AiOutlineUp />
              닫기
            </div>
          </>
        )
      ) : (
        ""
      )}
    </FollowAll>
  );
};

export default DetailFollow;

const FollowAll = styled.div`
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #f2f2f2;
  padding: 0 20px 20px;
`;

const FollowTotal = styled.div`
  padding-top: 20px;
`;

const FollowTop = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 80%;
  }
`;

const FollowMiddle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const FollowContent = styled.div`
  margin: 10px auto;
`;

const FollowImgText = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowWriteInstrument = styled.div`
  margin-top: 0.3rem;
  display: flex;
  height: 1.5rem;
  div {
    border: transparent;
    height: 2rem;
    margin-right: 1rem;
    padding: 3px 5px;
    border-radius: 20px;
    background-color: #ff4d00;
    font-size: 1rem;
    color: white;
  }
  span {
    padding: 1px 0;
  }
`;

const FollowBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    width: 10rem;
    height: 3.5rem;
    font-size: 1.5rem;
    background-color: transparent;
    border: 2px solid #ff4d00;
    border-radius: 20px;
    cursor: pointer;
  }
`;
