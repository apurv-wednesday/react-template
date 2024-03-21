import React, { useEffect } from 'react';
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

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;
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

const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

/**
 * Itunes component that handles the logic for searching and displaying songs from itunes api.
 * It includes input handling, loading state management, and rendering of the repository list or error state.
 *
 * @returns {JSX.Element} The Itunes Home component.
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
  useEffect(() => {
    if (songName && !songsData?.results?.length) {
      dispatchSongsApi(songName);
    }
  }, [dispatchSongsApi, dispatchClearSongsData, songName, songsData]);

  const searchSongs = (sName) => {
    dispatchSongsApi(sName);
  };

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
      {renderSongsList(songsData, loading, songName)}
      {renderErrorState(songName, loading, songsError)}
    </Container>
  );
}
const renderSkeleton = () => {
  return (
    <>
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
    </>
  );
};
const renderSongsList = (songsData, loading, songName) => {
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
              renderItem={(item, index) => <TrackComponent key={index} {...item} />}
            />
          </>
        </If>
      </CustomCard>
    </If>
  );
};
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

Itunes.defaultProps = {
  songName: null,
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

// eslint-disable-next-line require-jsdoc
export function mapDispatchToProps(dispatch) {
  const { requestGetiTunesSongs, cleariTunesSongs } = itunesCreators;
  return {
    dispatchSongsApi: (songName) => dispatch(requestGetiTunesSongs(songName)),
    dispatchClearSongsData: () => dispatch(cleariTunesSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunes', saga: iTunesSaga }))(Itunes);

export const ItunesTest = compose()(Itunes);
