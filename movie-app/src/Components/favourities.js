import React, { Component } from 'react';
import Movies from '../movies.json';

export default class favourities extends Component {
    constructor() {
        super();
        this.state = { selectedGenre: 'All Genres', genres: [], moviesList: []}
    }

    componentDidMount() {
        let allGenresCollection = {
            28: "Action", 12: "Adventure", 16: "Animation",
            35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
        }
        let movies = JSON.parse((localStorage.getItem('movie-list')) || "[]");
        let temp = [];
        movies.forEach(movie => {
            if (!temp.includes(allGenresCollection[movie.genre_ids[0]])) {
                temp.push(allGenresCollection[movie.genre_ids[0]]);
            }
        });
        temp.unshift("All Genres")
        this.setState({ genres :[...temp] , moviesList:[...movies]})
    }

    filterMovies = (genres) => {
        let movies = JSON.parse((localStorage.getItem('movie-list')) || "[]");
        if (genres === 'All Genres') {
            this.setState({ selectedGenre: genres, moviesList: movies });
            return;
        }
        let allGenresCollection = {
            28: "Action", 12: "Adventure", 16: "Animation",
            35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
        }
        movies = movies.filter((movie) => {
            return (allGenresCollection[(movie.genre_ids[0])] === genres)
        });
        // console.log(movies);
        this.setState({ selectedGenre: genres , moviesList:movies });
    } 

    removeMovieFromFavourites = (movieId) => {
        let movies = JSON.parse((localStorage.getItem('movie-list')) || "[]");
        let allGenresCollection = {
            28: "Action", 12: "Adventure", 16: "Animation",
            35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
        }
        movies = movies.filter((movie) => {
            return ((movie.id) !== movieId)
        });
        this.setState({ moviesList: movies });
        localStorage.setItem('movie-list', JSON.stringify(movies));

        //remove genres if no movies of thaat genres present.
    }

    render() {
        let allGenresCollection = {28: "Action",12: "Adventure",16: "Animation",
            35: "Comedy",80: "Crime",99: "Documentary",18: "Drama",10751: "Family",14: "Fantasy",36: "History",27: "Horror",10402: "Music",9648: "Mystery",10749: "Romance",878: "Science Fiction",10770: "TV Movie",53: "Thriller",10752: "War",37: "Western"
        }
    return (
      <div>
            <div className="main">
                <div className="row">
                    <div className="col-3">
                        <ul className="list-group favourite-generes">
                            {
                                this.state.genres.map((genres) => (
                                    this.state.selectedGenre == genres ?
                                        <li className="list-group-item movie-genre" onClick={() => (this.filterMovies(genres))}>{genres}</li> : 
                                        <li className="list-group-item movie-genre-dull" onClick={()=>(this.filterMovies(genres))} >{genres}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className='row favourite-table'>
                            <input type={'text'} placeholder="Search" className="input-group-text col"></input>
                            <input type={'number'} placeholder="Limit" className="input-group-text col"></input>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genres</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.moviesList.map((moviesObj) => (
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`} alt={moviesObj.title} style={{width:'5rem'}}></img></td>
                                            <td>{moviesObj.original_title}</td>
                                            <td>{allGenresCollection[moviesObj.genre_ids[0]] }</td>
                                            <td>{moviesObj.popularity}</td>
                                            <td>{moviesObj.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={()=>(this.removeMovieFromFavourites(moviesObj.id))}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>  
      </div>
    )
  }
}
