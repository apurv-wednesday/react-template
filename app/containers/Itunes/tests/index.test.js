/**
 *
 * Tests for Itunes container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { ItunesTest as Itunes, mapDispatchToProps } from '../index';
import { fireEvent } from '@testing-library/dom';
import { translate } from '@app/utils';
import { itunesTypes } from '../reducer';

describe('<Itunes /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Itunes dispatchSongsApi={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchClearSongsData on empty change', async () => {
    const getSongsApiSpy = jest.fn();
    const clearSongsDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <Itunes dispatchClearSongsData={clearSongsDataSpy} dispatchSongsApi={getSongsApiSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsApiSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsDataSpy).toBeCalled();
  });
  it('should call dispatchSongsApi on change and after enter', async () => {
    const songName = 'coldplay';
    const { getByTestId } = renderProvider(<Itunes dispatchSongsApi={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: songName }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(songName);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(songName);
  });
  it('should call dispatchSongsApi on clicking the search icon', async () => {
    const songName = 'coldplay';
    const { getByTestId } = renderProvider(<Itunes dispatchSongsApi={submitSpy} songName={songName} />);
    fireEvent.click(getByTestId('search-icon'));

    await timeout(500);
    expect(submitSpy).toBeCalledWith(songName);
  });

  it('should  dispatchSongsApi on update on mount if songName is already persisted', async () => {
    const songName = 'react-template';
    renderProvider(<Itunes songName={songName} songsData={null} dispatchSongsApi={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(songName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSongsSearchSpy = jest.fn();
    const songName = 'coldplay';
    const actions = {
      dispatchSongsApi: { songName, type: itunesTypes.REQUEST_GETI_TUNES_SONGS },
      dispatchClearSongsData: { type: itunesTypes.CLEARI_TUNES_SONGS }
    };
    const props = mapDispatchToProps(dispatchSongsSearchSpy);
    props.dispatchSongsApi(songName);
    expect(dispatchSongsSearchSpy).toHaveBeenCalledWith(actions.requestGetiTunesSongs);

    await timeout(500);
    props.dispatchClearSongsData();
    expect(dispatchSongsSearchSpy).toHaveBeenCalledWith(actions.cleariTunesSongs);
  });
  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<Itunes songsError={defaultError} />);
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });
  it('should render the default message when searchBox is empty and songsError is null', () => {
    const defaultMessage = translate('repo_search_default');
    const { getByTestId } = renderProvider(<Itunes />);
    expect(getByTestId('default-message')).toBeInTheDocument();
    expect(getByTestId('default-message').textContent).toBe(defaultMessage);
  });
  it('should render the data when loading becomes false', () => {
    const songsData = { items: [{ repoOne: 'react-template' }] };
    const { getByTestId } = renderProvider(<Itunes songsData={songsData} dispatchSongsApi={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });
  it('should render Skeleton Comp when "loading" is true', async () => {
    const songName = 'coldplay';
    const { getByTestId, getAllByTestId } = renderProvider(
      <Itunes loading dispatchSongsApi={submitSpy} songName={songName} />
    );
    expect(getAllByTestId('skeleton').length).toBe(3);
  });
});
