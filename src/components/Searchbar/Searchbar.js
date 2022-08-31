import styles from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}
