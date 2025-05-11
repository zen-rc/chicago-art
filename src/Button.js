import './App.js';
import { useState, useEffect } from 'react'

// add use effects to ensure that code is only rendering once or twice, instead of continuously
// NEVER let input be a dependencies
// edit search 1 and search 2 to be keywords for search queries
// i need to make it so the code is rendering only After a button is clicked, and a new image is fetched.




// 

function Button(input, iiif, artwork_Id, image_Id, title) {

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



    const findImageInfo = async () => { //why am i being provided a different artwork, when i provide the id
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artwork_Id}?fields=id,title,image_id`)

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


    // useEffect(() => {
        if (image_Id && iiif && artwork_Id) {
            console.log('image id exists', image_Id)
            const findImage = async () => { //this is failing.. image_id is undefined
                const response = await fetch(`${iiif}/${image_Id}/full/843,/0/default.jpg`)
                if (!response.ok) {
                    console.error('Error response status:', response.status);
                    return;
                }
                console.log('image fetched! Yay!')
            }
            findImage()
        }
    // }, [])
}


export default Button;
