import React from 'react';
import PropTypes from 'prop-types';
import HeartCheckbox from 'react-heart-checkbox';

class MusicCard extends React.Component {
  render() {
    const { musicName, musicURL, musicId, onClick, checked } = this.props;
    return (
      <div className="flex flex-col w-1/2 bg-gray-100 mb-3 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold ml-28 my-10">{ musicName }</h3>
        <div className="flex flex-row justify-between mx-10 mb-6">
          <audio
            src={ musicURL }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <HeartCheckbox
              checked={ checked(musicId) }
              onClick={ () => onClick({ musicId, musicName, musicURL }) }
          />
        </div>
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
