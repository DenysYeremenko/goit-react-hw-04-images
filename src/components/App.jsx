import styles from './App.module.css';
import { getApi } from '../services/getApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [queryName, setQueryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');

  useEffect(() => {
    queryName && getImages();
  }, [queryName]);

  useEffect(() => {
    page > 1 && getMoreImages();
  }, [page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     (!prevState.images || prevState.queryName !== this.state.queryName) &&
  //     !this.state.isLoading
  //   ) {
  //     this.getImages();
  //   } else if (prevState.page < this.state.page && !this.state.isLoading) {
  //     this.getMoreImages();
  //   }
  // }

  function getImages() {
    setIsLoading(true);
    // this.setState({ isLoading: true });
    getApi(1, queryName)
      .then(data => {
        if (!data.length) {
          alert('No images found for this query');
        }
        const filteredImagesArr = data.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        setImages(filteredImagesArr);
        setPage(1);
        // this.setState({
        //   images: filteredImagesArr,
        //   page: 1,
        // });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getMoreImages = () => {
    setIsLoading(true);
    // this.setState({ isLoading: true });
    getApi(page, queryName)
      .then(data => {
        if (!data.length) {
          alert('Oops! No more images were found for this query');
        }
        const filteredImagesArr = data.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        setImages(prevImages => [...prevImages, ...filteredImagesArr]);
        // this.setState(prevState => ({
        //   images: [...prevState.images, ...filteredImagesArr],
        // }));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements[1].value;
    setQueryName(inputValue);
    // this.setState({
    //   queryName: inputValue,
    // });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
  };

  const changeLargeImgUrl = e => {
    setLargeImgUrl(e.target.dataset.url);
    // this.setState({
    //   largeImgUrl: e.target.dataset.url,
    // });
  };

  const closeModal = () => {
    setLargeImgUrl('');
    // this.setState({
    //   largeImgUrl: '',
    // });
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={changeLargeImgUrl} />
      )}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {largeImgUrl && <Modal url={largeImgUrl} onClick={closeModal} />}
    </div>
  );
};
