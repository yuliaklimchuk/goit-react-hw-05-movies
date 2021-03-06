import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense ,useState, useEffect } from "react";
import style from './MovieDetailsPage.module.css';
import { Link, useParams } from "react-router-dom";
//import { Cast } from "../Cast/Cast.jsx";
//import { Reviews } from 'components/Reviews/Reviews.jsx';
const Cast = lazy(() => import("../Cast/Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

const MovieDetailsPage = () => { 
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '1a27ac166727ac0de96a34161208f474';
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";    
    const DEFAULT_LOCATION_STATE = {
        location: {
            pathname: '/',
            search: '',
        }
    }
    const { movieId } = useParams();
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const fromLocation = location?.state?.from ?? DEFAULT_LOCATION_STATE;

    useEffect(() => { 
        fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(
                    new Error('Film not found'),
                );
            })
            .then(film => {
                return setFilm(film);
            })
            .catch(error=> alert(error.message))      
    }, [movieId]);
    
    const onGoBack = () => { 
        navigate(fromLocation.location);
    }
    
    return <>
        {film && <div >
            <button type='button' onClick={onGoBack}>Go back</button>
            <div className={ style.wrapper}>
                <img src={`${IMAGE_URL}${film.poster_path}`} alt={film.title} className={style.img}></img>
                <div className={style.decrription}>
                    <h2>{film.title}</h2>
                    <p>User score: {Math.round( film.popularity)}</p>
                    <h3>Overview</h3>
                    <p>{film.overview}</p>
                </div>
            </div>
            <ul className={ style.list}>
                <li>
                    <Link to={`cast`}  state={location.state} className={style.link}>Cast</Link>
                </li>
                <li>
                    <Link to={`reviews`} state={location.state}  className={style.link}>Reviews</Link>
                </li>
            </ul>
        </div>
        }
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='cast' element={<Cast movieId={movieId} />}></Route>
                <Route path='reviews' element={<Reviews movieId={movieId} />}></Route>
            </Routes>
        </Suspense>
    </>
}

export default MovieDetailsPage;