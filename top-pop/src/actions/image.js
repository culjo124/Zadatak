import * as types from "./actionTypes";

export function getImages() {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: types.SET_IMAGES_LOADING, imagesLoading: true });

            const response = await fetch("https://dev.flom.app/api/v2/product/list", { method: 'POST' })
            const data = await response.json()
            const imageNames = data.data.products.map(product => product.file[0].file.nameOnServer)
            const promises = imageNames.map(async imageName => {
                const response = await fetch("https://dev.flom.app/api/v2/avatar/user/" + imageName)
                return response.url
            })
            const urls = await Promise.all(promises);
            dispatch({ type: types.GET_INITIAL_IMAGES, images: urls });

            dispatch({ type: types.SET_IMAGES_LOADING, imagesLoading: false });

        } catch (error) {
            console.log(error)
        }
    }
}

export function setCurrentImage(ind) {
    return { type: types.SET_CURRENT_IMAGE, index: ind }
}
