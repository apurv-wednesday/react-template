import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { TrackDetails } from '../index';

describe('<TrackDetails /> container tests', () => {
  it('should render and match the snapshot', () => {
    const mockProps = {
      dispatchRequestTrackDetails: jest.fn(),
      trackDetails: {
        trackName: 'Test Track',
        artistName: 'Test Artist',
        previewUrl: 'https://example.com/preview',
        artworkUrl100: 'https://example.com/artwork',
        collectionName: 'Test Collection'
      }
    };
    const { baseElement } = renderProvider(<TrackDetails {...mockProps} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should render null when trackDetails is null', () => {
    const mockProps = {
      dispatchRequestTrackDetails: jest.fn(),
      trackDetails: null
    };
    const { baseElement } = renderProvider(<TrackDetails {...mockProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
