/**
 *
 * Stories for TrackComponent
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { TrackComponent } from '../index';

export default {
  title: 'TrackComponent',
  component: TrackComponent
};

const Template = (args) => <TrackComponent {...args} />;


export const Default = Template.bind({});
Default.args = {
  trackId: 1, 
  trackName: "Sample Track",
  artistName: "Sample Artist", 
  previewUrl: "https://example.com/sample-preview.mp3", 
  artworkUrl100: "https://example.com/sample-artwork.jpg",
  collectionName: "Sample Collection", 
  pauseTrack: () => console.log("Pause Track Function"), 
};
