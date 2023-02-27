
import AudioWaveSurferList from "../component/h5wavesurferPlayer/AudioWaveSurferList";
import { render } from "./render";

describe("<Controlbox/> test", () => {
  it("having part", () => {
    const util = render(<AudioWaveSurferList />);
    const str = util.getByTestId("testdiv");
    expect(str).toBeInTheDocument();
  });
});
