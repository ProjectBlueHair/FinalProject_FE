import App from "../App";
import PostingAudioControlBox from "../component/posting/PostingAudioControlBox";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingPage from "../page/PostingPage";
import { render } from "./render";

describe("<Controlbox/> test", () => {
  it("having part", () => {
    const util = render(<PostingFormAudio isCollabo={true} />);
    const str = util.getByTestId("testdiv");
    expect(str).toBeInTheDocument();
  });
});
