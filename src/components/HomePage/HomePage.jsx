import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from './HomePage.module.css';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1a27ac166727ac0de96a34161208f474';

export const HomePage = () => { 
    const [popularFilms, setPopularFilms] = useState([]);

    useEffect(() => { 
        fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`)
            .then(response => {
                if (response.ok) {
                    return response.json();}
            })
            .then(films => {
                return setPopularFilms([...films.results.map(({ id, title, name}) => ({ id, title, name }))] );
            })
            .catch(error=> console.log(error.message))      
        },[]);
    return <> <h2>Popular films</h2>
    <ul>
        {popularFilms.map(({ id, title, name }) =>
            <li key={id} className={style.filmsItem}>
                <Link className={style.filmsLink} to={ `movies/${ id}`}>{title ? title : name}</Link>
        </li>)}
        </ul>
        </>
}