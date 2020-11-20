import React from 'react';
import './Card.scss'

const Card = ({ children }) => {
  return (
    <div className='container-card'>
      <p className='yellow-box card-id'>ID: 10</p>
      <p className='yellow-box card-total-owned'>Owned: 10</p>
      {children}
    </div>
  )
}

export default Card;