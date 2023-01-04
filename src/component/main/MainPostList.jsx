import React from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { mockText } from "./mockText";
const MainPostList = () => {
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const mockTextArr = mockText.split(" ", 100);
  const textRan1 = rand(1, 100);
  const textRan2 = rand(1, 100);
  const textRan3 = rand(1, 100);
  const ranText =
    mockTextArr[textRan1] + mockTextArr[textRan2] + mockTextArr[textRan3];

  const nickRan1 = rand(1, 100);
  const nickRan2 = rand(1, 100);
  const nickRan3 = rand(1, 100);
  const nickRan4 = rand(1, 100);
  const arr = new Array(100).fill("");
  const arr2 = [];

  arr.map((_, index) => {
    const ran = rand(1, 22);
    console.log("ran", ran);
    const bigRan = rand(100, 5000);
    arr2.push({
      postImg: `testRandomPost/${ran}.jpg`,
      title: { ranText },
      collabo: [
        {
          profile: `testRandomPost/${ran}.jpg`,
          nickname: mockTextArr[nickRan1],
        },
        {
          profile: `testRandomPost/${ran}.jpg`,
          nickname: mockTextArr[nickRan2],
        },
        {
          profile: `testRandomPost/${ran}.jpg`,
          nickname: mockTextArr[nickRan3],
        },
        {
          profile: `testRandomPost/${ran}.jpg`,
          nickname: mockTextArr[nickRan4],
        },
      ],
      view: { bigRan },
      like: { bigRan },
    });
  });

  return (
    <Grid>
      {arr2.map((obj) => (
        <Img type="postImg" src={obj.postImg} />
      ))}
    </Grid>
  );
};

export default MainPostList;
const Grid = styled.div`
  overflow-y: scroll;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
