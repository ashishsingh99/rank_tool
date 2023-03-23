// login user
export const loginUser = (loginOut) => {
  return { type: "USER", payload: loginOut };
};

// Loading Data Condition base
export const isLoading = (loading) => {
  return { type: "LOADING", payload: loading };
};

// Not-Loading Data Condition base
export const isNotLoading = (loading) => {
  return { type: "NOTLOADING", payload: loading };
};
//CHARTRANKING
export const addProjectRank = (chartranking) => {
  return { type: "CHARTRANKING", payload: chartranking };
};
//GETCOUNTRY
export const GetCountry = (getcountry) => {
  return { type: "GETCOUNTRY", payload: getcountry };
};

//ALLPROJECT DATA
export const AllProjectData = (allprojectdata) => {
  return { type: "ALLPROJECTDATA", payload: allprojectdata };
};

//ALLPROJECTDETAILS DATA
export const AllProjectDetaila = (allprojectdetails) => {
  return { type: "ALLPROJECTDETAILS", payload: allprojectdetails };
};

// USERALLPROJECT DATA
export const UserAllProjectDetails = (userallprojectdetails) => {
  return { type: "USERALLPROJECTDETAILS", payload: userallprojectdetails };
};

// USERALLPROJECT NAME
export const UserAllProjectName = (userallprojectname) => {
  return { type: "USERALLPROJECTNAME", payload: userallprojectname };
};

// USERALLKEYWORD RESULT
export const AllKeywordResult = (userallkeywordresult) => {
  return { type: "USERALLKEYWORDRESULT", payload: userallkeywordresult };
};

//USERALLPENDING RESULT
export const AllPendingResult = (userallpendingresult) => {
  return { type: "USERALLPENDINGRESULT", payload: userallpendingresult };
};

// KEYWORDDATA
export const addProjectData = (keyworddata) => {
  return { type: "KEYWORDDATA", payload: keyworddata };
};

export const addOldProjectData = (oldkeyworddata) => {
  return { type: "OLDKEYWORDDATA", payload: oldkeyworddata };
};

export const GetPreviousAlloldData = (previousallolddata) => {
  return { type: "PREVIOUSALLOLDDATA", payload: previousallolddata };
};



export const UserKeywordLimit = (userkeywordlimit) => {
  return { type: "USERKEYWORDLIMIT", payload: userkeywordlimit };
};

export const UserProjectLimit = (userprojectlimit) => {
  return { type: "USERPROJECTLIMIT", payload: userprojectlimit };
};


