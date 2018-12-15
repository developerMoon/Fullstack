import { FETCH_USER } from '../actions/types';

export default function(state = null, action){
  //determine whether user logged in
  switch (action.type){
    case FETCH_USER:
      console.log(action.payload);
      return action.payload || false; //action.payload or false
      //so that empty string is not returned
    default:
      return state; 
  }
}