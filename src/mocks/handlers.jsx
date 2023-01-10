import { rest } from "msw";
import { mockData } from "../component/main/MockData";

const postList = mockData();
export const handlers = [
  rest.get("/post", (req, res, ctx) => {
    const { searchParams } = req.url;
    const size = 20;
    console.log('params',searchParams.get('page'))
    const page = Number(searchParams.get("page"));
    const totalCount = postList.length;
    const totalPages = Math.round(totalCount / size);
    return res(
      ctx.status(200),
      ctx.json({
        posts: postList.slice(page * size, (page + 1) * size),
        isLastPage: totalPages < page,
      })
    );
  }),
];
