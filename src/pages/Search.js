import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { ImSad2 } from 'react-icons/im'

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
        <div>
          {isLoading
            ? <Loading />
            : (
              <form className="flex flex-col justify-center items-center mt-10">
                <label htmlFor="input-search">
                  <input
                    className="text-2xl rounded-2xl bg-slate-100 mb-5 border-gray-300 text-center py-2 px-5"
                    placeholder="Pesquise um artista"
                    onChange={ this.handleChange }
                    value={ inputValue }
                    type="text"
                    id="input-search"
                    autoComplete="off"
                  />
                </label>
                <button
                  className="text-2xl rounded-2xl bg-slate-300 py-2 px-16 font-sans font-medium hover:bg-slate-400 cursor-pointer"
                  onClick={ this.onClickBtn }
                  disabled={ isValidBtn }
                  type="button"
                >
                  Pesquisar
                </button>
              </form>
            )}
          <div>
            <h1 className="text-center text-xl font-medium mt-10 underline">{ savedValueInput }</h1>
            <ul className="flex flex-row flex-wrap justify-between max-h-fit mx-14">
              { albuns.length > 0
                ? albuns.map((album) => (
                  <div
                    className="flex flex-col items-center justify-around shadow-xl w-1/4 mx-10 my-10 py-14 bg-gray-100 hover:bg-gray-200 rounded-xl"
                    key={ album.collectionId
                  }>
                    <img
                      className="w-48 h-48 mb-10"
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <Link
                      to={ `/album/${album.collectionId}` }
                      className="text-xl font-medium hover:font-extrabold hover:underline"
                    >
                      <li className="text-center">{ album.collectionName }</li>
                    </Link>
                  </div>
                ))
                : <div className="flex justify-center mx-auto my-10 text-2xl font-medium">
                  <ImSad2 className="mr-3 mt-1"/>
                  <p>Nenhum álbum foi encontrado</p>
                </div>}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Search;
