/**
 *
 * Tests for Itunes container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ItunesTest as Itunes } from '../index';

describe('<Itunes /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Itunes />);
    expect(baseElement).toMatchSnapshot();
  });
});
