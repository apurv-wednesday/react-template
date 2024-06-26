/**
 *
 * TrackComponent
 *
 */

import React, { useState, useRef, memo } from 'react';
import { useHistory } from 'react-router-dom';
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
import Button from '@mui/material/Button';

/**
 * A styled custom card component for displaying track information.
 */
const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: 1rem;
  }
`;
/**
 * Functional component for displaying track information with play/pause functionality.
 * @param {Object} props - The component props.
 * @param {string} props.trackName - The name of the track.
 * @param {string} props.artistName - The name of the artist.
 * @param {string} props.previewUrl - The URL of the track preview.
 * @param {string} props.artworkUrl100 - The URL of the artwork image.
 * @param {string} props.collectionName - The name of the collection.
 * @param {Function} props.pauseTrack - Callback function to handle pause track wrapper.
 * @returns {JSX.Element} - The rendered component.
 */
export const TrackComponent = memo(function TrackComponent({
  trackId,
  trackName,
  artistName,
  previewUrl,
  artworkUrl100,
  collectionName,
  pauseTrack
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const history = useHistory();

  /**
   * Event handler for play/pause button click.
   * @param {Object} e - The click event object.
   */
  const handlePlayClick = (e) => {
    e.preventDefault();

    const isPaused = audioRef.current ? audioRef.current.paused : undefined;
    if (isPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
    pauseTrack(audioRef);
  };

  /**
   * Navigates to the track details route in the browser history.
   * @param {string} trackId - The ID of the track to navigate to its details.
   * @returns {void}
   */
  const handleTrackDetailsRoute = (trackID) => history.push(`/itunes/${trackID}`);

  return (
    <>
      <CustomCard sx={{ display: 'flex', justifyContent: 'space-between' }} data-testid="track-component">
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
            <IconButton aria-label="play/pause" data-testid="play-pause-button" onClick={handlePlayClick}>
              {!audioRef.current?.paused && audioRef.current?.src ? <Pause /> : <PlayArrowIcon />}
            </IconButton>
          </Box>
          <Button variant="outlined" color="secondary" onClick={() => handleTrackDetailsRoute(trackId)}>
            Show Details
          </Button>
        </Box>
        <CardMedia component="img" sx={{ width: 151 }} image={artworkUrl100} alt={collectionName} />
        <audio src={previewUrl} ref={audioRef} data-testid="trackAudio" />
      </CustomCard>
    </>
  );
});

TrackComponent.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  pauseTrack: PropTypes.func
};

export default TrackComponent;
