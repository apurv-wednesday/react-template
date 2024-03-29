/**
 *
 * TrackDetails Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { TrackComponent } from '@components/TrackComponent';
import { itunesCreators } from '../reducer';
import { createStructuredSelector } from 'reselect';
import { selectTrackDetails } from '../selectors';
import iTunesSaga from '../saga';
import { injectSaga } from 'redux-injectors';

/**
 * Container component for displaying track details.
 * @param {Object} props - The component props.
 * @param {Function} props.dispatchRequestTrackDetails - Function to dispatch request to get track details.
 * @param {Object} props.trackDetails - Object containing track details.
 * @returns {JSX.Element|null} - The rendered component.
 */
export function TrackDetails({ dispatchRequestTrackDetails, trackDetails }) {
  const { trackId } = useParams();
  useEffect(() => {
    dispatchRequestTrackDetails(parseInt(trackId));
  }, [trackId]);

  if (!trackDetails) {
    return null;
  }
  return (
    <TrackComponent
      trackId={trackId}
      trackName={trackDetails.trackName}
      artistName={trackDetails.artistName}
      previewUrl={trackDetails.previewUrl}
      artworkUrl100={trackDetails.artworkUrl100}
      collectionName={trackDetails.collectionName}
    />
  );
}

TrackDetails.propTypes = {
  dispatchRequestTrackDetails: PropTypes.func,
  trackDetails: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  trackDetails: selectTrackDetails()
});

/**
 * Maps dispatch functions to props.
 * @param {Function} dispatch - The dispatch function.
 * @returns {Object} - Object containing dispatch functions.
 */
export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = itunesCreators;
  return {
    dispatchRequestTrackDetails: (trackId) => dispatch(requestGetTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunes', saga: iTunesSaga }))(TrackDetails);
/**
 * Injects internationalization functions into TrackDetails.
 * @constant {Function} TrackDetailsTest
 */
export const TrackDetailsTest = compose(injectIntl)(TrackDetails);
