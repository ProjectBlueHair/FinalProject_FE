import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Div from "../../component/elem/Div";
import Flex, { StFlex } from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import { searchAxios } from "../../dataManager/apiConfig";
import { useAppSelector } from "../../redux/config";
import { searchSelector } from "../../redux/slice/mainSlice";
import theme from "../../styles/theme";
import useTypeModal from "../hooks/useTypeModal";
import TypeModalWrapper from "../TypeModalWrapper";

interface Search {
  id: string;
  contents: string;
  like_count: number;
  music_file: string;
  nickname: string;
  post_img: string;
  isRead: boolean;
  created_at: string;
  title: string;
}
const GAP = "1rem";

const SearchModal = () => {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState<Search[]>([]);
  const { $closeModal, $openModal } = useTypeModal();
  const search = useAppSelector(searchSelector);
  console.log("searchInput ... ", search.value);

  useEffect(() => {
    const identifier = setTimeout(() => {
      const queryObj = {
        query: {
          more_like_this: {
            fields: ["title", "contents", "nickname"],
            like: search.value,
            min_term_freq: 1,
            max_query_terms: 10,
            min_doc_freq: 1,
          },
        },
        _source: {
          include: [
            "title",
            "nickname",
            "post_img",
            "like_count",
            "view_count",
            "id",
            "contents",
          ],
        },
        sort: {
          view_count: "desc",
        },
      };
      searchAxios
        .post(`post/_search?`, queryObj)
        .then(({ data }) => {
          const searchSource = data.hits.hits.map((data: any) => data._source);
          console.log("search .. ", searchSource);
          setSearchState(searchSource);
        })
        .catch((err) => {
          $closeModal();
          $openModal({
            type: "alert",
            props: { message: "" + err, type: "error" },
          });
        });
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [search.value]);

  return (
    <TypeModalWrapper type="search">
      <AlarmContainer hg="100%" direction="column">
        <Flex
          pd="0 0 1rem"
          justify="flex-start"
          fw="700"
          fs="2.5rem"
          borderBottom={`0.3px solid ${theme.color.rgbaBorder1}`}
        >
          검색 결과
        </Flex>
        <Flex direction="column" pd="2rem 0 0">
          {searchState.length === 0 ? (
            <Div>검색 결과가 없습니다.</Div>
          ) : (
            searchState?.map((item, index) => (
              <SearchItem
                key={index}
                onClick={() => {
                  $closeModal();
                  navigate(`/detail/${item.id}`);
                }}
                mg="0 0 0.5rem"
                cursor="pointer"
                direction="row"
                justify="flex-start"
                gap={GAP}
              >
                <Img
                  cursor="pointer"
                  wd="7rem"
                  hg="7rem"
                  radius="5px"
                  src={item.post_img}
                />
                <Flex
                  direction="column"
                  wd="none"
                  flex="1"
                  align="flex-start"
                  gap='0.3rem'
                >
                  <Div fs="1.4rem">{item.nickname}</Div>
                  <Div fs="1.2rem">{item.title}</Div>
                  <Div fs="1.2rem">{item.contents}</Div>
                </Flex>
              </SearchItem>
            ))
          )}
        </Flex>
      </AlarmContainer>
    </TypeModalWrapper>
  );
};

export default SearchModal;
const AlarmContainer = styled(StFlex)`
  direction: column;
  padding: 2rem;
  flex: 1;
  overflow-y: scroll;
  justify-content: flex-start;
`;
const SearchItem = styled(StFlex)`
  border-radius: 5px;
  padding: 0.5rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
