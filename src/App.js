import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [iiif, setIiif] = useState("");
  const [artworkId, setArtworkId] = useState("");
  const [imageId, setImageId] = useState("");
  const [title, setTitle] = useState("");

  const [triggerSearch, setTriggerSearch] = useState(false); // NEW STATE TO TRIGGER SEARCH ON BUTTON CLICK

  const handleClick1 = () => {
    if (!input.trim()) { // TRIM INPUT TO AVOID EMPTY SPACES
      alert("Please provide valid input to find artwork");
      return;
    }
    setTriggerSearch(true); // TRIGGER SEARCH LOGIC ONLY ON BUTTON CLICK
  };

  useEffect(() => {
    if (!triggerSearch) return; // ONLY RUN IF BUTTON WAS CLICKED

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

        setIiif(data.config.iiif_url); // SET IIIF BASE URL
        setArtworkId(data.data[0].id); // SET ARTWORK ID FROM SEARCH RESULTS
        setTitle(data.data[0].title); // SET TITLE
      } catch (err) {
        console.error("Error fetching artwork ID:", err); // ERROR LOGGING
      } finally {
        setTriggerSearch(false); // RESET TRIGGER TO PREVENT LOOPING
      }
    };

    findArtworkId();
  }, [triggerSearch, input]); // DEPEND ON TRIGGER FLAG AND INPUT — NOT BUTTON STATE

  useEffect(() => {
    if (!artworkId) return; // GUARD AGAINST EMPTY ID

    const findImageInfo = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id`
        ); // CORRECTED: USED HARDCODED 'artworks' INSTEAD OF VARIABLE BUTTON STATE

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chicago Art Institute</h1>
      </header>

      <main>
        <span>Welcome!</span>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Keyword</label>
          <input
            type="text"
            name="keyword"
            id="keyword"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <button onClick={handleClick1}>Search Artwork</button> {/* UPDATED: BUTTON NOW ONLY TRIGGERS SEARCH FLAG */}

        <p>Title: {title}</p>
        {imageId && iiif && ( // RENDER IMAGE ONLY IF BOTH VALUES ARE PRESENT
          <img
            src={`${iiif}/${imageId}/full/843,/0/default.jpg`}
            alt={title}
          />
        )}
      </main>

      <footer>this is the footer – go back</footer>
    </div>
  );
}

export default App;
