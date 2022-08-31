import styles from './App.module.css';
import { Component } from 'react';
import { getApi } from '../services/getApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    queryName: '',
    isLoading: false,
    largeImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (!prevState.images || prevState.queryName !== this.state.queryName) &&
      !this.state.isLoading
    ) {
      this.getImages();
    } else if (prevState.page < this.state.page && !this.state.isLoading) {
      this.getMoreImages();
    }
  }

  getImages = () => {
    const { queryName } = this.state;
    this.setState({ isLoading: true });
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
        this.setState({
          images: filteredImagesArr,
          page: 1,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getMoreImages = () => {
    const { page, queryName } = this.state;
    this.setState({ isLoading: true });
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
        this.setState(prevState => ({
          images: [...prevState.images, ...filteredImagesArr],
        }));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements[1].value;
    this.setState({
      queryName: inputValue,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setLargeImgUrl = e => {
    this.setState({
      largeImgUrl: e.target.dataset.url,
    });
  };

  closeModal = () => {
    this.setState({
      largeImgUrl: '',
    });
  };

  render() {
    const { images, isLoading, largeImgUrl } = this.state;
    const { handleSubmit, handleLoadMore, setLargeImgUrl } = this;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={setLargeImgUrl} />
        )}
        {images.length > 0 && <Button onClick={handleLoadMore} />}
        {isLoading && <Loader />}
        {largeImgUrl && <Modal url={largeImgUrl} onClick={this.closeModal} />}
      </div>
    );
  }
}
