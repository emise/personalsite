import React, { Component } from 'react';
import axios from 'axios';

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      photoshoots: [],
      photos: []
    }
  }
  
  componentDidMount() {
    axios.get('/api/photos')
    .then(response => this.setState({ photoshoots: response.data, isLoaded: true }))
    .catch(error => this.setState({ error, isLoaded: true }));
  }

  render() {
    const { error, isLoaded, photoshoots, photos } = this.state;
    console.log(photoshoots);
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Looking...</div>
    }

    return (
      <div>
        {photoshoots.data ? photoshoots.data.map((item, i) =>
          <div key={`${i}-${item}`}>{item}</div>
        ) : null}
      </div>
    );
  }
}

export default Photos;
