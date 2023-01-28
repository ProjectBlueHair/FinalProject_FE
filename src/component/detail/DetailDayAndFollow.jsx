import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailFollow from "./DetailFollow";
import DetailComment from "./detailcomment/DetailComment";
import { __getDetailCollabo } from "../../redux/slice/detailSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import Img from "../elem/Img";
import { save, share, collaboPlus, report } from "../../asset/pic";
import { PATH } from "../../Router";
import StLink from "../elem/Link";

const DetailDayAndFollow = ({ detail }) => {
  const { id } = useParams();
  const [contentMore, setContentMore] = useState(false);
  // 100줄 넘어가면 더보기 보이게 만듬
  const textLimit = useRef(100);
  const navigate = useNavigate();
  const shortContent = detail?.contents.slice(0, textLimit.current);

  return (
    <DetailLeftTotal>
      <DetailMiddleTop>
        <DetailShareLine>
          <div>
            <div>
              <Img wd="3rem" src={save} />
              <div>보관함 추가</div>
            </div>
            <div>
              <Img wd="3rem" src={share} />
              <div>공유</div>
            </div>
            <div>
              <Img wd="3rem" src={report} />
              <div>신고</div>
            </div>
          </div>
          <div>
            <div>
              <div onClick={() => navigate(`${PATH.collabo}/${id}`)}>
                <Img wd="3.5rem" src={collaboPlus} />
                <div>콜라보 하기</div>
              </div>
            </div>
          </div>
        </DetailShareLine>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {detail?.tagList.map((tag, index) => (
            <StLink to={`/tag/${tag}`} key={index}>
              <div style={{ color: "#ff4d00" }}># {tag}</div>
            </StLink>
          ))}
        </div>
        <div style={{ color: "#ff4d00", marginTop: "5px" }}>설명</div>
        <div style={{ marginTop: "5px" }}>
          <div>{contentMore ? detail?.contents : shortContent}</div>
          <div onClick={() => setContentMore(!contentMore)}>
            {detail?.contents?.length > shortContent?.length ? (
              contentMore ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <AiOutlineUp /> 간략히
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <AiOutlineDown /> 더보기
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div style={{ color: "#ff4d00", marginTop: "5px" }}>콜라보 요청</div>
        <div style={{ marginTop: "5px" }}>{detail?.collaboNotice}</div>
      </DetailMiddleTop>
      <div>
        <DetailFollow />
        <DetailComment />
      </div>
    </DetailLeftTotal>
  );
};

export default DetailDayAndFollow;

const DetailLeftTotal = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  margin: 1px;
  /* border: 1px solid black; */
  border-radius: 20px;
`;

const DetailShareLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const DetailMiddleTop = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #f2f2f2;
  padding: 10px 20px;
`;
