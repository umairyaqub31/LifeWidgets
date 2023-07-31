import { LifeWidget } from "@common";

const types = {
  FETCH_BARS_PENDING: "FETCH_BARS_PENDING",
  FETCH_BARS_FAILURE: "FETCH_BARS_FAILURE",
  FETCH_BARS_SUCCESS: "FETCH_BARS_SUCCESS",
  FETCH_BARS_MORE: "FETCH_BARS_MORE",

  FETCH_BAR_TYPES: "FETCH_BAR_TYPES",
  FETCH_BAR_SERVICES: "FETCH_BAR_SERVICES",

  SUBMIT_BAR_PENDING: "SUBMIT_BAR_PENDING",
  SUBMIT_BAR_SUCCESS: "SUBMIT_BAR_SUCCESS",
  SUBMIT_BAR_FAILURE: "SUBMIT_BAR_FAILURE",

  FETCH_SEARCH_BARS_PENDING: "FETCH_SEARCH_BARS_PENDING",
  FETCH_SEARCH_BARS_FAILURE: "FETCH_SEARCH_BARS_FAILURE",
  FETCH_SEARCH_BARS_SUCCESS: "FETCH_SEARCH_BARS_SUCCESS",
  FETCH_SEARCH_BARS_MORE: "FETCH_SEARCH_BARS_MORE",

  LET_GET_STARTED:"LET_GET_STARTED",

  ADD_BAR_FAVOURITE: "ADD_BAR_FAVOURITE",

  REMOVE_BAR_FAVOURITE: "REMOVE_BAR_FAVOURITE",

  ADD_BAR_FORM: "ADD_BAR_FORM",
};

export const actions = {
  fetchBars: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_BARS_PENDING });
    const json = await LifeWidget.fetchBars(per_page, page, params);
    if (json === undefined) {
      dispatch(actions.fetchBarsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchBarsFailure(json.data.message));
    } else {
      if (page > 1) {
        dispatch(actions.fetchBarsMore(json));
      } else {
        dispatch(actions.fetchBarsSuccess(json));
      }
    }
  },

  searchBars: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_SEARCH_BARS_PENDING });
    const json = await LifeWidget.fetchBars(per_page, page, params);
    if (json === undefined) {
      dispatch({ type: types.FETCH_SEARCH_BARS_FAILURE, error:"Can't get data from server" });
    } else if (json.status) {
      dispatch({ type: types.FETCH_SEARCH_BARS_FAILURE, error:json.data.message});
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_SEARCH_BARS_MORE, data:json});
      } else {
        dispatch({ type: types.FETCH_SEARCH_BARS_SUCCESS, data:json});
      }
    }
  },

  fetchBarTypes: async (dispatch) => {
    const json = await LifeWidget.fetchBarTypes();
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({ type: types.FETCH_BAR_TYPES, data: json });
    }
  },

  fetchBarServices: async (dispatch) => {
    const json = await LifeWidget.fetchBarServices();
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({ type: types.FETCH_BAR_SERVICES, data: json });
    }
  },

  submitBar: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_BAR_PENDING });
    const json = await LifeWidget.submitBar(data);

    if (json.success) {
      dispatch(actions.submitBarSuccess(json.data));
    } else {
      dispatch(actions.submitBarFailure(json.data.message));
    }
  },

  addBarFavourite: async (dispatch, item) => {
    await LifeWidget.addBarFavourite(item.id);
    //dispatch({ type: types.ADD_BAR_FAVOURITE, items: item });
  },
  removeBarFavourite: async (dispatch, item) => {
    await LifeWidget.removeBarFavourite(item.id);
    //dispatch({ type: types.REMOVE_BAR_FAVOURITE, items: item });
  },

  fetchBarsSuccess: (items) => ({
    type: types.FETCH_BARS_SUCCESS,
    items,
    page: items.current_page,
  }),
  fetchBarsMore: (items) => ({
    type: types.FETCH_BARS_MORE,
    items,
    page: items.current_page,
  }),
  fetchBarsFailure: (error) => ({
    type: types.FETCH_BARS_FAILURE,
    error,
  }),
  submitBarSuccess: (items) => ({
    type: types.SUBMIT_BAR_SUCCESS,
    items,
  }),
  submitBarFailure: (error) => ({
    type: types.SUBMIT_BAR_FAILURE,
    error,
  }),
  addBarForm: (data) => ({
    type: types.ADD_BAR_FORM,
    data,
  }),

  letGetStarted: () => ({
    type: types.LET_GET_STARTED,
  }),
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  error: null,
  items: [],
  page: 1,
  form: {},
  services: [],
  types: [],
  total: 0,
  search:[],
  isSearching:false,
  totalSearch:0,
  getStarted:false,
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page, data } = action;
  switch (type) {
    case types.FETCH_BARS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_BARS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_BARS_SUCCESS: {

      return Object.assign({}, state, {
        isFetching: false,
        items: items.data,
        total: items.total,
        error: null,
        page,
      });
    }

    case types.FETCH_BARS_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(items.data),
        total: items.total,
        error: null,
        page,
      });
    }

    case types.FETCH_SEARCH_BARS_PENDING: {
      return {
        ...state,
        isSearching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_SEARCH_BARS_FAILURE: {
      return {
        ...state,
        isSearching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_SEARCH_BARS_SUCCESS: {

      return Object.assign({}, state, {
        isSearching: false,
        search: data.data,
        totalSearch: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_SEARCH_BARS_MORE: {
      return Object.assign({}, state, {
        isSearching: false,
        search: state.search.concat(data.data),
        totalSearch: data.total,
        error: null,
        page,
      });
    }

    case types.SUBMIT_BAR_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_BAR_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: error,
        message: "",
      };
    }

    case types.SUBMIT_BAR_SUCCESS: {
      let newArray = [];
      newArray = [items, ...state.items];
      return Object.assign({}, state, {
        isProcessing: false,
        items: newArray,
        error: null,
        form: {},
        page,
      });
    }

    case types.ADD_BAR_FAVOURITE: {
      let index = state.items.findIndex((item) => item.id === items.id);
      const newArray = [...state.items];

      newArray[index].is_favourite = true;
      return Object.assign({}, state, {
        items: newArray,
      });
    }

    case types.REMOVE_BAR_FAVOURITE: {
      let index = state.items.findIndex((item) => item.id === items.id);
      const newArray = [...state.items];

      newArray[index].is_favourite = false;
      return Object.assign({}, state, {
        items: newArray,
      });
    }

    case types.ADD_BAR_FORM: {
      return { ...state, form: data };
    }

    case types.FETCH_BAR_TYPES: {
      return { ...state, types: data };
    }

    case types.FETCH_BAR_SERVICES: {
      return { ...state, services: data };
    }

    case types.LET_GET_STARTED: {
      return { ...state, getStarted: true };
    }

    default: {
      return state;
    }
  }
};