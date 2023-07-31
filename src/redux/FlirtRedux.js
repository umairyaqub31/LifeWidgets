import { LifeWidget } from "@common";

const types = {
  FETCH_FLIRT_PENDING: "FETCH_FLIRT_PENDING",
  FETCH_FLIRT_FAILURE: "FETCH_FLIRT_FAILURE",
  FETCH_FLIRT_SUCCESS: "FETCH_FLIRT_SUCCESS",
  FETCH_FLIRT_MORE: "FETCH_FLIRT_MORE",

  FETCH_ACTIVE_FLIRT_PENDING: "FETCH_ACTIVE_FLIRT_PENDING",
  FETCH_ACTIVE_FLIRT_FAILURE: "FETCH_ACTIVE_FLIRT_FAILURE",
  FETCH_ACTIVE_FLIRT_SUCCESS: "FETCH_ACTIVE_FLIRT_SUCCESS",
  FETCH_ACTIVE_FLIRT_MORE: "FETCH_ACTIVE_FLIRT_MORE",

  FETCH_PENDING_FLIRT_PENDING: "FETCH_PENDING_FLIRT_PENDING",
  FETCH_PENDING_FLIRT_FAILURE: "FETCH_PENDING_FLIRT_FAILURE",
  FETCH_PENDING_FLIRT_SUCCESS: "FETCH_PENDING_FLIRT_SUCCESS",
  FETCH_PENDING_FLIRT_MORE: "FETCH_PENDING_FLIRT_MORE",

  FETCH_PENDING_REQUEST_FLIRT_PENDING: "FETCH_PENDING_REQUEST_FLIRT_PENDING",
  FETCH_PENDING_REQUEST_FLIRT_FAILURE: "FETCH_PENDING_REQUEST_FLIRT_FAILURE",
  FETCH_PENDING_REQUEST_FLIRT_SUCCESS: "FETCH_PENDING_REQUEST_FLIRT_SUCCESS",
  FETCH_PENDING_REQUEST_FLIRT_MORE: "FETCH_PENDING_REQUEST_FLIRT_MORE",


  SUBMIT_FLIRT_PENDING: "SUBMIT_FLIRT_PENDING",
  SUBMIT_FLIRT_SUCCESS: "SUBMIT_FLIRT_SUCCESS",
  SUBMIT_FLIRT_FAILURE: "SUBMIT_FLIRT_FAILURE",

  SEND_FLIRT_REQUEST:"SEND_FLIRT_REQUEST",
  ACCEPT_FLIRT_REQUEST:"ACCEPT_FLIRT_REQUEST",
  CANCEL_FLIRT_REQUEST:"CANCEL_FLIRT_REQUEST",
  CANCEL_FLIRT_REQUEST_DELETE:"CANCEL_FLIRT_REQUEST_DELETE",

  REMOVE_ACTIVE_FLIRT:"REMOVE_ACTIVE_FLIRT",

  TOGGLE_OPEN_TO_MEET:"TOGGLE_OPEN_TO_MEET",

  ADD_FLIRT_FORM: "ADD_FLIRT_FORM",

  SET_DEFAULT_LOADER: "SET_DEFAULT_LOADER"
};

export const actions = {
  fetchFlirts: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_FLIRT_PENDING });
    const json = await LifeWidget.flirts(per_page, page);
    if (json === undefined) {
        dispatch({ type: types.FETCH_FLIRT_FAILURE, error:true, message:"Can't get data from server" });
    } else if (json.status) {
        dispatch({ type: types.FETCH_FLIRT_FAILURE, error:true, message:json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_FLIRT_MORE, items:json });
      } else {
        dispatch({ type: types.FETCH_FLIRT_SUCCESS, items:json });
      }
    }
  },

  fetchActiveFlirts: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_ACTIVE_FLIRT_PENDING });
    const json = await LifeWidget.activeFlirts(per_page, page);
    if (json === undefined) {
        dispatch({ type: types.FETCH_ACTIVE_FLIRT_FAILURE, error:true, message:"Can't get data from server" });
    } else if (json.status) {
        dispatch({ type: types.FETCH_ACTIVE_FLIRT_FAILURE, error:true, message:json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_ACTIVE_FLIRT_MORE, items:json });
      } else {
        dispatch({ type: types.FETCH_ACTIVE_FLIRT_SUCCESS, items:json });
      }
    }
  },

  fetchPendingFlirts: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_PENDING_FLIRT_PENDING });
    const json = await LifeWidget.pendingFlirts(per_page, page);
    if (json === undefined) {
        dispatch({ type: types.FETCH_PENDING_FLIRT_FAILURE, error:true, message:"Can't get data from server" });
    } else if (json.status) {
        dispatch({ type: types.FETCH_PENDING_FLIRT_FAILURE, error:true, message:json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_PENDING_FLIRT_MORE, items:json });
      } else {
        dispatch({ type: types.FETCH_PENDING_FLIRT_SUCCESS, items:json });
      }
    }
  },

  fetchPendingRequestFlirts: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_PENDING_REQUEST_FLIRT_PENDING });
    const json = await LifeWidget.pendingFlirtRequest(per_page, page);
    if (json === undefined) {
        dispatch({ type: types.FETCH_PENDING_REQUEST_FLIRT_FAILURE, error:true, message:"Can't get data from server" });
    } else if (json.status) {
        dispatch({ type: types.FETCH_PENDING_REQUEST_FLIRT_FAILURE, error:true, message:json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_PENDING_REQUEST_FLIRT_MORE, items:json });
      } else {
        dispatch({ type: types.FETCH_PENDING_REQUEST_FLIRT_SUCCESS, items:json });
      }
    }
  },

  submitFlirt: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_FLIRT_PENDING });
    const json = await LifeWidget.submitFlirt(data);
    if(json===undefined){
      dispatch({ type: types.SUBMIT_FLIRT_FAILURE, error:true, message:"Can't get data from server"});
    } else if (json.success) {
      dispatch({ type: types.SUBMIT_FLIRT_SUCCESS, items:json });
    } else {
      dispatch({ type: types.SUBMIT_FLIRT_FAILURE, error:true, message:json.data.message});
    }
  },

  flirtSettings: async (dispatch) => {
    const json = await LifeWidget.flirtSettings();
    if(json===undefined){
    } else if (json.success) {
      dispatch({ type: types.SUBMIT_FLIRT_SUCCESS, items:json });
    }
  },

  sendFlirtRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.SEND_FLIRT_REQUEST, friend_id });
    const json = await LifeWidget.sendFlirtRequest(friend_id);
  },
  acceptFlirtRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.ACCEPT_FLIRT_REQUEST, friend_id });
    const json = await LifeWidget.acceptFlirtRequest(friend_id);
  },
  cancelFlirtRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.CANCEL_FLIRT_REQUEST, friend_id });
    const json = await LifeWidget.cancelFlirtRequest(friend_id);
  },
  cancelAndDelFlirtRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.CANCEL_FLIRT_REQUEST_DELETE, friend_id });
    const json = await LifeWidget.cancelFlirtRequest(friend_id);
  },
  removeActiveFlirt: async (dispatch, friend_id) => {
    dispatch({ type: types.REMOVE_ACTIVE_FLIRT, friend_id });
    const json = await LifeWidget.removeActiveFlirt(friend_id);
  },

  toggleOpenToMeet: async (dispatch, friend_id) => {
    dispatch({ type: types.TOGGLE_OPEN_TO_MEET, friend_id });
    const json = await LifeWidget.toggleOpenToMeet(friend_id);
  },

  addFlirtForm: (items) => ({
    type: types.ADD_FLIRT_FORM,
    items,
  }),

  setDefaultLoader: () => ({
    type: types.SET_DEFAULT_LOADER
  }),
};

const initialState = {
  isFetching: false,
  isActiveFetching: false,
  isPendingFetching: false,
  isRequestFetching: false,
  isProcessing: false,
  error: null,
  message:"",
  items: [],
  page: 1,
  form: {},
  actives:[],
  pendingFlirts:[],
  requestFlirts:[],
  totalActive:0,
  totalPending:0,
  totalRequest:0,
  total: 0,
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page, message, friend_id } = action;
  switch (type) {

    case types.SET_DEFAULT_LOADER:{
      return {
        ...state,
      isProcessing:false,
      isFetching:false
      }
    }

    case types.FETCH_FLIRT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: error,
        message: message,
      };
    }

    case types.FETCH_FLIRT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: error,
        message: message,
      };
    }

    case types.FETCH_FLIRT_SUCCESS: {

      return Object.assign({}, state, {
        isFetching: false,
        items: items.data,
        total: items.total,
        error: null,
      });
    }

    case types.FETCH_FLIRT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(items.data),
        total: items.total,
        error: null,
      });
    }

    case types.FETCH_ACTIVE_FLIRT_PENDING: {
      return {
        ...state,
        isActiveFetching: true,
        error: error,
        message: message,
      };
    }

    case types.FETCH_ACTIVE_FLIRT_FAILURE: {
      return {
        ...state,
        isActiveFetching: false,
        error: error,
        message: message,
      };
    }

    case types.FETCH_ACTIVE_FLIRT_SUCCESS: {

      return Object.assign({}, state, {
        isActiveFetching: false,
        actives: items.data,
        totalActive: items.total,
        error: null,
      });
    }

    case types.FETCH_ACTIVE_FLIRT_MORE: {
      return Object.assign({}, state, {
        isActiveFetching: false,
        actives: state.actives.concat(items.data),
        totalActive: items.total,
        error: null,
      });
    }

    case types.FETCH_PENDING_FLIRT_PENDING: {
      return {
        ...state,
        isPendingFetching: true,
        error: error,
        message: message,
      };
    }

    case types.FETCH_PENDING_FLIRT_FAILURE: {
      return {
        ...state,
        isPendingFetching: false,
        error: error,
        message: message,
      };
    }

    case types.FETCH_PENDING_FLIRT_SUCCESS: {

      return Object.assign({}, state, {
        isPendingFetching: false,
        pendingFlirts: items.data,
        totalPending: items.total,
        error: null,
      });
    }

    case types.FETCH_PENDING_FLIRT_MORE: {
      return Object.assign({}, state, {
        isPendingFetching: false,
        pendingFlirts: state.pendingFlirts.concat(items.data),
        totalPending: items.total,
        error: null,
      });
    }

    case types.FETCH_PENDING_REQUEST_FLIRT_PENDING: {
      return {
        ...state,
        isRequestFetching: true,
        error: error,
        message: message,
      };
    }

    case types.FETCH_PENDING_REQUEST_FLIRT_FAILURE: {
      return {
        ...state,
        isRequestFetching: false,
        error: error,
        message: message,
      };
    }

    case types.FETCH_PENDING_REQUEST_FLIRT_SUCCESS: {

      return Object.assign({}, state, {
        isRequestFetching: false,
        requestFlirts: items.data,
        totalRequest: items.total,
        error: null,
      });
    }

    case types.FETCH_PENDING_REQUEST_FLIRT_MORE: {
      return Object.assign({}, state, {
        isRequestFetching: false,
        requestFlirts: state.requestFlirts.concat(items.data),
        totalRequest: items.total,
        error: null,
      });
    }

    case types.SUBMIT_FLIRT_PENDING: {
        return {
          ...state,
          isProcessing: true,
          error: error,
          message: message,
        };
      }

      case types.SUBMIT_FLIRT_FAILURE: {
        return {
          ...state,
          isProcessing: false,
          error: error,
          message: message,
        };
      }

    case types.SUBMIT_FLIRT_SUCCESS: {
      return Object.assign({}, state, {
        isProcessing: false,
        form: items.data,
        error: null,
      });
    }

    case types.SEND_FLIRT_REQUEST: {
      let index = state.items.findIndex((item) => item.id === friend_id);
      let indexPending = state.pendingFlirts.findIndex((item) => item.id === friend_id);
      let indexRequest = state.requestFlirts.findIndex((item) => item.id === friend_id);
      const newArray = [...state.items];
      const newPendingFlirts = [...state.pendingFlirts];
      const newRequestFlirts = [...state.requestFlirts];
      if(index>-1){
        newArray[index].flirt_request.is_entry = true;
        newArray[index].flirt_request.is_send_request = true;
      }
      if(indexPending>-1){
        newPendingFlirts[indexPending].flirt_request.is_entry = true;
        newPendingFlirts[indexPending].flirt_request.is_send_request = true;
      }
      if(indexRequest>-1){
        newRequestFlirts[indexRequest].flirt_request.is_entry = true;
        newRequestFlirts[indexRequest].flirt_request.is_send_request = true;
      }

      return Object.assign({}, state, {
        items: newArray,
        pendingFlirts: newPendingFlirts,
        requestFlirts: newRequestFlirts,
      });
    }

    case types.ACCEPT_FLIRT_REQUEST: {
      let index = state.items.findIndex((item) => item.id === friend_id);
      let indexPending = state.pendingFlirts.findIndex((item) => item.id === friend_id);
      const newArray = [...state.items];
      const newPendingFlirts = [...state.pendingFlirts];
      if(index>-1){
        newArray[index].is_flirt = true;
      }
      if(indexPending>-1){
        newPendingFlirts[indexPending].is_flirt = true;
      }
      return Object.assign({}, state, {
        items: newArray,
        pendingFlirts: newPendingFlirts,
      });
    }

    case types.CANCEL_FLIRT_REQUEST: {
      let index = state.items.findIndex((item) => item.id === friend_id);
      let indexPending = state.pendingFlirts.findIndex((item) => item.id === friend_id);
      let indexRequest = state.requestFlirts.findIndex((item) => item.id === friend_id);
      const newArray = [...state.items];
      const newPendingFlirts = [...state.pendingFlirts];
      const newRequestFlirts = [...state.requestFlirts];
      if(index>-1){
        newArray[index].is_flirt = false;
        newArray[index].flirt_request.is_entry = false;
        newArray[index].flirt_request.is_send_request = false;
      }
      if(indexPending>-1){

        newPendingFlirts[indexPending].is_flirt = false;
        newPendingFlirts[indexPending].flirt_request.is_entry = false;
        newPendingFlirts[indexPending].flirt_request.is_send_request = false;
      }
      if(indexRequest>-1){
        newRequestFlirts[indexRequest].is_flirt = false;
        newRequestFlirts[indexRequest].flirt_request.is_entry = false;
        newRequestFlirts[indexRequest].flirt_request.is_send_request = false;
      }

      return Object.assign({}, state, {
        items: newArray,
        pendingFlirts: newPendingFlirts,
        requestFlirts: newRequestFlirts,
      });
    }

    case types.CANCEL_FLIRT_REQUEST_DELETE: {
        let index = state.items.findIndex((item) => item.id === friend_id);
        let indexPending = state.pendingFlirts.findIndex((item) => item.id === friend_id);
        let indexRequest = state.requestFlirts.findIndex((item) => item.id === friend_id);
        const newArray = [...state.items];
        const newPendingFlirts = [...state.pendingFlirts];
        const newRequestFlirts = [...state.requestFlirts];
        if(index>-1){
          newArray[index].is_flirt = false;
          newArray[index].flirt_request.is_entry = false;
          newArray[index].flirt_request.is_send_request = false;
        }
        if(indexPending>-1){
           newPendingFlirts.splice(index, 1);
        }
        if(indexRequest>-1){
            newRequestFlirts.splice(indexRequest, 1);
        }

        return Object.assign({}, state, {
          items: newArray,
          pendingFlirts: newPendingFlirts,
          requestFlirts: newRequestFlirts,
        });
    }

    case types.REMOVE_ACTIVE_FLIRT:{
      let index = state.actives.findIndex((item) => item.id === friend_id);
      const newArray = [...state.actives];
      newArray.splice(index, 1);
      return Object.assign({}, state, {
        actives: newArray,
      });
    }

    case types.TOGGLE_OPEN_TO_MEET:{
      let index = state.actives.findIndex((item) => item.id === friend_id);
      const newArray = [...state.actives];
      newArray[index].is_open_to_meet = !newArray[index].is_open_to_meet;
      return Object.assign({}, state, {
        actives: newArray,
      });
    }

    case types.ADD_FLIRT_FORM: {
      return { ...state, form: items };
    }

    default: {
      return state;
    }
  }
};
