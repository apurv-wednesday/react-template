import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import Itunes from '@app/containers/Itunes/loadable';
import TrackDetails from '@app/containers/Itunes/TrackDetails/loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: Itunes,
    ...routeConstants.itunes
  },
  trackDetails: {
    component: TrackDetails,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
