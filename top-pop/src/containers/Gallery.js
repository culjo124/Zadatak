import React, { useEffect } from "react";
import GalleryModal from "../components/GalleryModal"
import "../styles/gallery.scss"
import Loader from "../components/loader";
import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";

function Gallery() {
    const dispatch = useDispatch();
    const images = useSelector(state => state.image.images)
    const imagesLoading = useSelector(state => state.image.isImagesLoading)

    const localActions = {
        getImages: () => dispatch(actions.image.getImages()),
    };

    useEffect(() => {
        localActions.getImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        < div className="grid">
            {!imagesLoading ? images.map(image => <GalleryModal key={image} image={image} />) : <Loader />}
        </div >)
}

export default Gallery;