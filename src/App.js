import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ArtistInfo from './Artist.js'
import Home from './Home.js'
import Artwork from './Artwork.js'
import Header from './Header.js'
import Footer from './Footer.js'

function App() {

  return (
    <BrowserRouter> 
    <Header/>
   
    <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/artwork" element={<Artwork />}/>
            <Route path="/artist" element={<ArtistInfo />}/>
    </Routes>
     <Footer/>
    </BrowserRouter>
      );
    
}

export default App;
