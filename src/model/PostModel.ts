
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
    likeCount: number;
    viewCount: number;
    tagList: string[];
  }
  export interface CurrentMusic {
    post: Post;
    isPlayingMain: boolean;
    isPlayingPlayer: boolean;
  }
  export interface Response { 
    customHttpStatus : number | string
    msg : string
    data : Post []
  }