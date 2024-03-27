import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Card, CardHeader, Divider, IconButton, InputAdornment, OutlinedInput, Skeleton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectLoading, selectSongName, selectSongsData, selectSongsError } from './selectors';
import T from '@components/T';
import { If } from '@components/If';
import { For } from '@components/For';
import { TrackComponent } from '@components/TrackComponent';
import { itunesCreators } from './reducer';
import iTunesSaga from './saga';
import { translate } from '@app/utils';

/**
 * Styled card component for custom styling.
 */
const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

/**
 * Styled card header component for custom styling.
 */
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;

/**
 * Styled container component for custom styling.
 */
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

/**
 * Styled input component for custom styling.
 */
const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

/**
 * Itunes component that handles the logic for searching and displaying songs from the iTunes API.
 * It includes input handling, loading state management, and rendering of the repository list or error state.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.dispatchSongsApi - Dispatch function to fetch iTunes songs.
 * @param {Function} props.dispatchClearSongsData - Dispatch function to clear iTunes songs data.
 * @param {Object} props.songsData - The data containing iTunes songs.
 * @param {string} props.songsError - The error message related to iTunes songs fetching.
 * @param {string} props.songName - The name of the song being searched.
 * @param {number} props.maxwidth - The maximum width of the component.
 * @param {number} props.padding - The padding of the component.
 * @param {boolean} props.loading - Loading state of the component.
 * @returns {JSX.Element} The iTunes component.
 */
export function Itunes({
  dispatchSongsApi,
  dispatchClearSongsData,
  songsData,
  songsError,
  songName,
  maxwidth,
  padding,
  loading
}) {
  const [currentTrackId, setCurrentTrackId] = useState(null);

  /**
   * Effect hook to fetch songs data when the component mounts or when the search term changes.
   */
  useEffect(() => {
    if (songName && !songsData?.results?.length) {
      dispatchSongsApi(songName);
    }
  }, [dispatchSongsApi, dispatchClearSongsData, songName, songsData]);

  /**
   * Function to handle pausing the track.
   * @param {Object} ref - Reference to the audio element.
   */
  const pauseTrack = (ref) => {
    setCurrentTrackId(ref);
    if (!currentTrackId?.current?.paused && ref.current.src !== currentTrackId?.current?.src) {
      currentTrackId?.current?.pause();
    }
  };

  /**
   * Function to search for songs based on the provided song name.
   * @param {string} sName - The name of the song to search for.
   */
  const searchSongs = (sName) => {
    dispatchSongsApi(sName);
  };

  /**
   * Event handler for input change.
   * @param {string} sName - The new value of the input.
   */
  const handleOnChange = (sName) => {
    if (!isEmpty(sName)) {
      searchSongs(sName);
    } else {
      dispatchClearSongsData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard maxwidth={maxwidth}>
        <CustomCardHeader title={translate('search_itunes_songs')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T marginBottom={10} id="itunes_search" />
        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          onChange={(event) => debouncedHandleOnChange(event.target.value)}
          fullWidth
          defaultValue={songName}
          placeholder={translate('default_template')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-icon"
                aria-label="search songs"
                type="button"
                onClick={() => searchSongs(songName)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
      {renderSongsList(songsData, loading, songName, pauseTrack)}
      {renderErrorState(songName, loading, songsError)}
    </Container>
  );
}

/**
 * Renders skeleton loading UI.
 * @returns {JSX.Element} Skeleton loading UI.
 */
const renderSkeleton = () => {
  return (
    <>
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
    </>
  );
};

/**
 * Renders the list of songs.
 * @param {Object} songsData - The data containing iTunes songs.
 * @param {boolean} loading - Loading state of the component.
 * @param {string} songName - The name of the song being searched.
 * @param {Function} pauseTrack - Function to handle pausing the track.
 * @returns {JSX.Element} The list of songs.
 */
// eslint-disable-next-line max-params
const renderSongsList = (songsData, loading, songName, pauseTrack) => {
  const results = get(songsData, 'results', []);
  const resultCount = get(songsData, 'resultCount', 0);
  return (
    <If condition={!isEmpty(results) || loading}>
      <CustomCard>
        <If condition={!loading} otherwise={renderSkeleton()}>
          <>
            <If condition={!isEmpty(songName)}>
              <div>
                <T id="search_query_itunes" values={{ songName }} />
              </div>
            </If>
            <If condition={resultCount !== 0}>
              <div>
                <T id="matching_songs" values={{ resultCount }} />
              </div>
            </If>
            <For
              of={results}
              ParentComponent={Container}
              renderItem={(item, index) => <TrackComponent key={index} {...item} pauseTrack={pauseTrack} />}
            />
          </>
        </If>
      </CustomCard>
    </If>
  );
};

/**
 * Renders the error state.
 * @param {string} songName - The name of the song being searched.
 * @param {boolean} loading - Loading state of the component.
 * @param {string} songsError - The error message related to iTunes songs fetching.
 * @returns {JSX.Element} The error state.
 */
const renderErrorState = (songName, loading, songsError) => {
  let repoError;
  let messageId;
  if (songsError) {
    repoError = songsError;
    messageId = 'error-message';
  } else if (isEmpty(songName)) {
    repoError = 'song_search_default';
    messageId = 'default-message';
  }
  return (
    <If condition={!loading && repoError}>
      <CustomCard color={songsError ? 'red' : 'grey'}>
        <CustomCardHeader title={translate('repo_list')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T data-testid={messageId} id={repoError} text={repoError} />
      </CustomCard>
    </If>
  );
};

/**
 * Prop types for the Itunes component.
 */
Itunes.propTypes = {
  dispatchSongsApi: PropTypes.func,
  dispatchClearSongsData: PropTypes.func,
  songsData: PropTypes.shape({
    results: PropTypes.array,
    resultCount: PropTypes.number
  }),
  songsError: PropTypes.string,
  songName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  loading: PropTypes.bool
};

/**
 * Default props for the Itunes component.
 */
Itunes.defaultProps = {
  songName: null,
  maxwidth: 500,
  padding: 20
};

/**
 * Selects parts of the state required by the Itunes component.
 * @param {Object} state - The Redux state.
 * @returns {Object} The selected state.
 */
const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

/**
 * Maps dispatch functions to props.
 * @param {Function} dispatch - The dispatch function.
 * @returns {Object} The mapped dispatch functions.
 */
export function mapDispatchToProps(dispatch) {
  const { requestGetiTunesSongs, cleariTunesSongs } = itunesCreators;
  return {
    dispatchSongsApi: (songName) => dispatch(requestGetiTunesSongs(songName)),
    dispatchClearSongsData: () => dispatch(cleariTunesSongs())
  };
}

/**
 * Connects the Itunes component to the Redux store.
 */
const withConnect = connect(mapStateToProps, mapDispatchToProps);

/**
 * Injects the iTunes saga into the component.
 */
export default compose(withConnect, injectSaga({ key: 'itunes', saga: iTunesSaga }))(Itunes);

/**
 * A testable version of the Itunes component.
 */
export const ItunesTest = compose()(Itunes);
