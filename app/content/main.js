import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header/component';

import './style.css';

const extensionElement = document.createElement('div');
extensionElement.id = 'awesome-chrome-extension';
document.body.appendChild(extensionElement);

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: window.localStorage.getItem('awesome-chrome-extension__open') ||
        false,
    };

    this.handleOpen = this.handleOpen.bind(this);

    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
      if (request === 'togglePanel') {
        this.handleOpen();
      }
    });
  }

  handleOpen() {
    const newValue = !this.state.open;

    if (!newValue) {
      window.localStorage.removeItem('awesome-chrome-extension__open');
    } else {
      window.localStorage.setItem('awesome-chrome-extension__open', newValue);
    }

    this.setState({
      open: newValue,
    });
  }

  render() {
    return (
      <div
        className={
          'panel-wrapper panel-wrapper--' +
            (this.state.open ? 'open' : 'closed')
        }
      >
        <Header />

        Your React app goes here
      </div>
    );
  }
}

ReactDOM.render(<Panel />, extensionElement);
