import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ url, onClick }) => {
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      console.log('Unmount');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className={styles.Overlay} onClick={() => onClick()}>
      <div className={styles.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
