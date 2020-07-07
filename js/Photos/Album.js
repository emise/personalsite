import React, { Component } from 'react';
import axios from 'axios';

import Lightbox from '../utils/Lightbox';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      photos: [],
      description: null,
      selectedPhoto: null,
      selectedPhotoIndex: null
    }
  }

  componentDidMount() {
    axios.get(`/api/photos/${this.props.photoshootDate}`)
    .then(response => this.setState({
      photos: response.data.data,
      isLoaded: true,
      description: response.data.description
    }))
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
    const { photos, description } = this.state;
    const maxIndex = photos.length - 1;
    const prevIndex = currentIndex == 0 ? maxIndex : currentIndex - 1;
    this.setState({
      selectedPhoto: this.getFullImageUrl(photos[prevIndex]),
      selectedPhotoIndex: prevIndex
    })
  }

  parseDescription = (description) => {
    let allDescription = [];
    if (description.models) {
      const models = description.models.map((model, i) => (
        <a href={model.link} key={`${i}-${model.name}`} target="_blank">{model.name}</a>
      ));
      const modelKey = models.length > 1 ? "models: " : "model: ";
      allDescription.push(...[modelKey, ...models]);
    }
    return allDescription;
  }

  render() {
    const { error, isLoaded, photos, description, selectedPhoto, selectedPhotoIndex } = this.state;
    if (error) {
      return <div className="div-padding">Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="div-padding">Fetching...</div>
    }

    // Setting the 'key' attribute will reload the component if any props change
    return (
      <div>
        { selectedPhoto && selectedPhotoIndex !== null ?
          <Lightbox
            key={selectedPhoto}
            url={selectedPhoto}
            close={this.closeLightbox}
            next={() => this.nextPhoto(selectedPhotoIndex)}
            prev={() => this.prevPhoto(selectedPhotoIndex)}
          /> : null }
        {description && <div className="photoshoot-description">
          {this.parseDescription(description)}
        </div>}
        <div className="thumbnail-gallery">
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
