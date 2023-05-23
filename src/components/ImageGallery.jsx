import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './style.module.css';

export const ImageGallery = ({ gallery, openModal, closeModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          openModal={openModal}
          closeModal={closeModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};
