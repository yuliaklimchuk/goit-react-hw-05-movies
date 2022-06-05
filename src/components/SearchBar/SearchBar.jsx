import { useState } from "react";
import style from './SearchBar.module.css';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) { 
    const [filmName, setFilmName] = useState('');

    const handleInputChange = (event) => { 
        setFilmName(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        if (filmName.trim() === '') { 
            alert('Empty input field!');
            return;
        }
        onSubmit(filmName);
        setFilmName('');
    }

    return <form className={ style.searchForm} onSubmit={handleSubmit}>  
                <input
                    type="text"
                    name="filmName"
                    className={ style.input}
                    value={filmName}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search films"
                />
        <button className={ style.button} type="submit" >
                    <span >Search</span>
                </button>

            </form>
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;