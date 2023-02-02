import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { like, redLike } from "../../asset/pic";
import { getCookies } from "../../dataManager/cookie";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { __postLike } from "../../redux/slice/detailSlice";
import Img from "../elem/Img";

const MypageLike = ({ L, getArchive2 }) => {
  const dispatch = useDispatch();
  const { nickname } = useParams();
  const acToken = getCookies("accesstoken");
  const { $openModal, $closeModal } = useTypeModal();
  const MyLikes = async (Likes) => {
    await dispatch(__postLike(Likes));
    getArchive2(nickname);
  };

  const NotLike = () => {
    $openModal({
      type: "alert",
      props: {
        message: "로그인이 필요한 페이지 (기능) 입니다.",
        type: "error",
      },
    });
  };
  return (
    <div>
      {acToken === undefined ? (
        <Img
          wd="1rem"
          src={like}
          onClick={NotLike}
          style={{ cursor: "pointer" }}
        />
      ) : L?.liked ? (
        <Img
          wd="1rem"
          src={redLike}
          onClick={() => MyLikes(L?.id)}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <Img
          wd="1rem"
          src={like}
          onClick={() => MyLikes(L?.id)}
          style={{ cursor: "pointer" }}
        />
      )}
      <div>{L?.likeCount}</div>
    </div>
  );
};

export default MypageLike;
