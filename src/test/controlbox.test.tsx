import App from "../App";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingAudioControlBox from "../component/posting/PostingAudioControlBox";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingPage from "../page/PostingPage";
import { render } from "./render";

describe("<Controlbox/> test", () => {
  it("having part", () => {
    const util = render(<PostingAudioBars />);
    const str = util.getByTestId("testdiv");
    expect(str).toBeInTheDocument();
  });
});
