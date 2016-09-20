'use strict';

import React from 'react';

import { render } from 'react-dom';

class Hello extends React.Component {

  static get propTypes() {
    return {
      name: React.PropTypes.string
    }
  }

  render() {
    return (
      <div>
        <h1>{'Hello'} {this.props.name}</h1>
      </div>
    );
  }
}

render((
  <div>
    <Hello name="ReacThor" />
  </div>
), document.getElementById('app'));