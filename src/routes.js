import Home from './components/Home';
import Search from './components/Search';

export default [
  {
    path: '/',
    title: 'Libris',
    component: Home
  },
  {
    path: '/search',
    title: 'Buscar en la Biblioteca',
    component: Search
  }
];