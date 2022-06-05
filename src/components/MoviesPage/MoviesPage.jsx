import {  useLocation,useNavigate, createSearchParams} from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from './MoviesPage.module.css';
//import { Searchbar } from "../SearchBar/SearchBar.jsx";
const Searchbar = lazy(() => import("../SearchBar/SearchBar"));

const MoviesPage = () => { 
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '1a27ac166727ac0de96a34161208f474';
    const location = useLocation();   
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query') ?? ''; 
    const [filmName, setFilmName] = useState(query);
    const [films, setFilms] = useState([]);


    useEffect(() => { 
        if (!filmName) { 
            return;
        }
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filmName}&language=en-US&page=1&include_adult=false`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(
                    new Error('Films not found. Please enter a valid value'),
                );
                })
            .then(films => {
                if (films.results.length === 0) {
                    return Promise.reject(
                    new Error('Films not found. Please enter a valid value'),
                );
                }
                return setFilms([...films.results.map(({ id, title }) => ({ id, title}))]);
                })
            .catch((error) => fetchError(error))
    }, [filmName]);
    
    const fetchError = (error) => { 
        setFilms([]);
        alert(error.message);
    }
    
    const handleFormSubmit = (filmName) => { 
        setFilmName(filmName);
        configSearchParams(filmName);
    }

    const configSearchParams = (value) => {
        const seachParam = {
            query: value.toLowerCase(),
        };
        navigate({
            ...location,
            search: createSearchParams(seachParam).toString(),
        });
    }

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <Searchbar onSubmit={handleFormSubmit} />
        </Suspense>
            {(films.length !== 0) &&
                <ul>
                {films.map(({ id, title }) =>
                    <li key={id} >
                        <Link className={style.filmsLink}
                            state={{ from: { location, }, }}
                            to={`${id}`}>{title}</Link>
                    </li>)}
                </ul>}
    </>
}

export default MoviesPage;