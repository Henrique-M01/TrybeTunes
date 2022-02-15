import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      requestAlbum: [],
      isLoading: false,
      favoriteSongs: [],
    };

    this.findMusic = this.findMusic.bind(this);
    this.addAndRemoveFavoritesMusic = this.addAndRemoveFavoritesMusic.bind(this);
    this.favoriteMusic = this.favoriteMusic.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount() {
    this.findMusic();
    this.favoriteMusic();
  }

  findMusic() {
    const { match } = this.props;
    getMusics(match.params.id)
      .then((album) => this.setState({ requestAlbum: album }));
  }

  isChecked(id) {
    const { favoriteSongs } = this.state;
    const existeMusica = favoriteSongs.find((music) => music.musicId === id);
    if (existeMusica) {
      return true;
    }
    return false;
  }

  favoriteMusic() {
    getFavoriteSongs().then((musics) => this.setState({ favoriteSongs: musics }));
  }

  addAndRemoveFavoritesMusic(objMusic) {
    const { favoriteSongs } = this.state;
    this.setState({ isLoading: true });
    const favorite = favoriteSongs.find((song) => song.musicId === objMusic.musicId);
    if (favorite) {
      const removeFavoriteSong = favoriteSongs
        .filter((music) => objMusic.musicId !== music.musicId);
      removeSong(objMusic)
        .then(() => this.setState({
          isLoading: false, favoriteSongs: removeFavoriteSong }));
    } else {
      addSong(objMusic).then(() => this.setState((prevSong) => ({
        isLoading: false,
        favoriteSongs: [...prevSong.favoriteSongs, objMusic],
      })));
    }
  }

  // isFavorite() {
  // }

  render() {
    const { requestAlbum, isLoading } = this.state;
    return (
      <>
        <Header />
        <div>
          {isLoading ? <Loading />
            : requestAlbum.length > 0
          && (
            <div className="flex flex-wrap justify-between mx-28">
              <img
                src={ requestAlbum[0].atworkUrl100 }
                alt={ requestAlbum[0].collectionName }
              />
              <h1 className="my-10 text-2xl font-semibold">{ requestAlbum[0].artistName }</h1>
              <h1 className="my-10 text-xl font-semibold">{ requestAlbum[0].collectionName }</h1>
            </div>
          )}
          <div className="flex flex-col flex-nowrap items-center">
            { requestAlbum
              .filter((music) => music.trackId)
              .map((music) => (
                <MusicCard
                  key={ music.trackId }
                  musicName={ music.trackName }
                  musicURL={ music.previewUrl }
                  musicId={ music.trackId }
                  onClick={ this.addAndRemoveFavoritesMusic }
                  checked={ this.isChecked }
                />
              ))}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
