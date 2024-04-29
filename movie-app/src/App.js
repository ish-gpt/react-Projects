import logo from './logo.svg';
import './App.css';
import Header from './Components/header';
import Banner from './Components/banner';
import MoviesList from './Components/movieslist';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <MoviesList />
    </div>
  );
}

export default App;
