import { LifeWidget } from "@common";

const types = {
  FETCH_COMPANY_PENDING: "FETCH_COMPANY_PENDING",
  FETCH_COMPANY_FAILURE: "FETCH_COMPANY_FAILURE",
  FETCH_COMPANY_SUCCESS: "FETCH_COMPANY_SUCCESS",
  FETCH_COMPANY_MORE: "FETCH_COMPANY_MORE",

  FETCH_COMPANY_RESTAURANT_PENDING: "FETCH_COMPANY_RESTAURANT_PENDING",
  FETCH_COMPANY_RESTAURANT_FAILURE: "FETCH_COMPANY_RESTAURANT_FAILURE",
  FETCH_COMPANY_RESTAURANT_SUCCESS: "FETCH_COMPANY_RESTAURANT_SUCCESS",
  FETCH_COMPANY_RESTAURANT_MORE: "FETCH_COMPANY_RESTAURANT_MORE",

  FETCH_COMPANY_TYPES: "FETCH_COMPANY_TYPES",

  SUBMIT_COMPANY_PENDING: "SUBMIT_COMPANY_PENDING",
  SUBMIT_COMPANY_SUCCESS: "SUBMIT_COMPANY_SUCCESS",
  SUBMIT_COMPANY_FAILURE: "SUBMIT_COMPANY_FAILURE",

  DELETE_COMPANY:"DELETE_COMPANY",

  ADD_COMPANY_FORM: "ADD_COMPANY_FORM",
  RESTAURANT_GET_STARTED:"RESTAURANT_GET_STARTED",
};

export const actions = {
  fetchCompany: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_COMPANY_PENDING });
    const json = await LifeWidget.fetchBars(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_COMPANY_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({
        type: types.FETCH_COMPANY_FAILURE,
        message: json.data.message,
      });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_COMPANY_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_COMPANY_SUCCESS, page: page, data: json });
      }
    }
  },

  fetchRestaurant: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_COMPANY_RESTAURANT_PENDING });
    const json = await LifeWidget.fetchBars(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_COMPANY_RESTAURANT_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({
        type: types.FETCH_COMPANY_RESTAURANT_FAILURE,
        message: json.data.message,
      });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_COMPANY_RESTAURANT_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_COMPANY_RESTAURANT_SUCCESS, page: page, data: json });
      }
    }
  },

  fetchCompanyTypes: async (dispatch) => {
    const json = await LifeWidget.companyTypes();
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({ type: types.FETCH_COMPANY_TYPES, data: json });
    }
  },

  submitCompany: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_COMPANY_PENDING });
    const json = await LifeWidget.submitBar(data);
    if(json === undefined){
      dispatch({
        type: types.SUBMIT_COMPANY_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.success) {
      dispatch({ type: types.SUBMIT_COMPANY_SUCCESS, data: json });
    } else {
      dispatch({
        type: types.SUBMIT_COMPANY_FAILURE,
        message: json.data.message,
      });
    }
  },

  deleteCompany: async (dispatch, data) => {
    dispatch({ type: types.DELETE_COMPANY, data });
    const json = await LifeWidget.deleteCompany(data);
  },

  addCompanyForm: (data) => ({
    type: types.ADD_COMPANY_FORM,
    data,
  }),
  restaurantGetStarted: () => ({
    type: types.RESTAURANT_GET_STARTED,
  }),
};

const initialState = {
  isFetching: false,
  isRestaurantFetching: false,
  isProcessing: false,
  error: null,
  message: "",
  data: [],
  page: 1,
  form: {},
  types: [],
  total: 0,
  restaurants: [],
  totalRestaurant: 0,
  restaurantGetStarted: false,
};

export const reducer = (state = initialState, action) => {
  const { type, error, page, data } = action;
  switch (type) {
    case types.FETCH_COMPANY_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COMPANY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COMPANY_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: data.data,
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_COMPANY_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        data: state.data.concat(data.data),
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_COMPANY_RESTAURANT_PENDING: {
      return {
        ...state,
        isRestaurantFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COMPANY_RESTAURANT_FAILURE: {
      return {
        ...state,
        isRestaurantFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_COMPANY_RESTAURANT_SUCCESS: {
      return Object.assign({}, state, {
        isRestaurantFetching: false,
        restaurants: data.data,
        totalRestaurant: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_COMPANY_RESTAURANT_MORE: {
      return Object.assign({}, state, {
        isRestaurantFetching: false,
        restaurants: state.restaurants.concat(data.data),
        totalRestaurant: data.total,
        error: null,
        page,
      });
    }

    case types.SUBMIT_COMPANY_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_COMPANY_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: error,
        message: "",
      };
    }

    case types.SUBMIT_COMPANY_SUCCESS: {
      let index = state.data.findIndex((item) => item.id === data.data.id);
      let newArray = [...state.data];
      if(index>-1){
        newArray[index] = data.data;
      } else {
        newArray = [data.data, ...state.data];
      }

      return Object.assign({}, state, {
        isProcessing: false,
        data: newArray,
        total: index>-1?state.total:state.total+1,
        form: {},
        page,
      });
    }

    case types.DELETE_COMPANY:{
      let index = state.data.findIndex((item) => item.id === data);
      const newArray = [...state.data];
      newArray.splice(index, 1);
      return Object.assign({}, state, {
        data: newArray,
        total:state.total-1
      });
    }

    case types.ADD_COMPANY_FORM: {
      return { ...state, form: data, isProcessing:false };
    }

    case types.FETCH_COMPANY_TYPES: {
      return { ...state, types: data };
    }

    case types.RESTAURANT_GET_STARTED: {
      return { ...state, restaurantGetStarted: true };
    }

    default: {
      return state;
    }
  }
};
