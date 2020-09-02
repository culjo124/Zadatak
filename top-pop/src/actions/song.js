import * as types from "./actionTypes";

export const sortAsc = () => {
    return {
        type: types.SORT_SONGS_ASCENDING
    }
}

export const sortDes = () => {
    return {
        type: types.SORT_SONGS_DESCENDING
    }
}

export function getSongs() {
    return async (dispatch, getState) => {

        try {

            dispatch({ type: types.SET_API_LOADING, apiLoading: true });

            const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
            const data = await response.json()
            dispatch({ type: types.GET_INITIAL_SONGS, songs: data.tracks.data })
            dispatch({ type: types.SET_API_LOADING, apiLoading: false });


        } catch (error) {
            console.log(error)
        }
    };
}
