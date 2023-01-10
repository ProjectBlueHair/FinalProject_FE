const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(cors())

app.post('/combine', (req, res) => {
  console.log('log1 audiofiles',req.body)

  // const audioFiles = req.body.audioFiles;
  const command = ffmpeg();

  
  // audioFiles.forEach((audioFile) => {
  //   command.input(audioFile.url);
  // });

  command.on('end', () => {
    console.log('Combined audio file is ready');
    res.send({ combinedAudioFile: './combined.mp3' });
  });

  // command.mergeToStream()
  //   .pipe(fs.createWriteStream('./combined.mp3'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
