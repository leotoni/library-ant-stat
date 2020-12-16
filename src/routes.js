import { Library } from './modules/pages/LibraryPage';
import { Home } from './modules/pages/Home';

const mainRoutes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'now-ui-icons design_app',
    component: Home,
    layout: '/main',
  },
  {
    path: '/list-library/:id',
    name: 'DetailedPage',
    component: Library,
    layout: '/main',
  },
];

export default mainRoutes;
