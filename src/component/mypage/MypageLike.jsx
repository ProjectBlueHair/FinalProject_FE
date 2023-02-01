import { useDispatch } from "react-redux";
import { like, redLike } from "../../asset/pic";
import { __postLike } from "../../redux/slice/detailSlice";
import Img from "../elem/Img";

const MypageLike = ({ L }) => {
  const dispatch = useDispatch();

  const MyLikes = async (Likes) => {
    await dispatch(__postLike(Likes));
  };
  return (
    <div>
      {L?.liked ? (
        <Img wd="1rem" src={redLike} onClick={() => MyLikes(L?.id)} />
      ) : (
        <Img wd="1rem" src={like} onClick={() => MyLikes(L?.id)} />
      )}

      <div>{L?.likeCount}</div>
    </div>
  );
};

export default MypageLike;
