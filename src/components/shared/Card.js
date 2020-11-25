import React from 'react';
import PropTypes from "prop-types";
import './Card.scss';
import { useHistory } from "react-router-dom";

const Card = ({ children, id, owned, withTotalOwned = false, withCloseButton = false, onRemove }) => {
  const history = useHistory();
  return (
    <div
      data-testid={`pokemon-card-${id}`}
      data-cy={`pokemon-card-${id}`}
      className='container-card'
      onClick={(e) => history.push(`/pokemon-detail/${id}`)}
    >
      <p data-testid={`pokemon-id-${id}`} className='yellow-box card-id'>Pokemon ID: {id}</p>

      {withTotalOwned && (
        <p data-testid={`total-owned-${id}`} className='yellow-box card-total-owned'>Owned: {owned}</p>
      )}

      {withCloseButton && (
        <div
          data-testid={`remove-card-button-${id}`}
          data-cy={`remove-card-button-${id}`}
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
  onRemove: PropTypes.func
}

export default Card;