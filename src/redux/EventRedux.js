import { LifeWidget } from "@common";

const types = {
  ADD_EVENT_FORM: "ADD_EVENT_FORM",

  RESET_DATA: "RESET_DATA",

  FETCH_EVENT_PENDING: "FETCH_EVENT_PENDING",
  FETCH_EVENT_FAILURE: "FETCH_EVENT_FAILURE",
  FETCH_EVENT_SUCCESS: "FETCH_EVENT_SUCCESS",
  FETCH_EVENT_MORE: "FETCH_EVENT_MORE",

  FETCH_GOING_EVENT_SUCCESS: "FETCH_GOING_EVENT_SUCCESS",
  FETCH_GOING_EVENT_MORE: "FETCH_GOING_EVENT_MORE",

  FETCH_PENDING_EVENT_SUCCESS: "FETCH_PENDING_EVENT_SUCCESS",
  FETCH_PENDING_EVENT_MORE: "FETCH_PENDING_EVENT_MORE",

  FETCH_CALENDAR_EVENT_SUCCESS: "FETCH_CALENDAR_EVENT_SUCCESS",
  FETCH_CALENDAR_EVENT_MORE: "FETCH_CALENDAR_EVENT_MORE",

  FETCH_MY_EVENT_SUCCESS: "FETCH_MY_EVENT_SUCCESS",
  FETCH_MY_EVENT_MORE: "FETCH_MY_EVENT_MORE",

  FETCH_NEAR_EVENT_SUCCESS: "FETCH_NEAR_EVENT_SUCCESS",
  FETCH_NEAR_EVENT_MORE: "FETCH_NEAR_EVENT_MORE",

  FETCH_INTERESTED_EVENT_SUCCESS: "FETCH_INTERESTED_EVENT_SUCCESS",
  FETCH_INTERESTED_EVENT_MORE: "FETCH_INTERESTED_EVENT_MORE",

  SUBMIT_EVENT_PENDING: "SUBMIT_EVENT_PENDING",
  SUBMIT_EVENT_SUCCESS: "SUBMIT_EVENT_SUCCESS",
  SUBMIT_EVENT_FAILURE: "SUBMIT_EVENT_FAILURE",

  SUBMIT_RESPONSE_PENDING: "SUBMIT_RESPONSE_PENDING",
  SUBMIT_RESPONSE_SUCCESS: "SUBMIT_RESPONSE_SUCCESS",
  SUBMIT_RESPONSE_FAILURE: "SUBMIT_RESPONSE_FAILURE",

  REMOVE_EVENT: "REMOVE_EVENT",

  ADD_RESPONSE_DATA: "ADD_RESPONSE_DATA",
  ADD_ADDRESS_DATA: "ADD_ADDRESS_DATA",
};
export const actions = {
  addEventForm: (data) => ({
    type: types.ADD_EVENT_FORM,
    data,
  }),

  saveResponse: (data) => ({
    type: types.ADD_RESPONSE_DATA,
    data,
  }),

  saveAddress: (data) => ({
    type: types.ADD_ADDRESS_DATA,
    data,
  }),

  fetchEvent: async (dispatch, per_page, page, params = [], type) => {
    dispatch({ type: types.FETCH_EVENT_PENDING });
    const json = await LifeWidget.fetchEvents(per_page, page, params);
    if (json === undefined) {
      console.log("json undefined.....");
      dispatch({
        type: types.FETCH_EVENT_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      console.log("status failure......", json);
      dispatch({
        type: types.FETCH_EVENT_FAILURE,
        message: json.data.message,
      });
    } else {
      console.log("seccess....");
      if (page > 1) {
        if (type === "all") {
          dispatch({ type: types.FETCH_EVENT_MORE, page: page, data: json });
        } else if (type === "going") {
          dispatch({
            type: types.FETCH_GOING_EVENT_MORE,
            page: page,
            data: json,
          });
        } else if (type === "pending") {
          dispatch({
            type: types.FETCH_PENDING_EVENT_MORE,
            page: page,
            data: json,
          });
        } else if (type === "calendar") {
          dispatch({
            type: types.FETCH_CALENDAR_EVENT_MORE,
            page: page,
            data: json,
          });
        } else if (type === "my") {
          dispatch({
            type: types.FETCH_MY_EVENT_MORE,
            page: page,
            data: json,
          });
        } else if (type === "near") {
          dispatch({
            type: types.FETCH_NEAR_EVENT_MORE,
            page: page,
            data: json,
          });
        } else if (type === "interested") {
          dispatch({
            type: types.FETCH_INTERESTED_EVENT_MORE,
            page: page,
            data: json,
          });
        }
      } else {
        if (type === "all") {
          dispatch({ type: types.FETCH_EVENT_SUCCESS, page: page, data: json });
        } else if (type === "going") {
          dispatch({
            type: types.FETCH_GOING_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        } else if (type === "pending") {
          dispatch({
            type: types.FETCH_PENDING_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        } else if (type === "calendar") {
          dispatch({
            type: types.FETCH_CALENDAR_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        } else if (type === "my") {
          dispatch({
            type: types.FETCH_MY_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        } else if (type === "near") {
          dispatch({
            type: types.FETCH_NEAR_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        } else if (type === "interested") {
          dispatch({
            type: types.FETCH_INTERESTED_EVENT_SUCCESS,
            page: page,
            data: json,
          });
        }
      }
    }
  },

  submitEvent: async (dispatch, data) => {
    console.log("submitted");
    dispatch({ type: types.SUBMIT_EVENT_PENDING });
    const json = await LifeWidget.submitEvents(data);
    console.log("res", json);
    if (json === undefined) {
      dispatch({
        type: types.SUBMIT_EVENT_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.data.success) {
      console.log("submit success", json);
      dispatch({
        type: types.SUBMIT_EVENT_SUCCESS,
        data: json.data,
        message: "Submited successfully!",
      });
    } else {
      console.log("fail....", json.data.message);
      dispatch({
        type: types.SUBMIT_EVENT_FAILURE,
        message: "Submission failed!",
        error: json.data.message,
      });
    }
  },

  submitInviteResponse: async (dispatch, data, id) => {
    console.log(id);
    if (id) {
      dispatch({
        type: types.REMOVE_EVENT,
        data: id,
      });
    }

    dispatch({ type: types.SUBMIT_RESPONSE_PENDING });
    const json = await LifeWidget.submitResponse(data);
    if (json === undefined) {
      dispatch({
        type: types.SUBMIT_EVENT_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.data.success) {
      // console.log("submit success", json.data);
      dispatch({
        type: types.SUBMIT_RESPONSE_SUCCESS,
        data: json.data.data,
        message: "Submited successfully!",
      });
    } else {
      dispatch({
        type: types.SUBMIT_RESPONSE_FAILURE,
        message: "Submission failed!",
        error: json.data.message,
      });
    }
  },
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  error: null,
  message: "",
  data: [],
  goingData: [],
  pendingData: [],
  calendarData: [],
  myEventData: [],
  nearEventData: [],
  interestedEventData: [],
  page: 1,
  form: {},
  responseData: {},
  types: [],
  selectedAddress: "",
  total: 0,
};

export const reducer = (state = initialState, action) => {
  const { type, error, page, data, message } = action;
  switch (type) {
    case types.ADD_EVENT_FORM: {
      return { ...state, form: data, isProcessing: false };
    }

    case types.ADD_RESPONSE_DATA: {
      return { ...state, responseData: data, isProcessing: false };
    }

    case types.ADD_ADDRESS_DATA: {
      return { ...state, selectedAddress: data, isProcessing: false };
    }

    case types.FETCH_EVENT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_EVENT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: data.data.data,
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        data: state.data.concat(data.data.data),
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GOING_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        goingData: data.data.data,
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GOING_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        goingData: state.goingData.concat(data.data.data),
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_PENDING_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        pendingData: data.data.data,
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_PENDING_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        pendingData: state.pendingData.concat(data.data.data),
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_CALENDAR_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        calendarData: data.data,
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_CALENDAR_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        calendarData: state.calendarData.concat(data.data),
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_MY_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        myEventData: data.data,
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_MY_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        myEventData: state.myEventData.concat(data.data),
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_NEAR_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        nearEventData: data.data.data,
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_NEAR_EVENT_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        nearEventData: state.nearEventData.concat(data.data.data),
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_INTERESTED_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        interestedEventData: data.data.data,
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_INTERESTED_EVENT_More: {
      return Object.assign({}, state, {
        isFetching: false,
        interestedEventData: state.interestedEventData.concat(data.data.data),
        total: data.data.total,
        error: null,
        page,
      });
    }

    case types.SUBMIT_EVENT_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_EVENT_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: error,
        message: message,
      };
    }

    case types.SUBMIT_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        message: message,
        isProcessing: false,
        form: {},
        selectedAddress: "",
      });
    }

    case types.SUBMIT_RESPONSE_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_RESPONSE_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: error,
        message: message,
      };
    }

    case types.SUBMIT_RESPONSE_SUCCESS: {
      console.log("reducer", data);
      let dataIndex = state.data.findIndex((d) => d.id === data.id);
      let nearIndex = state.nearEventData.findIndex((n) => n.id === data.id);
      let goingIndex = state.goingData.findIndex((g) => g.id === data.id);
      let pendingIndex = state.pendingData.findIndex((p) => p.id === data.id);

      let newDataArray = [...state.data];
      let nearArray = [...state.nearEventData];
      let goingArray = [...state.goingData];
      let pendingArray = [...state.pendingData];

      if (dataIndex > -1) {
        newDataArray[dataIndex].is_interested = data.is_interested;
        newDataArray[dataIndex].is_going = data.is_going;
        newDataArray[dataIndex].is_rejected = data.is_rejected;
      }

      if (nearIndex > -1) {
        nearArray[nearIndex].is_interested = data.is_interested;
        nearArray[nearIndex].is_going = data.is_going;
        nearArray[nearIndex].is_rejected = data.is_rejected;
      }

      if (goingIndex > -1) {
        goingArray[goingIndex].is_interested = data.is_interested;
        goingArray[goingIndex].is_going = data.is_going;
        goingArray[goingIndex].is_rejected = data.is_rejected;
      }

      if (pendingIndex > -1) {
        pendingArray[pendingIndex].is_interested = data.is_interested;
        pendingArray[pendingIndex].is_going = data.is_going;
        pendingArray[pendingIndex].is_rejected = data.is_rejected;
      }

      return Object.assign({}, state, {
        data: newDataArray,
        nearEventData: nearArray,
        goingData: goingArray,
        pendingData: pendingArray,
      });
    }

    case types.REMOVE_EVENT: {
      console.log("red", data);
      let pendingIndex = state.pendingData.findIndex((p) => p.id === data);

      if (pendingIndex > -1) {
        state.pendingData.splice(pendingIndex, 1);
      }
    }

    default: {
      return state;
    }
  }
};
