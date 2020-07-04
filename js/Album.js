import React, { Component } from 'react';
import axios from 'axios';

import Lightbox from './utils/Lightbox';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      photos: [],
      selectedPhoto: null,
      selectedPhotoIndex: null
    }
  }

  componentDidMount() {
    axios.get(`/api/photos/${this.props.photoshootDate}`)
    .then(response => this.setState({ photos: response.data.data, isLoaded: true }))
    .catch(error => this.setState({ error, isLoaded: true }));
  }

  getFullImageUrl = (thumbUrl) => thumbUrl.replace('thumb-', '');

  handleClick = (thumbUrl, index) => {
    const fullUrl = this.getFullImageUrl(thumbUrl);
    this.setState({ selectedPhoto: fullUrl, selectedPhotoIndex: index });
  }

  closeLightbox = () => {
    this.setState({ selectedPhoto: null, selectedPhotoIndex: null });
  }

  nextPhoto = (currentIndex) => {
    const { photos } = this.state;
    const maxIndex = photos.length - 1;
    const nextIndex = currentIndex == maxIndex ? 0 : currentIndex + 1;
    this.setState({
      selectedPhoto: this.getFullImageUrl(photos[nextIndex]),
      selectedPhotoIndex: nextIndex
    })
  }

  prevPhoto = (currentIndex) => {
    const { photos } = this.state;
    const maxIndex = photos.length - 1;
    const prevIndex = currentIndex == 0 ? maxIndex : currentIndex - 1;
    this.setState({
      selectedPhoto: this.getFullImageUrl(photos[prevIndex]),
      selectedPhotoIndex: prevIndex
    })
  }

  render() {
    const { error, isLoaded, photos, selectedPhoto, selectedPhotoIndex } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Fetching...</div>
    }

    return (
      <div>
        { selectedPhoto && selectedPhotoIndex !== null ?
          <Lightbox
            url={selectedPhoto}
            close={this.closeLightbox}
            next={() => this.nextPhoto(selectedPhotoIndex)}
            prev={() => this.prevPhoto(selectedPhotoIndex)}
          /> : null }
        <div>
          {photos.map((url, i) =>
            <img
              src={url}
              key={`${i}-image`}
              className="img-thumb"
              onClick={() => this.handleClick(url, i)}/>
          )}
        </div>
      </div>
    )
  }
}

export default Album;
