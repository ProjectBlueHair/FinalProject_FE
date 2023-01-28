import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { more, like, view } from "../../asset/pic";
import { instanceAxios } from "../../dataManager/apiConfig";
import { useNavigate } from "react-router-dom";
import useTypeModal from "../../modal/hooks/useTypeModal";

const DetailRecomment = () => {
  const [ReList, setReList] = useState();
  const navigate = useNavigate();
  const { $openModal, $closeModal } = useTypeModal();
  const detailReCom = async () => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get("/post");
      setReList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailReCom();
  }, []);

  const detailMove = (id) => {
    navigate(`/detail/${id}`);
    window.location.reload();
  };

  // const moreClick = () => {
  //   $openModal({
  //     type: "alert",
  //     props: {
  //       message: "해당 기능은 곧 준비될 예정입니다 !",
  //       type: "confirm",
  //     },
  //   });
  // };

  return (
    <DetailReComCol>
      <h1>추천 음악</h1>
      {ReList?.map((List) => (
        <DetailRightLine key={List.id} onClick={() => detailMove(List.id)}>
          <RecommentImg src={List.postImg} alt="사진" />
          <RecommentText>
            <RecommentTitle>
              <div>{List.title}</div>
              {/* <Img wd="3rem" src={more} onClick={moreClick} /> */}
            </RecommentTitle>
            <RecommentTag>
              <div>해시태그 값없음</div>
            </RecommentTag>
            <RecommentImgViewLike>
              <RecommentProfile>
                {List.mainProfileList.map((imgurl, index) => {
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
                    return <div key={imgurl.id}>+</div>;
                  }
                })}
              </RecommentProfile>
              <div>
                <Img wd="1.3rem" src={view} style={{ marginRight: "5px" }} />
                <span>{List.viewCount}</span>
              </div>
              <div>
                <Img wd="1rem" src={like} style={{ marginRight: "5px" }} />
                <span>{List.likeCount}</span>
              </div>
            </RecommentImgViewLike>
          </RecommentText>
        </DetailRightLine>
      ))}
    </DetailReComCol>
  );
};
export default DetailRecomment;

const DetailReComCol = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 20px;
  margin-left: 10px;
  border-radius: 20px;
  width: 27%;
  h1 {
    margin-bottom: 10px;
  }
`;

const DetailRightLine = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: white;
`;

const RecommentImg = styled.img`
  width: 12rem;
  height: 12rem;
  border: 1px solid #e7e7e7;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const RecommentText = styled.div`
  width: 65%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  position: relative;
  left: -15px;
  padding: 0 0 0 25px;
  flex-direction: column;
  justify-content: center;
  div {
    margin: 3px 0 0;
  }
`;

const RecommentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecommentTag = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 1.5px 3px;
    font-size: 1rem;
    margin-right: 5px;
  }
`;

const RecommentImgViewLike = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  span {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const RecommentProfile = styled.div`
  width: 8rem;
  display: flex;
  align-items: center;
  img {
    width: 3rem;
    height: 3rem;
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
  div {
    border-radius: 50px;
    width: 2.9rem;
    height: 2.9rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;
    position: relative;
    margin-left: -15px;
    z-index: 0;
    padding: 0 0 2px 3px;
  }
`;
