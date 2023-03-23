import {
  reducerFnEight,
  reducerFnEle,
  reducerFnFIV,
  reducerFnFive,
  reducerFnFor,
  reducerFnFour,
  reducerFnNine,
  reducerFnOne,
  reducerFnSix,
  reducerFnSixteen,
  reducerFnthir,
  reducerFnthr,
  reducerFnthree,
  reducerFnTwe,
  reducerFntwo,
} from "./upDown";

import { combineReducers } from "redux";
const RootReducer = combineReducers({
  loginOut: reducerFnthree,  // authentication user login or not
  loading: reducerFnFour, // loading function for loading
  getcountry: reducerFnEight, // get country data from rest api
  chartranking: reducerFnNine, // chartRanks data only Ranked Data
  allprojectdata: reducerFnSix, // All Project Data from database NewData Api
  keyworddata: reducerFnFive, // KeywordData for User All Matched Keyword
  allprojectdetails: reducerFnSixteen, //  All Project Details from  DB Project Api
  userallprojectdetails: reducerFnEle, // User All Project Details from DB Project Api
  userallkeywordresult: reducerFnFor, // User All filtred Keyword From keywordData Redux
  userallpendingresult: reducerFnFIV, // User All Pending Keyword && Data
  previousallolddata: reducerFnTwe, // Previous All OLD data from DB oldData APi
  oldkeyworddata: reducerFnthir, // Last Day OLD Data
  userallprojectname:reducerFnOne,  //User All Project NAME ONLY from DB Project Api
  userkeywordlimit:reducerFntwo, // user subscribe limit of keyword
  userprojectlimit:reducerFnthr // user subscribe limit of Project

});
export default RootReducer;
