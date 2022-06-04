import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './MovieDetailsPage.module.css';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1a27ac166727ac0de96a34161208f474';
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";    

export const MovieDetailsPage = () => { 
    const { movieId } = useParams();
    const [film, setFilm] = useState(null);
    useEffect(() => { 
        fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => {
                if (response.ok) {
                    return response.json();}
            })
            .then(film => {
                return setFilm(film);
            })
            .catch(error=> alert(error.message))      
    }, [movieId]);
    return <>
        {film && <div className={ style.wrapper}>
            <img src={`${IMAGE_URL}${film.poster_path}`} alt={film.title} className={style.img}></img>
            <div className={style.decrription}>
                <h2>{film.title}</h2>
                <p>User score: {Math.round( film.popularity)}%</p>
                <h3>Overview</h3>
                <p>{film.overview}</p>
            </div>

        </div>}
    </>
}