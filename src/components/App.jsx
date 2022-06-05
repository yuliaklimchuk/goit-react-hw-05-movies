import { Route, Routes } from 'react-router-dom';
import style from './container.module.css';
import { Navigation } from "./Navigation/Navigation";
import { HomePage } from './HomePage/HomePage';
import { MoviesPage } from './MoviesPage/MoviesPage';
import { MovieDetailsPage } from './MovieDetailsPage/MovieDetailsPage';
import { NotFound } from './NotFound/NotFound';


export const App = () => {
  return (
    <div className={ style.container}>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='movies' element={<MoviesPage />}></Route>
        <Route path='movies/:movieId/*' element={<MovieDetailsPage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
