import styles from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  handleKeydown = e => {
    if (e.key === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const { url } = this.props;
    return (
      <div
        className={styles.Overlay}
        onClick={() => this.props.onClick()}
        onKeyPress={e => {
          console.log(e);
        }}
      >
        <div className={styles.Modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}
