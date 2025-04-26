import './App.css';
import { useState, useEffect } from 'react'

// add use effects to ensure that code is only rendering once or twice, instead of continuously
// NEVER let input be a dependencies
// edit search 1 and search 2 to be keywords for search queries
// i need to make it so the code is rendering only After a button is clicked, and a new image is fetched.




// 

function App() {

  // doing api search through the input: 
  const [input, setInput] = useState("")
  // const [button, setButton] = useState(false)
  const [iiif, setIiif] = useState("")
  const [artwork_Id, setArtwork_Id] = useState("")
  const [image_Id, setImage_Id] = useState("")
  const [title, setTitle] = useState("")

 const handleClick1 = () => {

    console.log('clicked baby')
    useEffect(() => { //why isnt the useEffect valid?
      if (button && input !== "") {
           //why is my useEffect running twice
          // bc react wants to be kind and understanding
          const findArtworkId = async () => {
            try {
      
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${input}`, {
            });
            if (!response.ok) {
              console.error('Error response status:', response.status);
              return;
            }
      
      const data = await response.json();
            setIiif(data.config.iiif_url)
            setArtwork_Id(data.data[0].id)
            setTitle(data.data[0].title)
            }
            catch (err) {
              console.error('Error fetching data:', err);
            }
          
          }
          findArtworkId()
        }
      }, [])
      
      
      
          const findImageInfo = async() => { //why am i being provided a different artwork, when i provide the id
                const response = await fetch (`https://api.artic.edu/api/v1/artworks/${artwork_Id}?fields=id,title,image_id`)
      
                if (!response.ok) {
                  console.error('Error response status:', response.status);
                  return;
                }
      
              const data = await response.json();
                console.log(button)
              setImage_Id(data.data.image_id)
              console.log(image_Id)
          }
          findImageInfo()
      
      
          useEffect(() => {
            if(image_Id && iiif && artwork_Id) {
              console.log('image id exists', image_Id)
            const findImage = async() => { //this is failing.. image_id is undefined
            const response = await fetch(`${iiif}/${image_Id}/full/843,/0/default.jpg`)
            if (!response.ok) {
              console.error('Error response status:', response.status);
              return;
            }
            console.log('image fetched! Yay!')
            }
            findImage()
          }
          }, [])
  }
  // const handleClick2 = () => {
  //   console.log('clicked baby')
  //   setButton("images")
  //   console.log('photo button', button)
  // }


  return (
    <div className="App">

      {/* header component */}
      <header className="App-header">
        <h1>Chicago Art Institute</h1>
      </header>

      {/* main component for styling and searching*/}
      <main>

        <span>Welcome!</span>
        <form
          onSubmit={(e) => e.preventDefault()}>
          {/* Prevent form submission */}
          <label> Keyword</label>
          <input
            type="text"
            name="keyword"
            id="keyword"
            required
            value={input} // Controlled input value
            onChange={(e) => setInput(e.target.value)} // Update state on input change
          />
        </form>
        <button
          onClick={handleClick1}
        // className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >artwork
        </button>
        {/* <button
          onClick={handleClick2}          // className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >photography</button>
        make a way to clear */}

        <p>Title: {title}</p>
        <img src={`${iiif}/${image_Id}/full/843,/0/default.jpg`}
        alt= {title}
        />
      </main>
      <footer>
        this is the footer
        go back
      </footer>
    </div>
  );
}

export default App;
