import React, { useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";

export default function GalleryModal(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const images = useSelector(state => state.image.images)
    const currentImage = useSelector(state => state.image.currentImage)
    const smallListRef = useRef("small-list")

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = (e) => {
        let result = images.indexOf(e.target.src)
        dispatch(actions.image.setCurrentImage(result))
        setOpen(true);
    }

    function handleLeft() {
        let result = currentImage - 1
        if (result === -1) { dispatch(actions.image.setCurrentImage(images.length - 1)) }
        else {
            dispatch(actions.image.setCurrentImage(result))
        }
    }

    function handleRight() {
        let result = currentImage + 1
        dispatch(actions.image.setCurrentImage(result % images.length))
    }

    function imageClick(e) {
        let element = document.getElementsByClassName("active")[0]
        if (element) {
            element.className = "in-active"
        }
        e.target.className = "active"
        let result = images.indexOf(e.target.src)
        dispatch(actions.image.setCurrentImage(result))
    }

    return (
        <div className="modal" id="modal">
            <div className="img" onClick={handleOpen} >
                <img src={props.image} alt="img" /></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="modal-img">
                    <div className="button-x">
                        <button onClick={handleClose}>X</button>
                    </div>
                    <div className="modal-up">
                        <button onClick={handleLeft}>{"<"}</button>
                        <img src={images[currentImage]} alt="img" />
                        <button onClick={handleRight}>{">"}</button></div>
                    <div ref={smallListRef} className="small-list">{images.map
                        (image => <img className="in-active" key={image} onClick={imageClick} src={image} alt="img" />)}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

