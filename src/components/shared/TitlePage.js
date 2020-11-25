import React from 'react';
import PropTypes from "prop-types";
import './TitlePage.scss';

const TitlePage = ({ title, total }) => {
  return (
    <React.Fragment>
      <h2 data-cy='title-page' data-testid='title-page' className='title-page'>{title || ""}</h2>
      { total &&
        <h2 data-testid='total-my-pokemon' data-cy='total-my-pokemon' className='title-page'>
            (Total Owned: {total || 0})
        </h2>
      }
    </React.Fragment>
  )
}

TitlePage.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
}

export default TitlePage