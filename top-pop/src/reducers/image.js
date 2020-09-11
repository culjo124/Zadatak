import * as types from "../actions/actionTypes";

export default function reducer(state = { images: [], isImagesLoading: false, currentImage: 0 }, action) {
    switch (action.type) {
        case types.GET_INITIAL_IMAGES:
            return { ...state, images: action.images }

        case types.SET_CURRENT_IMAGE:
            return { ...state, currentImage: action.index }

        case types.SET_IMAGES_LOADING:
            return { ...state, isImagesLoading: action.imagesLoading }

        default:
            return state
    }
}