import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/all-music-logo.png';
import { ImUser } from "react-icons/im";

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
      <header>
        {isLoading
          ? <Loading />
          : (
            <div className="flex flex-col flex-wrap items-center bg-blue-750">
              <div className="flex flex-row bg-blue-800 px-5 py-10 w-full justify-around items-center">
                <img src={ logo } alt="all-music" className="w-28"/>
                <h1 className="text-5xl font-bold">TrybeTunes</h1>
                  <Link to="/profile" className="flex flex-row w-36 justify-between items-center bg-indigo-50 rounded-xl px-3 py-2" >
                    <ImUser className="w-auto" />
                    <p className="text-xl font-sans font-semibold mt-1">{ name }</p>
                  </Link>
              </div>
              <nav className="font-bold text-xl flex flex-row px-8 py-8 w-1/2 justify-between items-center">
                <Link to="/search" >Pesquisar</Link>
                <Link to="/favorites" >Favoritos</Link>
              </nav>
            </div>
          )}
      </header>);
  }
}

export default Header;
