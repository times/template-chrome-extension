import React from 'react';

import './style.css';

// const images = {
//   masthead: require('../../assets/masthead.png')
// }

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      metrics: null
    }
  }

  render() {
    return (<header className="analytics-header">
      Analytics

      <button onClick={this.props.onClose}>&times;</button>
    </header>)
  }

}

export default Header;