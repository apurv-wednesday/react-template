import { itunesReducer, itunesTypes, initialState } from '../reducer';

describe('Itunes reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(itunesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      itunesReducer(initialState, {
        type: itunesTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
