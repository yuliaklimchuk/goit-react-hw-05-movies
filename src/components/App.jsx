import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import style from './container.module.css';
//import { Navigation } from "./Navigation/Navigation";
//import { HomePage } from './HomePage/HomePage';
//import { MoviesPage } from './MoviesPage/MoviesPage';
//import { MovieDetailsPage } from './MovieDetailsPage/MovieDetailsPage';

const HomePage = lazy(() => import("./HomePage/HomePage"));
const MoviesPage = lazy(() => import("./MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./MovieDetailsPage/MovieDetailsPage"));
const Navigation = lazy(() => import("./Navigation/Navigation"));


export const App = () => {
  return (
    <div className={ style.container}>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='movies' element={<MoviesPage />}></Route>
          <Route path='movies/:movieId/*' element={<MovieDetailsPage />}></Route>
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};
