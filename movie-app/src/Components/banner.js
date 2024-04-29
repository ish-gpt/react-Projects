import React, { Component } from 'react';
const movies = require('../movies.json');

export default class banner extends Component {
  render() {
    // console.log(movies.movies[0].pathToImage, "---------------");
    return (
      <div className="card banner-card">
        <img src={require('../MovieImages/banner.jpg')} className="card-img-top banner-image" alt="Movie" ></img>
        <div className="card-body banner-desc">
          <h2 className="card-title banner-title">Pick your taste</h2>
          <h3 className="card-text banner-quote">A good movie its all about...</h3>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    )
  }
}
