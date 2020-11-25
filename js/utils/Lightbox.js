import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faTimes,
  faAngleRight,
  faAngleLeft,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingImage: true,
      fullSize: false,
      windowWidth: 0,
      windowHeight: 0,
      imgStyles: null
    };
    // ref to the image
    this.image = null;
    this.setImageRef = element => {
      this.image = element;
    }
  }

  /**
   * Calculate the image dimensions to fill up the screen without overflowing
   * Keep the dimension ratio constant (css-only solution doesn't work in safari/chrome)
   */
  setImageDimensions = () => {
    const { windowWidth, windowHeight } = this.state;

    const imgWidth = this.image.clientWidth;
    const imgHeight = this.image.clientHeight;

    const whRatio = imgWidth / imgHeight;
    const isPortrait = imgWidth > imgHeight;

    const actionGutter = 100;  // 70 is the gutter for the action buttons (prev/next image, close button)

    let maxWidth = 0;
    let maxHeight = 0;

    if (isPortrait) {
      maxWidth  = windowWidth - actionGutter;
      maxHeight = (windowWidth - actionGutter) / whRatio;

      // If the calculated height is greater than the window height, relcalculate dimensions
      // based off of the window height
      if (maxHeight > windowHeight) {
        maxWidth = (windowHeight - actionGutter) * whRatio;
        maxHeight = windowHeight - actionGutter;
      }
    } else {
      maxWidth = (windowHeight - actionGutter) * whRatio;
      maxHeight = windowHeight - actionGutter;

      // If the calculated width is greater than the window width, relcalculate dimensions
      // based off of the window width
      if (maxWidth > windowWidth) {
        maxWidth = windowWidth - actionGutter;
        maxHeight = (windowWidth - actionGutter) / whRatio;
      }
    }

    this.setState({ imgStyles: { maxWidth, maxHeight }});
  }

  /* Recalculate the image dimensions after the image is loaded */
  handleImageLoaded = () => {
    this.setState({ loadingImage: false });
    this.setImageDimensions();
    this.image.classList.remove('hidden');
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    if (!this.state.loadingImage) this.setImageDimensions();
  }

  componentDidMount() {
    document.body.classList.add('stop-scroll');
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    document.body.classList.remove('stop-scroll');
    window.removeEventListener('resize', this.handleResize)
  }

  toggleFullSizePhoto = () => {
    this.image.classList.toggle("lightbox-image-toggle-styles");

    const lightboxInner = document.getElementsByClassName("lightbox-inner");
    lightboxInner[0].classList.toggle("lightbox-inner-right-pos");

    this.setState({ fullSize: !this.state.fullSize });
  }

  render() {
    const { url, close, next, prev } = this.props;
    const { loadingImage, fullSize, imgStyles } = this.state;

    return (
      <Swipe
        onSwipeLeft={next}
        onSwipeRight={prev}
        tolerance={100}
      >
        <div className="lightbox">
          <div className="lightbox-inner lightbox-inner-right-pos">
            {loadingImage && <div><FontAwesomeIcon icon={faSpinner} spin /></div>}
            <img
              src={url}
              ref={this.setImageRef}
              onLoad={this.handleImageLoaded}
              className="lightbox-image lightbox-image-toggle-styles hidden"
              style={!fullSize && imgStyles ? imgStyles : null}
            />
            <button onClick={close} className="lightbox-close-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button
              onClick={this.toggleFullSizePhoto}
              className="lightbox-original-size-button"
            >
              <FontAwesomeIcon icon={fullSize ? faCompressArrowsAlt : faExpandArrowsAlt} />
            </button>
            <button className="lightbox-right" onClick={next}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button className="lightbox-left" onClick={prev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </div>
        </div>
      </Swipe>
    )

  }
}

export default Lightbox;
