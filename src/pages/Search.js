import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isValidBtn: true,
      inputValue: '',
      savedValueInput: '',
      isLoading: false,
      albuns: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickBtn = this.onClickBtn.bind(this);
  }

  handleChange(event) {
    const { inputValue } = this.state;
    this.setState({
      inputValue: event.target.value },
    () => {
      if (inputValue.length >= 1) {
        this.setState({ isValidBtn: false });
      }
    });
  }

  onClickBtn() {
    const { inputValue } = this.state;
    this.setState({
      isLoading: true, savedValueInput: `Resultado de álbuns de: ${inputValue}` });
    searchAlbumsAPI(inputValue)
      .then((data) => this.setState({
        inputValue: '', isLoading: false, albuns: data }));
  }

  render() {
    const {
      inputValue,
      isValidBtn,
      isLoading,
      savedValueInput,
      albuns,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {isLoading
            ? <Loading />
            : (
              <form>
                <label htmlFor="input-search">
                  <input
                    onChange={ this.handleChange }
                    data-testid="search-artist-input"
                    value={ inputValue }
                    type="text"
                    id="input-search"
                  />
                </label>
                <button
                  onClick={ this.onClickBtn }
                  disabled={ isValidBtn }
                  type="button"
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </form>
            )}
          <div>
            { savedValueInput }
            <ul>
              { albuns.length > 0
                ? albuns.map((album) => (
                  <div key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <li>{ album.collectionName }</li>
                    </Link>
                  </div>
                ))
                : <li>Nenhum álbum foi encontrado</li>}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Search;
