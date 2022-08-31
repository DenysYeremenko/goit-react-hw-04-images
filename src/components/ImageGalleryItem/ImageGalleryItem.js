import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
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
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
