import React from 'react';
import { Link } from "react-router-dom";
import PokemonLogo from '../../../public/assets/img/1024px-International_Pokémon_logo.svg.png';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='container-navbar'>
      <ul>
        <li>
          <Link to='/'>
            <img src={PokemonLogo} />
          </Link>
        </li>
        <li>
          <Link to='/my-pokemon'>My Pokemon</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar