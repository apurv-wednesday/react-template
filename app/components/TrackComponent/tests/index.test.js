/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import { render, fireEvent } from '@testing-library/react';
import TrackComponent from '../index';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// import { MemoryRouter } from 'react-router-dom';

describe('<TrackComponent />', () => {
  const props = {
    trackId: 123,
    trackName: 'Test Track',
    artistName: 'Test Artist',
    previewUrl: 'test-preview-url',
    artworkUrl100: 'test-artwork-url',
    collectionName: 'Test Collection',
    pauseTrack: jest.fn()
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackComponent />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackComponent />);
    expect(getAllByTestId('track-component').length).toBe(1);
  });

  it('should render audio element with correct src and ref', () => {
    const { getByTestId } = renderWithIntl(<TrackComponent {...props} />);
    const audioElement = getByTestId('trackAudio');
    expect(audioElement.src).toContain(props.previewUrl);
    expect(audioElement).toBeTruthy();
  });
  it('should render correctly with empty track data', () => {
    const { getByTestId } = renderWithIntl(<TrackComponent />);
    const trackComponent = getByTestId('track-component');
    expect(trackComponent).toBeInTheDocument();
  });
  it('should toggle play/pause state when play/pause button is clicked', () => {
    const { getByTestId } = render(<TrackComponent {...props} />);
    const playPauseButton = getByTestId('play-pause-button');
    fireEvent.click(playPauseButton);
    expect(props.pauseTrack).toHaveBeenCalled();
  });
});
