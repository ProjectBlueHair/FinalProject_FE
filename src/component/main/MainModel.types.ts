export interface Member {
  nickname: string;
  musicPartList: string[];
  profileImg: string;
}

export interface Post {
  id: string | number;
  postImg: string;
  title: string;
  mainProfileList: Member[];
  musicFile: string;
  liked: boolean;
  likeCount: number;
  viewCount: number;
  tagList: string[];
}
export interface CurrentMusic {
  post: Post;
  isPlayingMain: boolean;
  isPlayingPlayer: boolean;
}
export interface LikeModel {
  isLiked: boolean;
  likeCount: number;
  index: number;
}
