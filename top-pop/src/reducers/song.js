import * as types from "../actions/actionTypes";

const initialState = { songs: [], isApiLoading: true };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SORT_SONGS_ASCENDING:
            return { ...state, songs: state.songs.sort((a, b) => (a.duration > b.duration ? 1 : -1)) }

        case types.SORT_SONGS_DESCENDING:
            return { ...state, songs: state.songs.sort((a, b) => (a.duration < b.duration ? 1 : -1)) }

        case types.GET_INITIAL_SONGS:
            return { ...state, songs: action.songs }

        case types.SET_API_LOADING:
            return { ...state, isApiLoading: action.apiLoading }

        default:
            return state
    }
}