import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExhibitionsInfo from './Exhibitions.js'
import Home from './Home.js'
import Artwork from './Artwork.js'
import Header from './Header.js'
import Footer from './Footer.js'

function App() {
  const [input, setInput] = useState("");
  const [iiif, setIiif] = useState("");
  const [artworkId, setArtworkId] = useState("");
  const [imageId, setImageId] = useState("");
  const [title, setTitle] = useState("");
  const [exhibitions, setExhibitions] = useState([])

  const [triggerArtSearch, setTriggerArtSearch] = useState(false); // NEW STATE TO TRIGGER SEARCH ON BUTTON CLICK

  const handleClick = () => {
    if (!input.trim()) { // TRIM INPUT TO AVOID EMPTY SPACES
      alert("Please provide valid input to find artwork");
      return;
    }
    setTriggerArtSearch(true); // TRIGGER SEARCH LOGIC ONLY ON BUTTON CLICK
  };

  useEffect(() => {
    if (!triggerArtSearch) return; // ONLY RUN IF BUTTON WAS CLICKED
    if(input){
      const findArtworkId = async () => {
        try {
          const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${input}`); // CHANGED: HARDCODED 'artworks' INSTEAD OF DEPENDING ON BUTTON STATE
          if (!response.ok) {
            console.error("Error response status:", response.status);
            return;
          }
  
          const data = await response.json();
          if (!data.data || data.data.length === 0) { // ADDED: CHECK FOR EMPTY RESULTS
            console.error("No artwork found.");
            return;
          }
          console.log(data.data)
          setIiif(data.config.iiif_url); // SET IIIF BASE URL
          setArtworkId(data.data[0].id); // SET ARTWORK ID FROM SEARCH RESULTS
          setTitle(data.data[0].title); // SET TITLE
        } catch (err) {
          console.error("Error fetching artwork ID:", err); // ERROR LOGGING
        } finally {
          setTriggerArtSearch(false); // RESET TRIGGER TO PREVENT LOOPING
        }
      };
  
      findArtworkId();
    }

  }, [triggerArtSearch, input]); // DEPEND ON TRIGGER FLAG AND INPUT — NOT BUTTON STATE

  useEffect(() => {
    if (!artworkId) return; // GUARD AGAINST EMPTY ID

    const findImageInfo = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id`
        );

        if (!response.ok) {
          console.error("Error response status:", response.status);
          return;
        }

        const data = await response.json();
        if (!data.data?.image_id) { // ADDED: VALIDATION FOR IMAGE_ID
          console.error("No image_id found in data.");
          return;
        }
        setImageId(data.data.image_id); // SET IMAGE ID
      } catch (err) {
        console.error("Error fetching image info:", err);
      }
    };

    findImageInfo();
  }, [artworkId]); // RUN WHEN ARTWORK ID IS AVAILABLE

  useEffect(() => {
    if (!iiif || !imageId) return; // PREVENT IMAGE FETCH UNTIL BOTH VALUES EXIST

    const findImage = async () => {
      const imageUrl = `${iiif}/${imageId}/full/843,/0/default.jpg`;

      try {
        const response = await fetch(imageUrl, { method: 'HEAD' }); // CHANGED: VERIFY IMAGE EXISTS WITH HEAD REQUEST
        if (!response.ok) {
          console.error("Image not available at:", imageUrl);
          return;
        }
        console.log("Image is valid and fetched:", imageUrl); // CONFIRM IMAGE URL IS VALID
      } catch (err) {
        console.error("Error fetching image:", err); // ERROR HANDLING
      }
    };

    findImage();
  }, [iiif, imageId]); // DEPEND ON BOTH IMAGE ID AND BASE URL

  useEffect(() => {
      const fetchExhibitionsInfo = async () => {
      try {
          const response = await fetch(`https://api.artic.edu/api/v1/exhibitions?limit=10`)
          if (!response.ok) {
            console.error("Error response status:", response.status);
            return;
          }
          const data = await response.json();
          if (!data){
            console.error("No exhibitions found.");
            return;
          }
          console.log(data.data)
          setExhibitions(data.data)
        } catch (err) {
          console.error("Error fetching exhibitions", err);
        }
        
  }
  fetchExhibitionsInfo()
  
   }, [])
  return (
    <BrowserRouter> 
    <Header/>
   
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork" element={<Artwork
          input= {input}
          setInput= {setInput}
          title={title}
          handleClick={handleClick}
          imageId={imageId}
          iiif={iiif} />} />
            <Route path="/exhibitions" element={<ExhibitionsInfo
            exhibitions= {exhibitions} />} />
    </Routes>
     <Footer/>
    </BrowserRouter>
      );
    
}

export default App;
