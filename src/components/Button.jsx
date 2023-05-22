import React from 'react';
import PropTypes from 'prop-types';
import css from './style.module.css';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
