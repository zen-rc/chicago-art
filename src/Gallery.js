import { useEffect } from 'react';

function GalleryInfo() {
useEffect(() => {
const fetchGalleryInfo = async () => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/galleries?limit=2`)
        if (!response.ok) {
          console.error("Error response status:", response.status);
          return;
        }

        const data = await response.json();
        if (!data.data || data.data.length === 0) {
          console.error("No gallery found.");
          return;
        }
        console.log(data.data)
      } catch (err) {
        console.error("Error fetching galleries", err);
      }

      
}
fetchGalleryInfo()
 }, [])
 
    return (
        <div>
            <h1>This is the gallery page</h1>
        </div>
    )
}
export default GalleryInfo

// maybe change to gallery?
// artwork can give me gallery_id
// use /galleries/{id}

// to can give me:
// long and lat of the gallery
// gallery open or closed
// 