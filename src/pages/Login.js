import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/music_app.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisableBtn: true,
      inputNameValue: '',
      loading: false,
      redirectRoute: '/',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickAndLoading = this.clickAndLoading.bind(this);
  }

  handleChange(event) {
    const { inputNameValue } = this.state;
    const minNumber = 2;
    this.setState({
      inputNameValue: event.target.value,
    });
    if (inputNameValue.length >= minNumber) {
      this.setState({
        isDisableBtn: false,
      });
    }
  }

  clickAndLoading() {
    const { inputNameValue } = this.state;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: inputNameValue });
        this.setState({
          loading: false,
          redirectRoute: '/search',
        });
      });
  }

  render() {
    const { inputNameValue, isDisableBtn, loading, redirectRoute } = this.state;
    return (
      <div className="mx-auto mt-16 flex flex-col max-w-lg items-center justify-center content-center rounded-2xl bg-blue-800 shadow-3xl">
        {loading ? <Loading /> : <Redirect to={ redirectRoute } /> }
        {/* Utilizei a rota de forma dinamica, utilizando state e modificando ele apos a chamada da funcao dentro do thisState */}
        <h1
          className="mt-10 text-6xl font-sans font-semibold"
        >
          TrybeTunes
        </h1>
        <img
          src={ logo }
          alt="logo"
          className="w-96 mb-14 mt-5 opacity-80"
        />
        <label
          htmlFor="input-name"
        >
          <input
            autoComplete="off"
            placeholder="Digite seu nome"
            value={ inputNameValue }
            onChange={ this.handleChange }
            id="input-name"
            className="rounded-md text-xl mx-auto w-96 h-11 shadow-sm text-center mb-14 border-gray-400"
          />
        </label>
        <button
          disabled={ isDisableBtn }
          type="button"
          onClick={ this.clickAndLoading }
          className="font-sans text-xl font-bold text-gray-700 rounded-md mx-auto w-96 h-14 mb-16 bg-indigo-50 border-gray-200 hover:bg-indigo-100 cursor-pointer"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
