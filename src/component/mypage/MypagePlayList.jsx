import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { more, pause, playButtonSecond, view } from "../../asset/pic";
import { instanceAxios } from "../../dataManager/apiConfig";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { __getUserInfo } from "../../redux/slice/detailSlice";
import {
  __getPostList,
  __MainTogglePlay,
  __playDifferentSrc,
} from "../../redux/slice/mainSlice";
import Img from "../elem/Img";
import StLink from "../elem/Link";
import MypageLike from "./MypageLike";

const MypagePlayList = ({ L, getArchive }) => {
  const navigate = useNavigate();
  const { $openModal } = useTypeModal();
  const { nickname } = useParams();
  const [archiveDel, setArchiveDel] = useState(false);
  const Del = useRef(null);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const dispatch = useAppDispatch();
  const currentMusic = useAppSelector((state) => state.main.currentMusic);

  const user = useSelector((state) => state.user.user);
  useToggleOutSideClick(Del, setArchiveDel);
  const onClickPlayBtn = () => {
    currentMusic.post.id === L.id
      ? dispatch(__MainTogglePlay(!currentMusic.isPlayingPlayer))
      : dispatch(__playDifferentSrc(L.id));
  };
  const archiveDelete = async (nick) => {
    try {
      const { data } = await instanceAxios.delete(`post/archive/${nick}`);
      if (data.customHttpStatus === 2000) {
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
        getArchive(user?.nickname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MypageMusic>
      <img
        src={L?.postImg}
        onClick={() => navigate(`/detail/${L?.id}`)}
        style={{ cursor: "pointer" }}
      />
      <RightRow>
        <div>
          <PlayBtn>
            <Img
              wd="1rem"
              src={
                currentMusic.post?.id === L?.id
                  ? currentMusic.isPlayingPlayer
                    ? pause
                    : playButtonSecond
                  : playButtonSecond
              }
              onClick={onClickPlayBtn}
            />
          </PlayBtn>
        </div>
        <RightCol>
          <MoreBtn>
            <div>{L?.title}</div>
            <div>
              {user.nickname === nickname ? (
                <div ref={Del}>
                  <Img
                    wd="1rem"
                    src={more}
                    onClick={() => setArchiveDel(!archiveDel)}
                    style={{ cursor: "pointer" }}
                  />
                  <div>
                    {archiveDel ? (
                      <ArchiveBox
                        onClick={() => archiveDelete(L.id)}
                        style={{ cursor: "pointer" }}
                      >
                        삭제
                      </ArchiveBox>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </MoreBtn>

          <RightProfileAndLike>
            <RightProfile>
              {L?.mainProfileList.map((imgurl, index) => {
                if (index < 3) {
                  return (
                    <img
                      key={index}
                      className={"img" + index}
                      src={imgurl.profileImg}
                      alt=""
                    />
                  );
                } else if (index < 4) {
                  return <span key={imgurl.id}>+</span>;
                }
              })}
            </RightProfile>
            <RightViewLike>
              <div>
                <Img wd="0.5rem" src={view} />
                <div>{L?.viewCount}</div>
              </div>
              <div>
                <MypageLike L={L} getArchive={getArchive} />
              </div>
            </RightViewLike>
          </RightProfileAndLike>
        </RightCol>
      </RightRow>
      <HashDiv>
        {L?.tagList?.map((tags, index) => (
          <StLink to={`/tag/${tags}`} key={index}>
            <button># {tags}</button>
          </StLink>
        ))}
      </HashDiv>
    </MypageMusic>
  );
};

export default MypagePlayList;

const MypageMusic = styled.div`
  flex-grow: 0;
  width: 90%;
  img {
    width: 100%;
    height: 15rem;
    border-radius: 10px;
  }
`;

const RightRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightProfileAndLike = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;
const RightProfile = styled.div`
  display: flex;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
  .img0 {
    position: relative;
    margin-left: 0;
    z-index: 3;
  }
  .img1 {
    position: relative;
    margin-left: -15px;
    z-index: 2;
  }
  .img2 {
    position: relative;
    margin-left: -15px;
    z-index: 1;
  }
  span {
    border-radius: 50px;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: -15px;
    z-index: 0;
    padding: 0 0 2px 7px;
  }
`;

const RightViewLike = styled.div`
  display: flex;
  margin-left: 5px;
  div {
    margin-left: 5px;
    display: flex;
    align-items: center;
    font-size: 11px;
  }
  img {
    width: 1rem;
    height: 1.5rem;
  }
`;

const PlayBtn = styled.div`
  margin: 5px 10px 0 0;
  border: transparent;
  width: 5rem;
  height: 5rem;
  img {
    cursor: pointer;
    height: 5rem;
  }
`;

const RightCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MoreBtn = styled.div`
  width: 95%;
  display: flex;
  padding-top: 10px;
  position: relative;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const HashDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;
  gap: 5px;
  button {
    border: transparent;
    padding: 3px 7px;
    border-radius: 10px;
    font-size: 12px;
  }
`;

const ArchiveBox = styled.div`
  width: 5rem;
  height: 3rem;
  border: 1px solid black;
  position: absolute;
  border: 1px solid #ff4d00;
  border-radius: 10px;
  display: flex;
  z-index: 1000;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
