import { instanceAxios } from "../../../dataManager/apiConfig";

export const getAlarmCount = () => {
    return instanceAxios.get("/notification/count");
  };