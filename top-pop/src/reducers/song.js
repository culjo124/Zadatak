import * as types from "../actions/actionTypes";

const initialState = { songs: [], isApiLoading: false, comments: [localStorage.getItem('comments')] };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SORT_SONGS_ASCENDING:
            return { ...state, songs: [...state.songs].sort((a, b) => (a.duration >= b.duration ? 1 : -1)) }

        case types.SORT_SONGS_DESCENDING:
            return { ...state, songs: [...state.songs].sort((a, b) => (a.duration <= b.duration ? 1 : -1)) }

        case types.GET_INITIAL_SONGS:
            return { ...state, songs: action.songs }

        case types.SET_API_LOADING:
            return { ...state, isApiLoading: action.apiLoading }

        case types.ADD_TO_STORAGE:
            return { ...state, comments: state.comments.concat(action.comment) }

        case types.CLEAR_STORAGE:
            return { ...state, comments: [localStorage.getItem('comments')] }

        default:
            return state
    }
}