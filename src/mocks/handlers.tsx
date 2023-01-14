import { rest } from "msw";
import { mockData } from "../component/main/MockData";
import { Post } from "../model/PostModel";

const postList = mockData();
export const handlers = [
  rest.get("/post", (req, res, ctx) => {
    const { searchParams } = req.url;
    const size = 20;
    const page = Number(searchParams.get("page"));
    return res(
      ctx.status(200),
      ctx.json({data:postList.slice(page * size, (page + 1) * size)})
    );
  }),
  rest.post("/post/*", (req, res, ctx) => {
    const newPost = req.json()
    console.log('newPost',newPost)
    const newPostList = [newPost, ...postList]
    return res(
      ctx.status(200),
      ctx.json(newPostList)
    );
  }),
  rest.post("/post/:id/collabo", (req, res, ctx) => {
    const { id } = req.params
    const existingPost  = req.json()
    return res(
      ctx.status(200),
      ctx.json(existingPost)
    );
  }),
];

