import React from 'react';
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

export default Card;