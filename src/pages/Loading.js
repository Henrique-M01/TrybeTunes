import React from 'react';

class loading extends React.Component {
  render() {
    return (
    <div class="flex justify-center items-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-grey-700" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
    );
  }
}

export default loading;
