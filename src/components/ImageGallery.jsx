import React, { Component } from 'react';
import axios from 'axios';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './style.module.css';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button';
import { Loader, LoaderMore } from './Loader';

export class ImageGallery extends Component {
  BASE_URL = 'https://pixabay.com/api/?key=';
  KEY = '34985167-fd9dfa45b63c3cbe9c4163666';
  pageQuantity = '12';

  state = {
    gallery: [],
    loading: false,
    error: null,
    page: 1,
    loadingMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serch !== this.props.serch) {
      this.setState(
        { gallery: [], loading: true, error: null, page: 1 },
        () => {
          this.fetchImages();
        }
      );
    }
  }

  fetchImages = () => {
    const { serch } = this.props;

    const { page } = this.state;

    axios
      .get(
        `${this.BASE_URL}${this.KEY}&q=${serch}&image_type=photo&orientation=horizontal&safeserch=true&per_page=${this.pageQuantity}&page=${page}`
      )
      .then(res => {
        if (res.data.hits.length === 0) {
          throw new Error(`No photos found for the serch query "${serch}"`);
        }
        return res.data;
      })
      .then(gallery => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery.hits],
          loading: false,
          loadingMore: false,
        }));
      })
      .catch(error => this.setState({ error: error.message, loading: false }));
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  render() {
    const { gallery, loading, error, loadingMore } = this.state;
    const { serch, openModal, closeModal } = this.props;

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <div className={css.App}>
        <ul className={css.ImageGallery}>
          {loading && (
            <div>
              <Loader />
            </div>
          )}
          {!serch && <div>Enter the name of the photo</div>}
          {gallery.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              openModal={openModal}
              closeModal={closeModal}
            />
          ))}
        </ul>
        {gallery.length > 0 && !loading && (
          <>
            {loadingMore && (
              <div>
                <LoaderMore />
              </div>
            )}
            {!loadingMore && <LoadMoreButton onClick={this.loadMoreImages} />}
          </>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  serch: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};
