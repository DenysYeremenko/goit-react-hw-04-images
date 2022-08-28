import styles from './App.module.css';
import { Component } from 'react';
import { getApi } from '../services/getApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Grid } from 'react-loader-spinner';
export class App extends Component {
  state = {
    images: '',
    page: 1,
    queryName: '',
    isLoading: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    this.getImages(prevState);
  }

  getImages(prevState) {
    const { page, queryName } = this.state;
    if (
      (!prevState.images || prevState.queryName !== this.state.queryName) &&
      !this.state.isLoading
    ) {
      this.setState({ isLoading: true });
      getApi(1, queryName)
        .then(data => {
          if (!data.length) {
            alert('No images found for this query');
          }
          this.setState({
            images: data,
            page: 1,
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else if (prevState.page < this.state.page && !this.state.isLoading) {
      this.setState({ isLoading: true });
      getApi(page, queryName)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data],
          }));
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

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

  render() {
    const { images, isLoading, imagesNotFound } = this.state;
    const { handleSubmit, handleLoadMore } = this;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        {images.length && !imagesNotFound && (
          <Button onClick={handleLoadMore} />
        )}
        {isLoading && (
          <div className={styles.Loader}>
            <Grid
              height="80"
              width="80"
              color="#3f51b5"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    );
  }
}
