import {
  ADMIN_DELETE_USER_START,
  ADMIN_DELETE_USER_SUCCESS } from '../../constants';

export default function userManagement(state = {}, action) {
  switch (action.type) {
    case ADMIN_DELETE_USER_START:
      //console.log("Reducer: ADMIN_DELETE_USER_START");
      //console.log(action.data);
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
