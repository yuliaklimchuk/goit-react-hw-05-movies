import  { useState, useEffect } from "react";
import style from './Cast.module.css';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1a27ac166727ac0de96a34161208f474';
const IMAGE_URL = "https://image.tmdb.org/t/p/w138_and_h175_face";    

export const Cast = ({ movieId }) => { 
    const [actors, setActors] = useState([]);
    useEffect(() => { 
        if(!movieId){return}
        fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                if (response.ok) {
                    return response.json();}
            })
            .then(actorsRes => {
                return setActors(actorsRes.cast);
            })
            .catch(error=> alert(error.message))      
    }, [movieId]);
    return <>
        {actors && <ul className={ style.list}>
            {actors.map(actor => (
                actor.profile_path &&
                <li key={actor.id} className={style.item}>
                    <img className={style.img} src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} />
                    <div>
                        <h3 >Actor name: {actor.original_name}</h3>
                        <p >Role: {actor.character}</p>
                    </div>
                </li>
            ))}
        </ul>}
    </>
}