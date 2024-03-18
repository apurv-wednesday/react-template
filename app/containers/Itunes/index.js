import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Card, CardHeader, Divider, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { injectIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSomePayLoad } from './selectors';
import T from '@components/T';
import saga from './saga';
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
export function Itunes({ songName, maxwidth, padding }) {
  const handleOnChange = (sName) => {
    // eslint-disable-next-line no-console
    console.log(sName);
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const searchRepos = (sName) => {
    // eslint-disable-next-line no-console
    console.log(sName);
  };

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
                onClick={() => searchRepos(songName)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
    </Container>
  );
}

Itunes.propTypes = {
  songName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

Itunes.defaultProps = {
  songName: null,
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectSomePayLoad()
});

// eslint-disable-next-line require-jsdoc
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunes', saga }))(Itunes);

export const ItunesTest = compose(injectIntl)(Itunes);
