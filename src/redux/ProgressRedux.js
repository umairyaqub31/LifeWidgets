const types = {
    SET_PROGRESS: "SET_PROGRESS"
  };
  
  export const actions = {
    setProgress: (progress) => {
      return { type: types.SET_PROGRESS, progress };
    }
  };
  
  const initialState = {
    progress: null
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, progress } = action;
  
    switch (type) {
      case types.SET_PROGRESS:
        return { ...state, progress };
      default:
        return state;
    }
  };
  