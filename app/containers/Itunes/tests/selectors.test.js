import { selectItunes, selectSomePayLoad } from '../selectors';

describe('Itunes selector tests', () => {
  const mockedState = {
    itunes: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the itunes state', () => {
    const itunesSelector = selectItunes();
    expect(itunesSelector(mockedState)).toEqual(mockedState.itunes);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.itunes.somePayLoad);
  });
});
