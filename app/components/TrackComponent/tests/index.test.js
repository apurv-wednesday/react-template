/**
 *
 * Tests for TrackComponent
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import TrackComponent from '../index';

describe('<TrackComponent />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackComponent />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackComponent />);
    expect(getAllByTestId('track-component').length).toBe(1);
  });
});
