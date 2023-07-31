const types = {
    SET_COUNTER: "SET_COUNTER",
  };
  
  export const actions = {
    setCounter: (counter) => {
      return { type: types.SET_COUNTER, counter };
    },
  };
  
  const initialState = {
    counter: 0,
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, counter } = action;
  
    switch (type) {
      case types.SET_COUNTER:
        return { ...state, counter };
      default:
        return state;
    }
  };
  