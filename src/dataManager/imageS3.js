import AWS from "aws-sdk";
import uuid from "react-uuid";

// 이미지 업로드 로직
const AK = process.env.REACT_APP_AK;
const BK = process.env.REACT_APP_BK;
const SK = process.env.REACT_APP_SK;

export const uploadFiles = (file) => {
  if (file === null || undefined) {
    return Promise.resolve(file);
  } else {
    const KEY = uuid();
    const TYPE = file.type.split("/")[1];
    AWS.config.update({
      accessKeyId: AK,
      secretAccessKey: SK,
    });
    return new AWS.S3.ManagedUpload({
      params: {
        Bucket: BK,
        Key: `${KEY}.${TYPE}`,
        Body: file,
      },
    }).promise();
  }
};
