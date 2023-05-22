import React, { Component } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    serch: '',
    selectedImage: null,
  };

  handleFormSumbit = serch => {
    this.setState({ serch });
  };
  openModal = image => {
    this.setState({ selectedImage: image });
  };
  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  render() {
    const { serch, selectedImage } = this.state;
    const { openModal, handleFormSumbit, closeModal } = this;
    return (
      <>
        <Searchbar onSumbit={handleFormSumbit} />
        <ImageGallery openModal={openModal} serch={serch} />
        {selectedImage && (
          <Modal image={selectedImage} closeModal={closeModal} />
        )}
      </>
    );
  }
}
