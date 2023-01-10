import React, { useRef, useState } from "react";

import AWS from "aws-sdk";
import axios from "axios";

function AudioCombiner() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [combinedAudioFile, setCombinedAudioFile] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioElement = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      console.log(files[i], "log 3 audioFiles[i]");
      formData.append("audiofiles[" + i + "]", files[i]);
    }
    console.log(formData)

    setAudioFiles(files);
  };

  const handleCombine = async () => {
    const formData = new FormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // console.log(audioFiles);
    // for (let i = 0; i < audioFiles.length; i++) {
    //   console.log(audioFiles, "log 3 audioFiles[i]");
    //   formData.append("audiofiles[" + i + "]", audioFiles[i]);
    // }
    // console.log("formdata", formData);
    for (const file of audioFiles) {
        console.log(typeof file)
      formData.append("audiofiles", file);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/combine",
        formData,
        config
      );
      setCombinedAudioFile(response.data.combinedAudioFile);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    audioElement.current.play();
  };

  const handlePause = () => {
    setPlaying(false);
    audioElement.current.pause();
  };

  const handleUpload = () => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: "my-bucket",
      Key: "combined.mp3",
      Body: combinedAudioFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File uploaded successfully to ${data.Location}`);
      }
    });
  };

  return (
    <div>
      <input
        type="file"
        // accept="audio/*"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleCombine}>Combine</button>
      {combinedAudioFile && (
        <>
          {playing ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handlePlay}>Play</button>
          )}
          <audio src={combinedAudioFile} ref={audioElement} />
        </>
      )}
      {combinedAudioFile && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
}

export default AudioCombiner;
