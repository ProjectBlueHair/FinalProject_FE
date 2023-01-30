import React from "react";
import styled from "styled-components";
import { playButtonSecond, pause, view, like } from "../../asset/pic";
import Img from "../elem/Img";
import StLink from "../elem/Link";

const MypagePlayList = () => {
  const url = [
    {
      url: "data:image/jpeg;base64,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",
    },
    {
      url: "data:image/jpeg;base64,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",
    },
    {
      url: "data:image/jpeg;base64,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",
    },
    {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFRUWFxcYFxcYFRUYFRgVFRUWFhUXFRcYHSggHRolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUtKy0tLSstLS0tLS0tKy0tLS0tLS0tLS0tLS0uLS0tLS0tLS0tLS0tLS0tMisrKy0tLf/AABEIANQA7gMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQYBB//EADsQAAIBAgMFBQYCCgMBAAAAAAABAgMRBCExBRJBUWEGInGBkROhscHh8CPRBzJCUmJygpKy8RQzwhX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/8QAKhEAAgIBBAEDAwQDAAAAAAAAAAECEQMEEiExQRMiMkJRYRRxgZEFIzP/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAABDjMQqcJTlpFNu2uXImNX2mhfDVOiT9JJnGSTjFtExVtIt7Px0K0FODutOqa1TXBlk+e9idqezrSpSfdqaclNaeqy9D6EV6fN6sL8lmXHslQABeVAAAAAjrVVGLlJ2SzbAJAcBtztJUlNxjdQ4JPP+poqdme00o4mNOUrwm1Fq97Nuyfjcx/rI79tfyX/p5bbPpQANhQAAAAAAAAAAAAAAAAAAAAAAAADVdpcRGOHmnrJOKXV/lqbU4LtdjpVKyhTV1HK/C9+8/l5GbV5fTxv88F2CG+aOTjLvcrH0/s3tlV6dnlUiu8uf8SOGezYvOWvoSUKe496Laa0d9PQ8jT6h4ZX48m/NjWRfk+ng4ij2lrx13Z+K+asXo9q5Wzoq/wDN9D1I67C/JhemyLwdSDl4dr1+1RflK/yJ12tpcYTT/p/MsWrwv6jn0Mn2N7XrRgnKTSS1bOF7R7edR7sclwXzl1+BU7Tdo3Ueu7Tjey682+LOZpVmoubecs83ouBjz6n1PbHo0YsG3l9lzEVVaz19DSy7k7rg7nlfFZ3TJKTUosocaVmiHHB9x2biPaUqdT9+EZeqTZZNL2NnfBUX/C16Skvkbo9mDuKZ5klTaAAOjkAAAAAAAAAAAAAAAAAAGFWrGKvKSS5tpL3lDam0dzux/W4vhFfmc/WvJ3bu+bd2ZM2qUHS5ZdjwuXLNrtDbd040v73p/SuPi/eaCNFIym87InptJdTz55JZZXI1KKxrg11fI1letZm12jJI0lFXd3wM+Rc0i2D8snpzZZhMiVJsOnla3qyI4g8hLUkrGux2HbW8tY5259C0penuM2iGqJUjkp1nVmovJJ5rw5lnadNOGtkl6mz2ns1SanFeJxnaXaMs6cLpaSl4/spmnEt7SQnKlZroS3qjim3ZnYUcP3Ejn+zmzG2pPJHY0oRlUp095LelGPk3a5bqJfSivG2uWfT+ylLdwlFfwX/ubl8zbGFGmoxUUrJJJLoskZnqxVRSPObt2AAdEAAAAAAAAAAAAAAAAxqSsm+Sb9DIwqxTi09Gmn4NEPoHJVJyk23m27vzIMVVUItyySTbfJLU3eFoKKuaHtTUg4pSinBzSlfTdvnc8n0W+32bPU+xxdT9I2HjNRdKrGLf/Y1ZW52fA6nA4xThvp5cHzufH8bi8Q5xcZ+0mpySVlK0pNqW7F3WrfufA+n9ndnSpUIUp3uln4vX76HeeEMcVXYg5SfJJjqjehBgqbbNpUoJ5W0IpNRfgYq5tl90qRb3UlkQYqmmvuxq9rdoKVGN5O7vaMY5ylLgkl1Ocx/bTEUJL/lYOrShP9WTWVuj0bXFJmpYpSXtKNyT5OkmpJ539UWKcihgdr0sRBThJOL0ed0+TvxLlOP39TJJNOmXpqizTVzXbU2JGos0nnfzNjBWJY1CKd8EpnNRoqPdaIdmeyjO8d5ycruUs3rouSRvdoYZPNHLU9+NazV1fJ2EZN2WpJn3LZeL9rTUuOj8Vr+fmWzkOxuJ7zj+8ves/hc689zTZPUxpnlZYbZNAAF5WAAAAAAAAAAAAAAACvjZ2jbnl5cSwazaE+9bkvjr8ivJKokrshqSyObxdJ1LxeazX+jfVq8Ixc5SUYxV23kl4nKY3tbh1Jqmt5/vXSVuhhyQlLmJfjkl2ZYTYlKlJyjC83xedi9ClzNLDtTSbs7xb0vp6o3GHrbyTvryzM88U7uRfHIukZVLJPI57bcJfsPM6OsjW4jD3ehVJNM7TR8z2BW3MdKdfOcVJQu72np8DntrYmtOrJzlvXnNuKk8rvNWXl6H2PHbMpzznTT62z8UyCjseindwv0bv6noR1MYrkyyxNs5LsL2eqxbqNuMJLONsnLhZ8187cD6BSw0kS4flayWi4I2NKCsZ51lluLE9io1cqRj7Nov4maWVs3zPFHnY4eE6WQ1tSJqcTg057zOirUrlCvSszNkhtdovxzNp2Rf40P6v8Wd2fPNi1PZ1oTeiefg8n8T6Gj1P8e/9bX5MWp+dgAG8zgAAAAAAAAAAAAAAGM5WTfI5/EVJuV7LP8Ai/NG7xz/AA5eDNBVqS1yXTNszah8pFkDlf0rKc8F7Ok+9vKW6v2lFN7vwfkfCqjmkr3UrZrjc+x/pAaq03B5O6a0VmnlmfIsVSalZrmWY6o5ZWw+0ql7OTy0u/dmfWP0X4+c4zUpNwy3ej429T5nhNmupJXtbw73+j6r2SwaowtFJ3s1yzy104MTpolM7apbSxTnA8hKbWcorwWWuRi6jvrfyPOyRVmiDdFiFNPVHn/Ejm1qZJ24+49VY6UEc72RKjbh9+BZjI8vdEd1xudVRHLJ5OL1VyKVuhDUq2IJ1ThslInnIpYmoj2U2a+vO7M+V8F+NF2DyR3OwsTv0Y8491+WnuscDTlzOo7J4nvSg3k1dLqvp8CzRT25K+5xnVxs6cAHsmIAAAAAAAAAAAAAAAr49fhy8G/TM0Nd93P0OjrQ3ouPNNeqsc7UjnZ8MjJqO0y3GcF2ywrUXUt3Vxvx4WR8wxu06Sl3oTWqu0vvWx9y29glWpSptZarLjwPk23dgSpy3bJr1RGKS8kyRRwNeF1KE1bWztdK9skfQNk17xWc7fzK3e1WXBLifMZbHbSfs2vBPL7+ZtNn7UxGFyXejykm8r5pcSyfK4OV+T6dTkkkkslle+dlpcknVUfv3HD1u02Kmr0qUIprLeu5db2PMI8ZVffqOPSKV7WafiuKMksbbtsuTPoNHFbyyJVWfFmuwNCUYxu22lq7XZaWbscOT6JomdVt5XDl43EY2DjzJ5IMVBsz9mlwJYzS0PHU6oikSU8S3bJWNZON39DY4qtll6/ka9Tz5dc8zLkasvgiRyz42XM3WxKtqkHey3l6PI0UJmwwlazXM5xSqSZMo2j6UCHCVd6EZc0n7iY+hTtWeYAASAAAAAAAAAAAAAaTalPdnfg8/Pibs1O35WjHz+RRqF7LO8fyNHiZXNLtTZSqLk9f9m5nJMhm7Hn7vJpo5iOxWs3bw52Pa+xoSt3ToKmZXrRstSPUZNI1f/y03wS5Fuhg4wJJc9TGS4nPJJNv8EY3sRRj9os0afF5krkjoypyuSqOV7+Q9nxR5Ksyzrs47MZZcStUqpkk58sirVVloU5HSLIor1ql3pl6ENZrnboKkkur95SlVb5mXlmmMSaEnfSxsqE9LFChAvUY53BEjvezOJ3qW69YfB5r5m4Ob7KVHeUeifo/qdIe9ppbsaPNyqpsAAvKwAAAAAAAAAAAAaPtDLOK6fF/Q3hzm15b1R9MvT63M+pfsosxfI08nY89pcmqRKlSB5fKNfZ5IiqMxda2pj7dEbgeXsYp6mM66TZH7Zeo3AlTLkcQlx95rXWPHNto6UiKs2c6qI1JvXTyIacMrsmztkvNv5HVvycnk4XfLzIK3Vpkyg872bIajt9CufJZE11eV+ZhQo3dl9+ZsKdFyecGlzeRahhY/ehUsbZZ6iSK0KC0VvmW6NGxLCkuH0M3AtWOityOg7LUlacuOSXhn9PQ35quzkPwr837kkvzNqevgVY0YsjuTAALjgAAAAAAAAAAAAHN11dt9X8TpDnsS0pyS0TZl1XSLcfkoVkU6kS7WZUqmJouRQrxvqUZ0bGwqRuVrlLRYmVXSvxPIYZ9GT7l3cnhS6iKsNkdHC34ffmXKdJJCFJ6p28j1yWl/vqXJUVtmE5u+WnMz1y+/MyUo8DypSusnbr+YYHsuR6qNz2Lks36onhmFEWIQQUOh7KV+PogpcLE0LMW+hhURNKsllf3FWtU6s5m6RMVydR2VqXpSXKXyRujnuxs06c/5vivodCelp3eKJmy/NgAFxwAAAAAAAAAADCrUUVdkN0CDH4ncWX6z0/M5+UdS5Wm5Scn5LkuCK1dHmZZvJK/Bpgtqop1GV5MmrMqTbKmztIiqS+7lTcu2y60VpROWdENSLWhPSV9VnzPYoys7ZkxRDZk8tM/UQlfg/mhBv7+Zldfy/fxLDk8kl+s5O2mXAmptPO9kutyLfirLRPpxJITi9PdoEQZVcLGdt6Tss1Z8fIzo00tMxGPDgZ+xtodIgmaXIw9ojDefEwqVbLmQ5USke1J8vma7FVTOtXXI12ImZMs76NGOJ2fYZfh1H/El6L6nTHMdgX+DP8An/8AKOnPY0v/ABiYs3zYABoKgAAAAAAAAAajFVt+WX6q06vmWdp1rLdWsv8AHj+Rr6kt1GTUTv2/2Wwj5Cd34FauzKlUIa0jLZbtplSqU6rLFZlaoiqRYiHfMYCaPN6yK0+TokjZGdPPO3gRKRnCa6/ItTK2SRkiRLmR7y4Kx7vWWXE7s5PZ009TD/jNWceHv8T3eehKqo4JGHqN+PXmT7/MrPJ3WfNGSdyNwokn0K03d2ZPGCfQSp9PNXOWrOk6NTjYWKCnn0N7jad4mjqxsZMkaZoxytHb9gqi9nUjykn/AHK3/k6k4zsLK05R5wv6SX5nZnt6N3hR5+de9gAGkqAAAAAAAB5KVld6IA0dSrvVJSfBuK8IuxUxtQ8hXvd822vBtsq15ZnkZZ8WbIR5MZVutjGVTqRVIt/6K04uOdn1M6nRc42TzkRTKksZzVkZqrfNHSkmctUeysYLXMyMZcyWjmz2T8/vgYxk+H1sZNq/IxbzzZNEEikz2M+OpFGN3lYyefkSQS75hDLLNfA8kuuZI3cEmUZeXlkS0/H0K0G9NFwJlPgSgybeJoPxIUZwbRYjhmGK0ZzeIlnY6LGVO6znKss2zLn7NGLo6zsLC9WUlpGFn4ykrf4s7Y439H+JjapTbtNtSXWKVsvD5nZHr6VViRizO5sAA0FQAAAAAAKG3JWoz/pXk5JP3AHGT4P9jqHyRzlF5HjV2kAeVkSo1wfLJY01Yr1aaTAK9qO7ZQdFN2aKuLoKOauunAA5jFBsxpszkgC+kVnsFcQ1sAdUiLPYo8ccrgENEIyT0MtGAQkdMxerJVIAJCyWnPK5DPFSva4BZSIRjWm2jV+zVwChpbi6L4LNGNs1dNaNOzXg0dFsjb9bfjTk1NNPOS72S5q3vPAasbqXBXlSaOwpyuk+aTMwD0DEAAAf/9k=",
    },
  ];

  return (
    <MypageMusic>
      <img src="data:image/jpeg;base64,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" />
      <RightRow>
        <div>
          <PlayBtn>
            <Img wd="1rem" src={playButtonSecond} />
          </PlayBtn>
        </div>
        <RightCol>
          <div>제목</div>
          <RightProfileAndLike>
            <RightProfile>
              {url.map((imgurl, index) => {
                if (index < 3) {
                  return (
                    <img
                      key={index}
                      className={"img" + index}
                      src={imgurl.url}
                      alt=""
                    />
                  );
                } else if (index < 4) {
                  return <span key={imgurl.id}>+</span>;
                }
              })}
            </RightProfile>
            <RightViewLike>
              <div>
                <Img wd="1rem" src={view} />
                <div>count</div>
              </div>
              <div>
                <Img wd="2rem" src={like} />
                <div>count</div>
              </div>
            </RightViewLike>
          </RightProfileAndLike>
        </RightCol>
      </RightRow>
      <HashDiv>
        <StLink to={`/tag/1`}>
          <button># ㅎㅇ</button>
        </StLink>
      </HashDiv>
    </MypageMusic>
  );
};

export default MypagePlayList;

const MypageMusic = styled.div`
  flex-basis: 250px;
  flex-grow: 0;
  width: 22%;
  img {
    width: 100%;
    height: 13rem;
    border-radius: 10px;
  }
`;

const RightRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightProfileAndLike = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;
const RightProfile = styled.div`
  display: flex;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
  .img0 {
    position: relative;
    margin-left: 0;
    z-index: 3;
  }
  .img1 {
    position: relative;
    margin-left: -15px;
    z-index: 2;
  }
  .img2 {
    position: relative;
    margin-left: -15px;
    z-index: 1;
  }
  span {
    border-radius: 50px;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: -15px;
    z-index: 0;
    padding: 0 0 2px 7px;
  }
`;

const RightViewLike = styled.div`
  display: flex;
  margin-left: 3px;
  div {
    margin-left: 3px;
    display: flex;
    align-items: center;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const PlayBtn = styled.div`
  margin: 5px 10px 0 0;
  border: transparent;
  width: 5rem;
  height: 5rem;
  img {
    height: 5rem;
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const HashDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;
  gap: 5px;
  button {
    border: transparent;
    padding: 3px 7px;
    border-radius: 10px;
    font-size: 12px;
  }
`;
