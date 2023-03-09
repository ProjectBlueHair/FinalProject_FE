import { apiClient } from "./interceptors";

export const kakao = async (post) => {
  console.log("kP", post);
  try {
    const data = await apiClient.get(`member/kakao/callback?code=${post}`);
    console.log("kD", data);
    return data;
  } catch (error) {
    alert(error);
  }
};
