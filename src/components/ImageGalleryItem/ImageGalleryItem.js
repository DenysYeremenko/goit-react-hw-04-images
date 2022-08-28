import styles from './ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleImageClick(e) {
    console.log(e.target.dataset.url);
  }

  render() {
    const { webformatURL, largeImageURL, onClick } = this.props;
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          data-url={largeImageURL}
          alt=""
          className={styles.ImageGalleryItemImage}
          onClick={onClick}
        />
      </li>
    );
  }
}
