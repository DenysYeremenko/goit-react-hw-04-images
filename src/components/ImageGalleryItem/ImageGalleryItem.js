import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img src={webformatURL} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};
