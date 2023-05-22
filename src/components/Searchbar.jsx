import React, { Component } from 'react';
import css from './style.module.css';

export class Searchbar extends Component {
  state = {
    serch: '',
  };

  handleSerchChange = event => {
    this.setState({ serch: event.currentTarget.value.toLowerCase() });
  };

  handleSumbit = event => {
    event.preventDefault();
    if (this.state.serch.trim() === '') {
      return;
    }
    this.props.onSumbit(this.state.serch);
    this.setState({ serch: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSumbit}>
          <button type="submit" className={css.SearchFormButton}></button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.serch}
            onChange={this.handleSerchChange}
          />
        </form>
      </header>
    );
  }
}
