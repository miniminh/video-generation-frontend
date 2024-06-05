import React, { useState } from 'react';
import './App.css';
import {
  generateScripts,
  generateAudio,
  generateImages,
  composeVideo,
  getVideoResult,
  getAudioResult,
  getImageResult
} from './apiService';
import { Container, TextField, Button, Typography, Grid, Card, CardMedia } from '@mui/material';

function App() {
  const [prompt, setPrompt] = useState('');
  const [scenes, setScenes] = useState([]);
  const [voiceovers, setVoiceovers] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleGenerateScripts = async () => {
    try {
      const response = await generateScripts(prompt);
      setScenes(response.data.scenes);
      setVoiceovers(response.data.voiceovers);
      console.log('Scripts:', response.data);
    } catch (error) {
      console.error('Error generating scripts:', error);
    }
  };

  const handleGenerateAudio = async () => {
    try {
      const response = await generateAudio(voiceovers);
      if (response.data.message === "success") {
        const url = getAudioResult('test');
        setAudioUrl(url);
      } else {
        console.error('Audio generation failed:', response.message);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handleGenerateImages = async () => {
    try {
      const response = await generateImages(scenes);
      const imageUrls = response.data.imageUrls;
      setImageUrls(imageUrls);
      console.log('Images:', response.data);
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  const handleComposeVideo = async () => {
    try {
      const response = await composeVideo();
      if (response.data.message === "success") {
        const url = getVideoResult('test');
        console.log(url)
        setVideoUrl(url);
      } else {
        console.error('Video generation failed:', response.message);
      }
      console.log('Video:', response.data);
    } catch (error) {
      console.error('Error composing video:', error);
    }
  };

  return (
    <Container maxWidth="md" className="App">
      <Typography variant="h3" gutterBottom align="center">Video Generator App</Typography>
      
      <TextField
        label="Enter your prompt here"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        margin="normal"
      />
      
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: 20 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleGenerateScripts}>Generate Scripts</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleGenerateAudio}>Generate Audio</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleGenerateImages}>Generate Images</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleComposeVideo}>Compose Video</Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={4} style={{ marginTop: 40 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Scenes</Typography>
          {scenes.length > 0 ? (
            <ul>
              {scenes.map((scene, index) => (
                <li key={index}>{scene}</li>
              ))}
            </ul>
          ) : (
            <Typography>No scenes generated</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Voiceovers</Typography>
          {voiceovers.length > 0 ? (
            <ul>
              {voiceovers.map((voiceover, index) => (
                <li key={index}>{voiceover}</li>
              ))}
            </ul>
          ) : (
            <Typography>No voiceovers generated</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Generated Images</Typography>
          {imageUrls.length > 0 ? (
            <Grid container spacing={2}>
              {imageUrls.map((url, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getImageResult('test', url)}
                      alt={`Generated scene ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No images generated</Typography>
          )}
        </Grid>

        {audioUrl && (
          <Grid item xs={12}>
            <Typography variant="h5">Generated Audio</Typography>
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Grid>
        )}

        {videoUrl && (
          <Grid item xs={12}>
            <Typography variant="h5">Generated Video</Typography>
            <video controls style={{ width: '100%' }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
