import { LifeWidget } from "@common";
import { ScheduleLocalNotification } from "@helpers";
import { DeviceEventEmitter } from "react-native";

const types = {
  FETCH_FEEDS_PENDING: "FETCH_FEEDS_PENDING",
  FETCH_FEEDS_SUCCESS: "FETCH_FEEDS_SUCCESS",
  FETCH_FEEDS_FAILURE: "FETCH_FEEDS_FAILURE",
  RESET_STATE: "RESET_STATE",
  ADD_CUSTOM_CARD_FEED: "ADD_CUSTOM_CARD_FEED",
  FETCH_FEEDS_MORE_SUCCESS: "FETCH_FEEDS_MORE_SUCCESS",
  SET_COMMENT_COUNT_FEED: "SET_COMMENT_COUNT_FEED",
  SUBMIT_FEED_PENDING: "SUBMIT_FEED_PENDING",
  SUBMIT_FEED_SUCCESS: "SUBMIT_FEED_SUCCESS",
  SUBMIT_FEED_FAILURE: "SUBMIT_FEED_FAILURE",
  FEED_TRIGGER_READY: "FEED_TRIGGER_READY",
  DELETE_POST_FEED: "DELETE_POST_FEED",
  SET_DEFAULT_FETCH_STATUS:"SET_DEFAULT_FETCH_STATUS",
  FEED_SNOOZE_FRIEND:"FEED_SNOOZE_FRIEND",
  FEED_UNSNOOZE_FRIEND:"FEED_UNSNOOZE_FRIEND",
  FEED_UNFRIEND:"FEED_UNFRIEND"
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  error: null,
  feed: [],
  last_page: 1,
  totalFeeds: 0,
  triggerReady: false,
  page: 1,
};

export const actions = {
  fetchFeed: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_FEEDS_PENDING });
    const json = await LifeWidget.userPublicFeed(per_page, page);
    if (json === undefined) {
      dispatch(actions.fetchFeedsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchFeedsFailure(json.data.message));
    } else {
      if (page > 1) {
        dispatch(actions.fetchFeedsSuccessMore(json));
      } else {
        dispatch(actions.fetchFeedsSuccess(json));
      }
    }
  },
  submitPost: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_FEED_PENDING });
    const json = await LifeWidget.submit(data);

    if (json.success) {
      DeviceEventEmitter.emit("event.feed.refresh");
      dispatch({ type: types.SUBMIT_FEED_SUCCESS, items: json.data });
    } else {
      dispatch({
        type: types.SUBMIT_FEED_FAILURE,
        error: true,
        message: "Can't get data from server",
      });
    }
  },
  feedTriggerReady: () => {
    return { type: types.FEED_TRIGGER_READY };
  },
  resetState: (dispatch) => {
    console.log("...................RESET STATE ACTION....................");
    dispatch({ type: types.RESET_STATE });
  },
  fetchFeedsSuccess: (json) => ({
    type: types.FETCH_FEEDS_SUCCESS,
    json: json,
    page: json.current_page,
  }),

  fetchFeedsSuccessMore: (json) => ({
    type: types.FETCH_FEEDS_MORE_SUCCESS,
    json,
    page: json.current_page,
  }),

  fetchFeedsFailure: (error) => ({
    type: types.FETCH_FEEDS_FAILURE,
    error,
  }),
  deletePostFeed: async (dispatch, item) => {
    dispatch({ type: types.DELETE_POST_FEED, items: item });
    await LifeWidget.deletePost(item.id);
  },
  setDefaultFetchStatus: () => {
    return { type: types.SET_DEFAULT_FETCH_STATUS };
  },
  addCustomCard: (card) => ({
    type: types.ADD_CUSTOM_CARD_FEED,
    card: card,
  }),
  setCommentCounterFeed: (items, total_comment) => ({
    type: types.SET_COMMENT_COUNT_FEED,
    items,
    total_comment,
  }),
  snoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.FEED_SNOOZE_FRIEND, items:friend_id });
    const json = await LifeWidget.snoozeFriend(friend_id);
  },
  unsnoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.FEED_UNSNOOZE_FRIEND, items:friend_id });
    const json = await LifeWidget.unsnoozeFriend(friend_id);
  },
  unfriend: async (dispatch, friend_id) => {
    dispatch({ type: types.FEED_UNFRIEND, items:friend_id });
    //const json = await LifeWidget.cancelFriendRequest(friend_id);
  },
};

export const reducer = (state = initialState, action) => {
  const { type, error, card, json, page, items, total_comment } = action;
  switch (type) {
    case types.FETCH_FEEDS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_FEEDS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_FEEDS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        feed: json.data,
        last_page: json.last_page,
        error: null,
        totalFeeds: json.total,
        timeoutTrigger: false,
        page,
      });
    }
    case types.FETCH_FEEDS_MORE_SUCCESS: {
      console.log("..................FETCH FEEDS MORE SUCCESS...........");
      return Object.assign({}, state, {
        isFetching: false,
        feed: state.feed.concat(json.data),
        last_page: json.last_page,
        error: null,
        totalFeeds: json.total,
        timeoutTrigger: false,
        page,
      });
    }
    case types.SUBMIT_FEED_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_FEED_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: null,
        message: "",
      };
    }

    case types.SUBMIT_FEED_SUCCESS: {
      if (state.triggerReady) {
        ScheduleLocalNotification(items);
      }
      return Object.assign({}, state, {
        isProcessing: false,
        feed: state.feed.concat(items),
        error: null,
        triggerReady: false,
      });
    }
    case types.FEED_TRIGGER_READY: {
      return {
        ...state,
        triggerReady: true,
      };
    }
    case types.ADD_CUSTOM_CARD_FEED: {
      return { ...state };
      return Object.assign({}, state, {
        feed: state.feed.concat(card),
        isFetching: false,
        timeoutTrigger: true,
      });
    }
    case types.SET_COMMENT_COUNT_FEED: {
      let newArr = [...state.feed];
      let postIndex = newArr.findIndex((item) => item.id === items.post_id);

      let postArry = newArr[postIndex];
      postArry.comments_count = total_comment;
      newArr[postIndex] = postArry;
      return Object.assign({}, state, {
        feed: newArr,
      });
    }
    case types.DELETE_POST_FEED: {
      let newArray = [...state.feed];
      const postDeletedArray = newArray.filter((post) => post.id !== items.id);
      return {
        ...state,
        feed: postDeletedArray,
      };
    }
    case types.FEED_SNOOZE_FRIEND: {
      let newArray = [...state.feed];
      let postArry = [];
      const posts = newArray.filter((post) => post.user.id === items);
      posts.map((_,key)=>{
        postArry = newArray[key];
        postArry.user.is_snoozed = true;
        newArray[key] = postArry;
      });      
      return {
        ...state,
        feed: newArray,
      };
    }
    case types.FEED_UNSNOOZE_FRIEND: {
      let newArray = [...state.feed];
      let postArry = [];
      const posts = newArray.filter((post) => post.user.id === items);
      posts.map((_,key)=>{
        postArry = newArray[key];
        postArry.user.is_snoozed = false;
        newArray[key] = postArry;
      });      
      return {
        ...state,
        feed: newArray,
      };
    }
    case types.FEED_UNFRIEND:{
      let newArray = [...state.feed];
      let postArry = [];
      const posts = newArray.filter((post) => post.user.id === items);
      posts.map((_,key)=>{
        postArry = newArray[key];
        postArry.user.is_friend = false;
        newArray[key] = postArry;
      });      
      return {
        ...state,
        feed: newArray,
      };
    }
    case types.SET_DEFAULT_FETCH_STATUS:{
      return {
        ...state,
        isProcessing: false,
      };
    }
    case types.RESET_STATE: {
      console.log("...................RESET STATE REDUCER....................");
      return {
        ...state,
        initialState,
      };
    }
    default: {
      return state;
    }
  }
};
