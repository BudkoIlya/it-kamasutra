import React from 'react';
import preloaderImg from '../../../assets/img/gif-loader.svg';

const Preloader: React.FC<{ isFetching?: boolean }> = ({ isFetching }) => (
  <div>{isFetching ? <img src={preloaderImg} alt="preloader" /> : null}</div>
);
export default Preloader;
