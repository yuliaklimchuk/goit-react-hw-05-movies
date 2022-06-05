import { NavLink } from "react-router-dom";
import style from './Navigation.module.css';

const Navigation = () => { 
    return <nav >
        <NavLink
            to='/'
            className={(navLink) => navLink.isActive ?  style.navLinkActive  : style.navLink }>
            Home
        </NavLink>
        <NavLink
            to='/movies'
            className={(navLink) => navLink.isActive ?  style.navLinkActive  : style.navLink }>
            Movies
        </NavLink>
    </nav>
}

export default Navigation;