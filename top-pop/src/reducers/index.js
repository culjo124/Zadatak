import { combineReducers } from "redux";

import song from './song';
import image from './image';


export default () => combineReducers({
    image,
    song
});