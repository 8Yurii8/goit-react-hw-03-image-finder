import React, { Component } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { LoadMoreButton } from './Button';
import { Loader, LoaderMore } from './Loader';
import { fetchImages } from '../services/api';

export class App extends Component {
  state = {
    serch: '',
    selectedImage: null,
    gallery: [],
    totalImages: 0,
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { serch, page } = this.state;
    if (prevState.serch !== serch || prevState.page !== page) {
      this.fetchImages();
    }
  }
  handleFormSumbit = serch => {
    this.setState({ serch, gallery: [], page: 1, totalImages: 0 });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = () => {
    const { page, serch } = this.state;
    this.setState({ loading: true });
    fetchImages(serch, page)
      .then(response => {
        const data = response.data;
        if (data.hits.length === 0) {
          throw new Error(`No photos found for the serch query "${serch}"`);
        }
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...data.hits],
          totalImages: data.totalHits,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  openModal = image => {
    this.setState({ selectedImage: image });
  };
  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  render() {
    const { serch, selectedImage, loading, gallery, totalImages, error } =
      this.state;
    const { openModal, handleFormSumbit, closeModal } = this;

    return (
      <>
        <Searchbar onSumbit={handleFormSumbit} />
        {loading && (
          <div>
            <Loader />
          </div>
        )}
        {!serch && <div>Enter the name of the photo</div>}
        {error && <p>{error}</p>}
        {gallery.length > 0 && (
          <ImageGallery openModal={openModal} gallery={gallery} />
        )}

        {loading && <LoaderMore />}

        {selectedImage && (
          <Modal image={selectedImage} closeModal={closeModal} />
        )}
        {!loading && gallery.length !== totalImages && (
          <LoadMoreButton onClick={this.loadMoreImages} />
        )}
      </>
    );
  }
}
