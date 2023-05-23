import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '34985167-fd9dfa45b63c3cbe9c4163666';
const pageQuantity = '12';

export const fetchImages = (serch, page) => {
  return axios.get(
    `${BASE_URL}${KEY}&q=${serch}&image_type=photo&orientation=horizontal&safeserch=true&per_page=${pageQuantity}&page=${page}`
  );
};
