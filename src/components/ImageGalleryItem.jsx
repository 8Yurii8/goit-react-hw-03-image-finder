import React, { Component } from 'react';
import css from './style.module.css';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  render() {
    const { image, openModal } = this.props;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={image.webformatURL}
          alt=""
          loading="lazy"
          onClick={() => openModal(image)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
