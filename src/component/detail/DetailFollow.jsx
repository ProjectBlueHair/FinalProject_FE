import React from "react";
import styled from "styled-components";

const DetailFollow = () => {
  return (
    <FollowTotal>
      <FollowTop>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsiIHX_L4Iy-eHEBImI46cxFgNGF0UuJkSIg&usqp=CAU"
          alt=""
        />
        <FollowMiddle>
          <FollowWriteInstrument>
            <div>악기</div>
            <span>작성자</span>
          </FollowWriteInstrument>
          <div>팔로우수</div>
        </FollowMiddle>
        <FollowBtn>
          <button>팔로우</button>
        </FollowBtn>
      </FollowTop>
      <FollowTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est
        porro rerum non, et earum dignissimos consectetur quo error aut
        repellendus asperiores veritatis eveniet, qui aliquid nobis maxime
        incidunt eligendi.
      </FollowTitle>
      <FollowTop>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsiIHX_L4Iy-eHEBImI46cxFgNGF0UuJkSIg&usqp=CAU"
          alt=""
        />
        <FollowMiddle>
          <FollowWriteInstrument>
            <div>악기</div>
            <span>작성자</span>
          </FollowWriteInstrument>
          <div>팔로우수</div>
        </FollowMiddle>
        <FollowBtn>
          <button>팔로우</button>
        </FollowBtn>
      </FollowTop>
      <FollowTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est
        porro rerum non, et earum dignissimos consectetur quo error aut
        repellendus asperiores veritatis eveniet, qui aliquid nobis maxime
        incidunt eligendi.
      </FollowTitle>
      <FollowTop>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsiIHX_L4Iy-eHEBImI46cxFgNGF0UuJkSIg&usqp=CAU"
          alt=""
        />
        <FollowMiddle>
          <FollowWriteInstrument>
            <div>악기</div>
            <span>작성자</span>
          </FollowWriteInstrument>
          <div>팔로우수</div>
        </FollowMiddle>
        <FollowBtn>
          <button>팔로우</button>
        </FollowBtn>
      </FollowTop>
      <FollowTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est
        porro rerum non, et earum dignissimos consectetur quo error aut
        repellendus asperiores veritatis eveniet, qui aliquid nobis maxime
        incidunt eligendi.
      </FollowTitle>
    </FollowTotal>
  );
};

export default DetailFollow;

const FollowTotal = styled.div`
  width: 85rem;
  display: flex;
  flex-direction: column;
`;

const FollowTop = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  img {
    width: 5.5rem;
    height: 5rem;
    border: 1px solid black;
    border-radius: 80%;
  }
`;

const FollowMiddle = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowWriteInstrument = styled.div`
  margin-top: 0.3rem;
  display: flex;
  width: 20rem;
  height: 1.5rem;
  div {
    border: solid 1px black;
    height: 2rem;
    margin-right: 1rem;
    padding: 3px 5px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 1rem;
  }
  span {
    padding: 1px 0;
  }
`;

const FollowBtn = styled.div`
  width: 65rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    width: 8rem;
    height: 3.5rem;
    font-size: 1.5rem;
    background-color: transparent;
    border: 2px solid #ff4d00;
    border-radius: 20px;
  }
`;

const FollowTitle = styled.div`
  margin-top: -15px;
`;
