import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pause, playButtonSecond, view } from "../../asset/pic";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  __MainTogglePlay,
  __playDifferentSrc,
} from "../../redux/slice/mainSlice";
import Img from "../elem/Img";
import StLink from "../elem/Link";
import MypageLike from "./MypageLike";

const MypagePlayList = (props) => {
  const L = props.L;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentMusic = useAppSelector((state) => state.main.currentMusic);
  const onClickPlayBtn = () => {
    currentMusic.post.id === props.L.id
      ? dispatch(__MainTogglePlay(!currentMusic.isPlayingPlayer))
      : dispatch(__playDifferentSrc(props.L.id));
  };

  return (
    <MypageMusic>
      <img src={L?.postImg} />
      <RightRow>
        <div>
          <PlayBtn>
            <Img
              wd="1rem"
              src={
                currentMusic.post?.id === props.L?.id
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
          <div>{L?.title}</div>
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
                <MypageLike L={L} />
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
  flex-basis: 250px;
  flex-grow: 0;
  width: 22%;
  img {
    width: 100%;
    height: 15rem;
    border-radius: 10px;
  }
`;

const RightRow = styled.div`
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
    height: 5rem;
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
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
