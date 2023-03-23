

export const reducerFnthree = (state = false, action) => {
    const isloginee = localStorage.getItem('loginOut')
    if (action.type === "USER") { return state = isloginee; }
    else { return state = isloginee; }
};

export const reducerFnFour = (state = true, action) => {
    if (action.type === "LOADING") { return state = true; }
    else if (action.type === 'NOTLOADING') { return state = false; }
    else { return state; }
};
export const reducerFnEight = (state = 0, action) => {
    if (action.type === 'GETCOUNTRY') { return state = action.payload }
    else { return state; }
}

export const reducerFnFive = (state = 0, action) => {
    if (action.type === 'KEYWORDDATA') { return state = action.payload }
    else { return state; }
}

export const reducerFnthir = (state = 0, action) => {
    if (action.type === 'OLDKEYWORDDATA') { return state = action.payload }
    else { return state; }
}




/////////////////////

export const reducerFnSix = (state = 0, action) => {
    if (action.type === 'ALLPROJECTDATA') { return state = action.payload }
    else { return state; }
}
export const reducerFnSixteen = (state = 0, action) => {
    if (action.type === 'ALLPROJECTDETAILS') { return state = action.payload }
    else { return state; }
}
export const reducerFnEle = (state = false, action) => {
    if (action.type === 'USERALLPROJECTDETAILS') { return state = action.payload }
    else { return state; }
}
export const reducerFnFor = (state = false, action) => {
    if (action.type === 'USERALLKEYWORDRESULT') { return state = action.payload }
    else { return state; }
}

export const reducerFnFIV = (state = false, action) => {
    if (action.type === 'USERALLPENDINGRESULT') { return state = action.payload }
    else { return state; }
}
export const reducerFnNine = (state = 0, action) => {
    if (action.type === 'CHARTRANKING') { return state = action.payload }
    else { return state; }
}


export const reducerFnTwe = (state = false, action) => {
    if (action.type === 'PREVIOUSALLOLDDATA') { return state = action.payload }
    else { return state; }
}

export const reducerFnOne = (state = false, action) => {
    if (action.type === 'USERALLPROJECTNAME') { return state = action.payload }
    else { return state; }
}









