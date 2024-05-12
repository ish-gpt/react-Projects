import React, { Component } from 'react'
import Movies from '../movies.json';
import axios  from 'axios';

export default class movieslist extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      movies: [],
      currentPage: 1,
      pageList: [1],
      favourites:[]
    };
  }

  updateFavourites() {
    let data = JSON.parse((localStorage.getItem('movie-list')) || "[]");
    let favourites = data.map((movie) => {
      return movie.id;
    });
    this.setState({ favourites: [...favourites] });
  }

  async componentDidMount() {
    let response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b5ea99928fd502bcf9abf77d3741135a&language=en-US&page=${this.state.currentPage}`)
    this.setState({ movies: [...response.data.results] });
    console.log(response.data.results)
    this.updateFavourites();
  }

  moveToNextPage = async () => {
    this.state.pageList.push(this.state.pageList.length + 1);
    this.setState({
      pageList: this.state.pageList,
      currentPage: this.state.currentPage + 1 
    },this.handlePageChange);
  }

  moveToPreviousPage = async () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 }, this.handlePageChange);
    }
  }

  handlePageChange = async () => {
    let response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b5ea99928fd502bcf9abf77d3741135a&language=en-US&page=${this.state.currentPage}`)
    this.setState({ movies: [...response.data.results] })
  }

  onPageClick = async (pNo) => {
    if (pNo != this.state.currentPage) {
      this.setState({ currentPage: pNo }, this.handlePageChange)
    }
  }

  handleAddToFav = (movie) => {
    let oldData = JSON.parse((localStorage.getItem('movie-list')) || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((mov) =>mov.id != movie.id)
    } else {
      oldData.push(movie);
    }
    localStorage.setItem('movie-list', JSON.stringify(oldData));
    this.handleAddRemoveFromFav();
  }

  handleAddRemoveFromFav() {
    let movieData = JSON.parse((localStorage.getItem('movie-list')) || "[]");
    let temp = movieData.map((movie) => { return movie.id });
    this.setState({ favourites: [...temp] });
  }

  render() {
    return (
      <>
        {
          this.state.movies.length===0 ?
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
            :
            <div>
              <div className='text-center'>
                <h3>Trending</h3>
              </div>
              <div className='movie-image-card'>
                {
                  // Movies.movies.map((movie) => (
                  //   <div className='movie-card' onMouseEnter={()=>this.setState({hover:movie.Id})} onMouseLeave={()=>this.setState({hover:''})}>
                  //     <img src={require(`../MovieImages/${movie.imageName}`)} alt="Movie" className='movies-img'></img>
                  //     {
                  //       (movie.Id === this.state.hover) && <div className='movie-options'>
                  //       <h4>{movie.Title}</h4>
                  //       <a href="#" className="btn btn-primary movies-btn">Add to Favourites</a>
                  //       </div>
                  //     }
                  //   </div>
                  // ))
                  this.state.movies.map((movie) => (
                    <div className='movie-card' onMouseEnter={() => this.setState({ hover: movie.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className='movies-img'></img>
                      {
                        (movie.id === this.state.hover) && <div className='movie-options'>
                          <h5>{movie.original_title}</h5>
                          {
                            this.state.favourites.includes(movie.id) ? <a onClick={() => (this.handleAddToFav(movie))} className="btn btn-primary movies-btn">Remove from Favourites</a> : <a onClick={() => (this.handleAddToFav(movie))} className="btn btn-primary movies-btn">Add to Favourites</a>
                          }
                          </div>
                      }
                    </div>
                  ))
                }
              </div>
              <div style={{display:'flex', justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.moveToPreviousPage}>Previous</a></li>
                    {
                      this.state.pageList.map((pNo) => (
                        <li class="page-item"><a class="page-link" onClick={()=>this.onPageClick(pNo)}>{pNo}</a></li>
                      ))
                    }
                    <li class="page-item"><a class="page-link" onClick={this.moveToNextPage}>Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
        }
      </>
    )
  }
}
