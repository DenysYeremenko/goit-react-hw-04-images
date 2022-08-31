import { Grid } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => (
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
);
