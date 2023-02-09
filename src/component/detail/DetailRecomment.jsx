import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { like, view } from "../../asset/pic";
import { searchAxios, searchURL } from "../../dataManager/apiConfig";
import useTypeModal from "../../modal/hooks/useTypeModal";
import Img from "../elem/Img";
import StLink from "../elem/Link";

const DetailRecomment = ({ detail }) => {
  const Title = detail?.title;
  const [ReList, setReList] = useState();
  const { $openModal } = useTypeModal();
  const navigate = useNavigate();

  const detailReCom = async () => {
    const a = {
      query: {
        more_like_this: {
          fields: ["title", "contents"],
          like: Title,
          min_term_freq: 1,
          max_query_terms: 10,
          min_doc_freq: 1,
        },
      },
      _source: {
        include: [
          "title",
          "nickname",
          "post_img",
          "like_count",
          "view_count",
          "id",
        ],
      },
      sort: {
        view_count: "desc",
      },
      size: 5,
    };
    try {
      const {
        data: {
          hits: { hits },
        },
      } = await searchAxios.post(`post/_search?`, a);
      setReList(hits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailReCom();
  }, [Title]);

  const detailMove = (id) => {
    navigate(`/detail/${id}`);
    window.location.reload();
  };
  console.log(ReList);
  return (
    <DetailReComCol>
      <h1>추천 음악</h1>
      {ReList?.length === 1 ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <SearchList>추천 음악이 없습니다!</SearchList>
        </div>
      ) : (
        <>
          {ReList?.map((List, index) =>
            List?._source.title === Title ? (
              ""
            ) : (
              <DetailRightLine key={index}>
                <RecommentImg
                  src={List?._source.post_img}
                  alt="사진"
                  onClick={() => detailMove(List?._source.id)}
                  style={{ cursor: "pointer" }}
                />
                <RecommentText>
                  <RecommentTitle>
                    <div
                      onClick={() => detailMove(List?._source.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {List?._source.title}
                    </div>
                    {/* <Img wd="3rem" src={more} onClick={moreClick} /> */}
                  </RecommentTitle>
                  <RecommentImgViewLike>
                    <div>{List?._source.nickname}</div>
                    <div>
                      <Img
                        wd="1.3rem"
                        src={view}
                        style={{ marginRight: "5px" }}
                      />
                      <span>{List?._source.view_count}</span>
                    </div>
                    <div>
                      <Img
                        wd="1rem"
                        src={like}
                        style={{ marginRight: "5px" }}
                      />
                      <span>{List?._source.like_count}</span>
                    </div>
                  </RecommentImgViewLike>
                </RecommentText>
              </DetailRightLine>
            )
          )}
        </>
      )}
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

const SearchList = styled.div`
  width: 100%;
  display: flex;
  word-break: keep-all;
  font-size: 20px;
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
    color: black;
    background-color: rgba(0, 0, 0, 0.1);
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
