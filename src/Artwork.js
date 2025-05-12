function Artwork({input, setInput, title, handleClick, imageId, iiif}) {
    return (
        <div>
            <p>This is the artwork search page</p>
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

          <button onClick={handleClick}>Search Artwork</button>
          <p>Title: {title}</p>
          {imageId && iiif && (
            <img
              src={`${iiif}/${imageId}/full/843,/0/default.jpg`}
              alt={title}
            />
          )}
          <p>Want to see it in person? Learn more by</p>
          <button >Clicking here</button>
        </main>
        </div>
    )
}
export default Artwork