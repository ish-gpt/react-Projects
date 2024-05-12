import './App.css';
import Header from './Components/header';
import Banner from './Components/banner';
import Favourities from './Components/favourities';
import MoviesList from './Components/movieslist';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes> 
          <Route path='/' element={<><Banner /><MoviesList /></>} />
          {/* <Route path='/' element={<MoviesList/>} /> */}
          <Route path='/favourites' element={<Favourities/>} />
        </Routes>
      </Router>
    </div>
  );
}
/**
 * react-router-dom v6 has following changes -> 
component replaced with element
exact prop is no longer supported
Switch replaced with Routes
useHistory() replaced with useNavigate()
Redirect replaced with Navigate
 */
export default App;
