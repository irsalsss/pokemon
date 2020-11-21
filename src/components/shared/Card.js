import React from 'react';
import PropTypes from "prop-types";
import './Card.scss';
import { useHistory } from "react-router-dom";

const Card = ({ children, id, owned }) => {
  const history = useHistory();
  return (
    <div className='container-card' onClick={() => history.push(`/pokemon-detail/${id}`)}>
      <p className='yellow-box card-id'>ID: {id}</p>
      <p className='yellow-box card-total-owned'>Owned: {owned}</p>
      {children}
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  owned: PropTypes.number,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

export default Card;