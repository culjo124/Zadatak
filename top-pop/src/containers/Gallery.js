import React, { useEffect, useState } from "react";
import GalleryModal from "../components/GalleryModal"
import "./gallery.scss"

function Gallery() {

    const [images, setImages] = useState([])

    async function getImages() {

        const response = await fetch("https://dev.flom.app/api/v2/product/list", { method: 'POST' })
        const data = await response.json()
        const imageNames = data.data.products.map(product => product.file[0].file.nameOnServer)
        const promises = imageNames.map(async imageName => {
            const response = await fetch("https://dev.flom.app/api/v2/avatar/user/" + imageName)
            return response.url
        })
        const urls = await Promise.all(promises)
        setImages(urls)
    }

    useEffect(() => {
        getImages()
    }, []);

    return (< div className="grid">
        {images.length > 0 ? images.map(image => <GalleryModal key={image} image={image} images={images} />
        ) : "Loading..."
        }
    </div >)
}

export default Gallery;