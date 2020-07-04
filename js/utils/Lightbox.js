import React, { Component } from 'react';

class Lightbox extends Component {
  state = { windowWidth: 0, windowHeight: 0, isLoaded: false };

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ isLoaded: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleImageLoaded = () => this.setState({ isLoaded: true });

  render() {
    const { url, close, next, prev } = this.props;
    const { windowHeight, windowWidth, isLoaded } = this.state;

    return (
      <div className="lightbox">
        <div className="lightbox-inner">
          {isLoaded ? null : <div>Fetching...</div>}
          <img
            src={url}
            style={{ maxHeight: windowHeight - 250, maxWidth: windowWidth - 250 }}
            onLoad={this.handleImageLoaded}
          />
          <button onClick={close} className="lightbox-close-button">x</button>
          <button className="lightbox-right" onClick={next}> &#62; </button>
          <button className="lightbox-left" onClick={prev}> &#60; </button>
        </div>
      </div>
    )

  }
}

export default Lightbox;
