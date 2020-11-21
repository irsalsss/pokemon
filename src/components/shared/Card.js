import React from 'react';
import PropTypes from "prop-types";
import './Card.scss';
import { useHistory } from "react-router-dom";

const Card = ({ children, id, owned, withTotalOwned = false, withCloseButton = false, onRemove }) => {
  const history = useHistory();
  return (
    <div className='container-card' onClick={() => history.push(`/pokemon-detail/${id}`)}>
      <p className='yellow-box card-id'>ID: {id}</p>

      {withTotalOwned && (
        <p className='yellow-box card-total-owned'>Owned: {owned}</p>
      )}

      {withCloseButton && (
        <div onClick={onRemove} className='remove-button'>Remove</div>
      )}
      {children}
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  owned: PropTypes.number,
  children: PropTypes.element.isRequired,
  withCloseButton: PropTypes.bool,
  withTotalOwned: PropTypes.bool,
  onRemove: PropTypes.func
}

export default Card;