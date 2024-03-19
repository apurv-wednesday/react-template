import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import Itunes from '@app/containers/Itunes/loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: Itunes,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
