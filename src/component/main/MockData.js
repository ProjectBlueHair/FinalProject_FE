import nextId from "react-id-generator";
import { mockText, mockAudios } from "./MockResource";
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const mockData = () => {
  const mockTextArr = mockText.split(" ", 451);

  const mockArr = [];

  new Array(100).fill("").map((_, index) => {
    //title
    const ranText =
      mockTextArr[rand(301, 350)] +
      mockTextArr[rand(351, 400)] +
      mockTextArr[rand(401, 450)];

    //nick
    const nickArr = new Array(rand(2, 5)).fill("").map((nick) => {
      return {
        profile: `testRandomPost/${rand(1, 22)}.jpg`,
        nickname: mockTextArr[rand(101, 200)],
      };
    });

    //tag
    const tagArr = new Array(rand(1, 8)).fill("").map((tag) => {
      // return `# ${mockTextArr[rand(201, 300)]}`;
      return mockTextArr[rand(201, 300)];
    });

    mockArr.push({
      postId: nextId(),
      postImg: `testRandomPost/${rand(1, 22)}.jpg`,
      title: ranText,
      audio: mockAudios[rand(0, 3)],
      collabo: nickArr,
      tags: tagArr,
      view: rand(100, 5000),
      like: rand(100, 5000),
    });
  });
  return mockArr;
};
