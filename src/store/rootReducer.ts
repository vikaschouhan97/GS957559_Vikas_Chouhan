import { combineReducers } from "@reduxjs/toolkit";
import { reducer as user } from "../slices/user";
import { reducer as fileData } from "../slices/excelData";

const rootReducer = combineReducers({
  user,
  fileData,
});

export default rootReducer;
