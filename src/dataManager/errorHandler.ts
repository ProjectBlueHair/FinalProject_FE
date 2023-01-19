import { Response } from "../model/ResponseModel";

export const handleError = (data: Response) => {
  if (data.customHttpStatus === 2000 || data.customHttpStatus === 4015) {
    return data.data;
  } else if (data.customHttpStatus === 4011) {
    throw new Error("4011 : 로그인이 필요한 페이지 (기능) 입니다.");
  } else if (data.customHttpStatus === 4013) {
    throw new Error("유효하지 않은 로그인 정보입니다. 재로그인이 필요합니다.");
  } else if (data.customHttpStatus === 4003) {
    throw new Error("유효하지 않음 음원입니다. WAV 형식을 이용해 주세요.");
  } else if (data.customHttpStatus === 4041) {
    throw new Error("존재하지 않는 게시물입니다. ");
  } else {
    throw new Error(data.message);
  }
};
