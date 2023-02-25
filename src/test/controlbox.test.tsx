import App from "../App";
import PostingAudioBars from "../component/posting/AudioWaveSurferList";
import PostingAudioControlBox from "../component/posting/AudioControlBox";
import PostingFormAudio from "../component/posting/AudioFileAdd";
import PostingPage from "../page/PostingPage";
import { render } from "./render";

describe("<Controlbox/> test", () => {
  it("having part", () => {
    const util = render(<PostingAudioBars />);
    const str = util.getByTestId("testdiv");
    expect(str).toBeInTheDocument();
  });
});
