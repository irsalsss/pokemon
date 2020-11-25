import React from 'react';
import PropTypes from "prop-types";
import './Card.scss';
import { useHistory } from "react-router-dom";

const Card = ({ children, id, owned, withTotalOwned = false, withCloseButton = false, onRemove, unique }) => {
  const history = useHistory();
  const uniqueId = unique || id;
  return (
    <div
      data-testid={`pokemon-card-${uniqueId}`}
      data-cy={`pokemon-card-${uniqueId}`}
      className='container-card'
      onClick={() => history.push(`/pokemon-detail/${id}`)}
    >
      <p data-testid={`pokemon-id-${id}`} data-cy={`pokemon-id-${id}`} className='yellow-box card-id'>Pokemon ID: {id}</p>

      {withTotalOwned && (
        <p data-testid={`total-owned-${id}`} data-cy={`total-owned-${id}`} className='yellow-box card-total-owned'>Owned: {owned}</p>
      )}

      {withCloseButton && (
        <div
          data-testid={`remove-card-button-${uniqueId}`}
          data-cy={`remove-card-button-${uniqueId}`}
          onClick={onRemove}
          className='remove-button'
        >
          Remove
        </div>
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
  onRemove: PropTypes.func,
  unique: PropTypes.string
}

export default Card;