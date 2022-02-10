import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, musicURL, musicId, onClick, checked } = this.props;
    return (
      <div>
        <h3>{ musicName }</h3>
        <audio
          data-testid="audio-component"
          src={ musicURL }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ musicId }>
          Favorita
          <input
            checked={ checked(musicId) }
            onClick={ () => onClick({ musicId, musicName, musicURL }) }
            data-testid={ `checkbox-music-${musicId}` }
            id={ musicId }
            type="checkbox"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  musicURL: PropTypes.string.isRequired,
  musicId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
};

export default MusicCard;
