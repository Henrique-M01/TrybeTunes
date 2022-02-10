import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ name: user.name, isLoading: false }));
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {isLoading
          ? <Loading />
          : (
            <div>
              <h1 className="text-3xl font-bold underline">TrybeTunes</h1>
              <p data-testid="header-user-name">{ name }</p>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </div>
          )}
      </header>);
  }
}

export default Header;
