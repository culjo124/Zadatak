import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

export default function GalleryModal(props) {
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState(props.image);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    function handleLeft() {
        let result = (props.images.indexOf(img) - 1) % props.images.length
        if (result === -1) {
            setImg(props.images[props.images.length - 1])
        } else {
            setImg(props.images[result])
        }
    }

    function handleRight() {
        let result = (props.images.indexOf(img) + 1) % props.images.length
        setImg(props.images[result])
    }

    function imageClick(image) {
        let result = props.images.indexOf(image)
        setImg(props.images[result])
    }

    return (
        <div className="modal" id="modal">
            <div key={props.image} className="img" onClick={handleOpen} >
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
                        <img src={img} alt="img" />
                        <button onClick={handleRight}>{">"}</button></div>
                    <div className="small-list">{props.images.map
                        (image => <img key={image} onClick={() => imageClick(image)} src={image} alt="img" />)}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

