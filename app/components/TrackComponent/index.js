/**
 *
 * TrackComponent
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';

const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: 1rem;
  }
`;
// eslint-disable-next-line require-jsdoc
export function TrackComponent({ trackName, artistName, previewUrl, artworkUrl100, collectionName }) {
  // console.log("component",data)
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(previewUrl));
  const handlePlayClick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <CustomCard sx={{ display: 'flex' }} data-testid="track-component">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {trackName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {artistName}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={handlePlayClick}>
            {isPlaying ? <Pause /> : <PlayArrowIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={artworkUrl100} alt={collectionName} />
      {isPlaying && <audio src={previewUrl} autoPlay />}
    </CustomCard>
  );
}

TrackComponent.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string
};

export default TrackComponent;
// functions : songName, songURL, artist(Can be a seperate component), play/pause
