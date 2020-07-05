import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';

class Lightbox extends Component {
  state = { isLoaded: false, fullSize: false };

  componentDidMount() {
    document.body.classList.add('stop-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('stop-scroll');
  }

  handleImageLoaded = () => this.setState({ isLoaded: true });

  toggleFullSizePhoto = () => {
    const image = document.getElementsByClassName("lightbox-image");
    image[0].classList.toggle("lightbox-image-max-width");

    const lightboxInner = document.getElementsByClassName("lightbox-inner");
    lightboxInner[0].classList.toggle("lightbox-inner-right-pos");

    this.setState({ fullSize: !this.state.fullSize });
  }

  render() {
    const { url, close, next, prev } = this.props;
    const { isLoaded, fullSize } = this.state;

    return (
      <div className="lightbox">
        <div className="lightbox-inner lightbox-inner-right-pos">
          {isLoaded ? null : <div>Fetching...</div>}
          <img
            src={url}
            onLoad={this.handleImageLoaded}
            className="lightbox-image lightbox-image-max-width"
          />
          <button onClick={close} className="lightbox-close-button">x</button>
          <button
            onClick={this.toggleFullSizePhoto}
            className="lightbox-original-size-button"
          >
            <FontAwesomeIcon icon={fullSize ? faCompressArrowsAlt : faExpandArrowsAlt} />
          </button>
          <button className="lightbox-right" onClick={next}> &#62; </button>
          <button className="lightbox-left" onClick={prev}> &#60; </button>
        </div>
      </div>
    )

  }
}

export default Lightbox;
