import styles from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={styles.ButtonWrap}>
      <button type="button" className={styles.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
