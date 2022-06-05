import  { useState, useEffect } from "react";
import style from './Reviews.module.css';
import PropTypes from 'prop-types';


const Reviews = ({ movieId }) => { 
    
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '1a27ac166727ac0de96a34161208f474'; 
    const [reviews, setReviews] = useState([]);
    useEffect(() => { 
        if(!movieId){return}
        fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                if (response.ok) {
                    return response.json();}
            })
            .then(reviewsRes => {
                return setReviews(reviewsRes.results);
            })
            .catch(error=> alert(error.message))      
    }, [movieId]);
    return <>
        {reviews.length === 0 ?
            <h4>The movie has no reviews</h4> :
            <ul className={style.list}>
            {reviews.map(review => (
                <li key={review.id} className={style.item}>
                    <h4 >Author: {review.author}</h4>
                    <p className={ style.content}> {review.content}</p>
                </li>
            ))}
        </ul>}
    </>
}
Reviews.propTypes = {
    movieId: PropTypes.string.isRequired,
};
export default Reviews;