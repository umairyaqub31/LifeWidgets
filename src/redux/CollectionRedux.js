import { LifeWidget } from "@common";
const types = {
  FETCH_COLLECTION_PENDING: "FETCH_COLLECTION_PENDING",
  FETCH_COLLECTION_SUCCESS: "FETCH_COLLECTION_SUCCESS",
  FETCH_COLLECTION_MORE: "FETCH_COLLECTION_MORE",
  FETCH_COLLECTION_FAILURE: "FETCH_COLLECTION_FAILURE",
  ADD_COLLECTION_FORM: "ADD_COLLECTION_FORM",
  SUBMIT_COLLECTION_PENDING: "SUBMIT_COLLECTION_PENDING",
  SUBMIT_COLLECTION_SUCCESS: "SUBMIT_COLLECTION_SUCCESS",
  SUBMIT_COLLECTION_FAILURE: "SUBMIT_COLLECTION_FAILURE",

  DELETE_COLLECTION_SUCCESS: "DELETE_COLLECTION_SUCCESS",
};

export const actions = {
  fetchCollections: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_COLLECTION_PENDING });
    const json = await LifeWidget.collections(per_page, page);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_COLLECTION_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_COLLECTION_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_COLLECTION_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_COLLECTION_SUCCESS, page: page, data: json });
      }
    }
  },
  submitCollection: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_COLLECTION_PENDING });
    const json = await LifeWidget.saveCollection(data);

    if (json.id) {
      dispatch({ type: types.SUBMIT_COLLECTION_SUCCESS, data: json });
    } else {
      dispatch({
        type: types.SUBMIT_COLLECTION_FAILURE,
        message: json.data.message,
      });
    }
  },

  deleteCollection: async (dispatch, id) => {
    dispatch({ type: types.DELETE_COLLECTION_SUCCESS, data: id });
    const json = await LifeWidget.deleteCollection(id);
    
  },

  addGroupForm: (data) => ({
    type: types.ADD_COLLECTION_FORM,
    data,
  }),
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  data: [],
  error: null,
  page: 1,
  total:0,
  form: {},
};

export const reducer = (state = initialState, action) => {
  const { type, error, data, page } = action;
  switch (type) {
    case types.FETCH_COLLECTION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COLLECTION_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COLLECTION_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: data.data,
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_COLLECTION_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        data: state.data.concat(data.data),
        total: data.total,
        error: null,
        page,
      });
    }

    case types.SUBMIT_COLLECTION_PENDING: {
      return {
        ...state,
        isProcessing: true,
      };
    }

    case types.SUBMIT_COLLECTION_FAILURE: {
      return {
        ...state,
        isProcessing: false,
      };
    }

    case types.SUBMIT_COLLECTION_SUCCESS: {
      return Object.assign({}, state, {
        isProcessing: false,
        data: state.data.concat(data),
        total: data.total+1,
      });
    }

    case types.DELETE_COLLECTION_SUCCESS:{
      let index = state.data.findIndex((item) => item.id === data);
      const newArray = [...state.data];
      newArray.splice(index, 1);
      return Object.assign({}, state, {
        data: newArray,
        total:state.total-1
      });
    }


    case types.ADD_COLLECTION_FORM: {
      return { ...state, form: data };
    }

    default: {
      return state;
    }
  }
};