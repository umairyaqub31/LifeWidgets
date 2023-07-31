import { LifeWidget } from "@common";
import { ScheduleLocalNotification } from '@helpers';
import { isJSDocCommentContainingNode } from "typescript";
import normalize from "universal-normalizer";
import { DeviceEventEmitter } from "react-native";
const types = {
  FETCH_POSTS_PENDING: "FETCH_POSTS_PENDING",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_MORE: "FETCH_POSTS_MORE",
  PUSH_USER_FEED_TO_END: "PUSH_USER_FEED_TO_END",
  PUSH_USER_FEED_TO_START: "PUSH_USER_FEED_TO_START",
  FETCH_USER_POSTS_MORE: "FETCH_USER_POSTS_MORE",
  FETCH_USER_POSTS_PENDING: "FETCH_USER_POSTS_PENDING",
  FETCH_POSTS_FAILURE: "FETCH_POSTS_FAILURE",
  VIEWABLE_ITEMS_CHANGED: "VIEWABLE_ITEMS_CHANGED",
  VIEWABLE_ITEMS_CHANGED: "VIEWABLE_ITEMS_CHANGED",
  LIKE_POST: "LIKE_POST",
  UNLIKE_POST: "UNLIKE_POST",
  FETCH_POSTS_NORMALIZE: "FETCH_POSTS_NORMALIZE",
  FETCH_POSTS_NORMALIZE_MORE: "FETCH_POSTS_NORMALIZE_MORE",
  SUBMIT_POST_PENDING: "SUBMIT_POST_PENDING",
  SUBMIT_POST_SUCCESS: "SUBMIT_POST_SUCCESS",
  SUBMIT_POST_FAILURE: "SUBMIT_POST_FAILURE",
  SET_POST_PRIVACY: "SET_POST_PRIVACY",
  SET_POST_DESTINATION: "SET_POST_DESTINATION",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  SET_DEFAULT_LIST: "SET_DEFAULT_LIST",
  DELETE_POST: "DELETE_POST",
  FETCH_USER_PUBLIC_POST_PENDING:"FETCH_USER_PUBLIC_POST_PENDING",
  FETCH_USER_PUBLIC_POST_SUCCESS:"FETCH_USER_PUBLIC_POST_SUCCESS",
  FETCH_USER_PUBLIC_POST_MORE_SUCCESS:"FETCH_USER_PUBLIC_POST_MORE_SUCCESS",
  FETCH_USER_PUBLIC_POST_FAILURE:"FETCH_USER_PUBLIC_POST_FAILURE",
  ADD_POST_FORM: "ADD_POST_FORM",
  SET_DEFAULT_FETCH_STATUS: "SET_DEFAULT_FETCH_STATUS",
  SET_TRIGGER_READY: "SET_TRIGGER_READY",
  ADD_CUSTOM_CARD: "ADD_CUSTOM_CARD",
  SET_COMMENT_COUNT:"SET_COMMENT_COUNT",
  UNSAVE_POST:"UNSAVE_POST",
  POST_SNOOZE_FRIEND:"POST_SNOOZE_FRIEND",
  POST_UNSNOOZE_FRIEND:"POST_UNSNOOZE_FRIEND",
  POST_UNFRIEND:"POST_UNFRIEND",
  RESET_POST_FORM:"RESET_POST_FORM",
};
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

export const actions = {
  fetchPosts: async (dispatch, per_page, page, hasExistingFeeds) => {
    dispatch({ type: types.FETCH_POSTS_PENDING });
    const json = await LifeWidget.posts(per_page, page);
    if (json === undefined) {
      dispatch(actions.fetchPostsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchPostsFailure(json.data.message));
    } else {
      if (hasExistingFeeds > 0 && page > 1) {
        dispatch(actions.fetchPostsMore(json));
      } else {
        dispatch(actions.fetchPostsSuccess(json));
      }
    }
  },
  resortUserFeedFetchPosts: async (dispatch, per_page, page, user_id) => {
    dispatch({ type: types.FETCH_USER_POSTS_PENDING });
    const json = await LifeWidget.morePosts(per_page, page, user_id);
    if (json === undefined) {
      dispatch(actions.fetchPostsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchPostsFailure(json.data.message));
    } else {
      dispatch(actions.resortUserFeedToStart(json, user_id));
    }
  },
  fetchUserPosts: async (dispatch, per_page, page, user_id) => {
    dispatch({ type: types.FETCH_USER_POSTS_PENDING });
    const json = await LifeWidget.morePosts(per_page, page, user_id);
    if (json === undefined) {
      dispatch(actions.fetchPostsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchPostsFailure(json.data.message));
    } else {
      dispatch(actions.fetchUserPostsSuccess(json, user_id));
    }
  },
  fetchUserPublicPosts: async (dispatch, per_page, page, user_id, save_id=null, group_id=null) => {
    dispatch({ type: types.FETCH_USER_PUBLIC_POST_PENDING });
    const json = await LifeWidget.morePosts(per_page, page, user_id, save_id, group_id);
    if (json === undefined) {
      dispatch({ type: types.FETCH_USER_PUBLIC_POST_FAILURE, error:"Can't get data from server" });
    } else if (json.status) {
      dispatch({ type: types.FETCH_USER_PUBLIC_POST_FAILURE, error:json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_USER_PUBLIC_POST_MORE_SUCCESS, items:json, user_id:user_id });
      } else {
        dispatch({ type: types.FETCH_USER_PUBLIC_POST_SUCCESS, items:json, user_id:user_id });
      }
    }
  },
  fetchCategories: async (dispatch) => {
    const json = await LifeWidget.fetchCategories();
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({ type: types.FETCH_CATEGORIES_SUCCESS, items: json });
    }
  },
  sharePost: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_POST_PENDING });
    const json = await LifeWidget.share(data);

    if (json.success) {
      DeviceEventEmitter.emit("event.feed.refresh");
      dispatch(actions.postSubmitSuccess(json.data));

    } else {
      dispatch(actions.postSubmitFailure(json.data.message));
    }
  },
  submitPost: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_POST_PENDING });
    const json = await LifeWidget.submit(data);

    if (json.success) {
       DeviceEventEmitter.emit("event.feed.refresh");
      dispatch(actions.postSubmitSuccess(json.data));

    } else {
      dispatch(actions.postSubmitFailure(json.data.message));
    }
  },
  like: async (dispatch, item) => {
    await LifeWidget.postLiked(item.id);
    dispatch({ type: types.LIKE_POST, items: item });
  },
  deletePost: async (dispatch, item) => {
    dispatch({ type: types.DELETE_POST, items: item });
    await LifeWidget.deletePost(item.id);
  },
  unsavePost: async (dispatch, item) => {
    dispatch({ type: types.UNSAVE_POST, items: item });
    await LifeWidget.postUnsave(item);
  },
  unlike: async (dispatch, item) => {
    await LifeWidget.postDisliked(item.id);
    dispatch({ type: types.UNLIKE_POST, items: item });
  },
  fetchPostsSuccess: (items) => ({
    type: types.FETCH_POSTS_SUCCESS,
    items,
    page: items.current_page,
  }),
  resortUserFeedToEnd: (items, user_id) => ({
    type: types.PUSH_USER_FEED_TO_END,
    items,
    page: items.current_page,
    user_id: user_id,
  }),
  resortUserFeedToStart: (items, user_id) => ({
       type: types.PUSH_USER_FEED_TO_START,
       items,
       page: items.current_page,
       user_id: user_id,
  }),
  fetchUserPostsSuccess: (items, user_id) => ({
    type: types.FETCH_USER_POSTS_MORE,
    items,
    page: items.current_page,
    user_id: user_id,
  }),
  fetchPostsMore: (items) => ({
    type: types.FETCH_POSTS_MORE,
    items,
    page: items.current_page,
  }),
  fetchPostsFailure: (error) => ({
    type: types.FETCH_POSTS_FAILURE,
    error,
  }),
  postSubmitSuccess: (data) => ({
    type: types.SUBMIT_POST_SUCCESS,
    items: data,
  }),
  postSubmitFailure: (error) => ({
    type: types.SUBMIT_POST_FAILURE,
    error,
  }),
  onViewableItemsChanged: (viewableItems) => {
    return { type: types.VIEWABLE_ITEMS_CHANGED, viewableItems };
  },
  setPostPrivacy: (items) => {
    return { type: types.SET_POST_PRIVACY, items };
  },
  setPostDestination: (items) => {
    return { type: types.SET_POST_DESTINATION, items };
  },
  setDefaultList: (items) => {
    return { type: types.SET_DEFAULT_LIST, items };
  },
  setDefaultFetchStatus: () => {
    return { type: types.SET_DEFAULT_FETCH_STATUS };
  },
  setTriggerReady: () => {
    return { type: types.SET_TRIGGER_READY };
  },
  addPostForm: (items) => ({
    type: types.ADD_POST_FORM,
    items,
  }),
  addCustomCard: (items) => ({
    type: types.ADD_CUSTOM_CARD,
    items,
  }),
  setCommentCounter: (items, total_comment) => ({
    type: types.SET_COMMENT_COUNT,
    items,
    total_comment
  }),
  snoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.POST_SNOOZE_FRIEND, items:friend_id });
    const json = await LifeWidget.snoozeFriend(friend_id);
  },
  unsnoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.POST_UNSNOOZE_FRIEND, items:friend_id });
    const json = await LifeWidget.unsnoozeFriend(friend_id);
  },
  unfriend: async (dispatch, friend_id) => {
    dispatch({ type: types.POST_UNFRIEND, items:friend_id });
    //const json = await LifeWidget.cancelFriendRequest(friend_id);
  },
  resetPostForm: () => {
    return { type: types.RESET_POST_FORM };
  },

};
const initialState = {
  isFetching: false,
  isProcessing:false,
  posts:{},
  nextPosts:{},
  error: null,
  lists: [],
  last_page: 1,
  totalUserFeeds: 0,
  page: 1, // this for posts in a feed or a for single user
  feedPage: 1, // this for feeds.. i.e socialFeed screen
  viewableItems: [],
  defaultPrivacy: { name: "Public", id: 1 },
  defaultPostDestination: { name: "News Feed", id: 0 },
  categories: [],
  defaultList: null,
  isPublicFetching:false,
  form:{},
  triggerReady:false,
  timeoutTrigger:false,
};
const itemChanges = (arrayObj) => {

  for (var i = 0; i < arrayObj.length; i++) {
    if(arrayObj[i]["recent_posts"]){
      arrayObj[i].posts = [arrayObj[i]["recent_posts"]];
      delete arrayObj[i].recent_posts;
    } else {
      delete arrayObj[i];
    }
  }
  arrayObj = arrayObj.filter(function (el) {
    return el != null;
  });
  return arrayObj;
};

const skipFirstPost = (arrayObj, page) => {
  if (arrayObj.length > 0 && page === 1) {
    arrayObj.splice(0, 1);
  }
  return arrayObj;
};

const deDupeDataById = function(oldData=[], newData=[]) {
    if (newData.length) {
        oldData = oldData.filter(function(oldItem) {
            let index = newData.findIndex((newItem) => newItem.id === oldItem.id);
            if (index > -1) {
                if (oldItem.posts
                    && newData[index].posts
                    && oldItem.posts[0].id == newData[index].posts[0].id) {
                    let existingPosts = oldItem.posts.slice(0);
                    existingPosts[0] = newData[index].posts[0];
                    newData[index].posts = existingPosts;
                }
                return false;
            }
            return true;
        })
        return oldData.concat(newData);
    }
    return oldData;
}
const moveFeedsToStart = function(oldData, newData) {
    if (newData && newData.length) {
        oldData = oldData.filter(function(oldItem) {
            let index = newData.findIndex((newItem) => newItem.id === oldItem.id);
            if (index > -1) {
                    if (oldItem.posts &&
                        newData[index].posts &&
                        oldItem.posts[0].id == newData[index].posts[0].id) {
                        let existingPosts = oldItem.posts.slice(0);
                        existingPosts[0] = newData[index].posts[0];
                        newData[index].posts = existingPosts;
                    }
                return false;
            }
            return true;
        })
        Array.prototype.unshift.apply(oldData, newData);
        return oldData;
    }
    return newData;
}

const moveUserToStartOfFeedList = function(state, user_id) {
    //lets duplicate the array slice is faster then [...]
    let newArray = clone(state.lists);
    // locate the user card... and only run if we have logic.
    let index = newArray.findIndex((item) => item.id === user_id);
    if (index > -1) {
        newArray.unshift(newArray.splice(index, 1)[0]);
    }
    return newArray;
}

const moveUserToEndOfFeedList = function(state, user_id) {
    //lets duplicate the array slice is faster then [...]
    let newArray = clone(state.lists);
    // locate the user card... and only run if we have logic.
    let index = newArray.findIndex((item) => item.id === user_id);
    if (index > -1) {
        newArray.push(newArray.splice(index, 1)[0]);
        //locate the timeout card and move to end  of the  array
        let timeOutIndex = newArray.findIndex((item) => item.id === 'timeout');
        if (timeOutIndex > -1) {
            newArray.push(newArray.splice(timeOutIndex, 1)[0]);
        }
    }
    return newArray;
}

export const reducer = (state = initialState, action) => {
  const { type, error, items, page, user_id, viewableItems, total_comment } = action;
  switch (type) {
    case types.FETCH_POSTS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.SET_DEFAULT_FETCH_STATUS:{
      return {
        ...state,
        isProcessing: false,
      };
    }

    case types.FETCH_USER_PUBLIC_POST_PENDING: {
      return {
        ...state,
        isPublicFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_USER_PUBLIC_POST_FAILURE: {
      return {
        ...state,
        isPublicFetching: false,
        error: error,
        message: error,
      };
    }

    case types.FETCH_POSTS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }
    case types.FETCH_POSTS_SUCCESS: {
      let cleanedData = itemChanges(items.data);
      if (!cleanedData || cleanedData.length == 0) {
          return Object.assign({}, state, {
            isFetching: false,
            error:null,
        });
    } else if (cleanedData){
          if (state.lists) {
              cleanedData = moveFeedsToStart(clone(state.lists),cleanedData)
          }
          return Object.assign({}, state, {
            isFetching: false,
            lists: cleanedData,
            last_page: items.last_page,
            totalFeeds: items.total,
            error: null,
            timeoutTrigger:false,
            feedPage: page,
          });
      }
    }
    case types.FETCH_POSTS_MORE: {
      console.log('FETCH POSTS MORE')
      return Object.assign({}, state, {
        isFetching: false,
        lists: deDupeDataById(clone(state.lists),itemChanges(items.data)),
        last_page: items.last_page,
        error: null,
        totalFeeds: items.total,
        timeoutTrigger:false,
        feedPage:page,
      });
    }

    case types.PUSH_USER_FEED_TO_END: {
        // locate the user card... and only run if we have logic.
        let index = state.lists.findIndex((item) => item.id === user_id);
        console.log('......................PUSH_USER_FEED_TO_END.................' + index);
        if (index > -1) {
            let newArray = moveUserToEndOfFeedList(state,user_id);

            //i know stupid... but we need to re-find index... just in case it got moved around.
            index = newArray.findIndex((item) => item.id === user_id);
            let filteredArr =
              page === 1
                ? (newArray[index].posts = items.data)
                : newArray[index].posts.concat(items.data);

            filteredArr = filteredArr.reduce((acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            newArray[index].posts = filteredArr;
            newArray[index].posts_count = items.total;
            return Object.assign({}, state, {
              isPostFetching: false,
              lists: newArray,
              error: null,
            });
        }
    }

    case types.PUSH_USER_FEED_TO_START: {
        // locate the user card... and only run if we have logic.
        let index = state.lists.findIndex((item) => item.id === user_id);
        console.log('......................PUSH_USER_FEED_TO_END.................' + index);
        if (index > -1) {
            let newArray = moveUserToStartOfFeedList(state,user_id);
            index = 0
            let filteredArr =
              page === 1
                ? (newArray[index].posts = items.data)
                : newArray[index].posts.concat(items.data);

            filteredArr = filteredArr.reduce((acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            newArray[index].posts = filteredArr;
            newArray[index].posts_count = items.total;
            return Object.assign({}, state, {
              isPostFetching: false,
              lists: newArray,
              error: null,
            });
        }
    }

    case types.FETCH_USER_POSTS_MORE: {
      let index = state.lists.findIndex((item) => item.id === user_id);
      const newArray = [...state.lists];

      let filteredArr =
        page === 1
          ? (newArray[index].posts = items.data)
          : newArray[index].posts.concat(items.data);

      filteredArr = filteredArr.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      newArray[index].posts = filteredArr;
      newArray[index].posts_count = items.total;
      return Object.assign({}, state, {
        isPostFetching: false,
        lists: newArray,
        error: null,
        page,
      });
    }



    case types.ADD_CUSTOM_CARD:{
      return Object.assign({}, state, {
        lists: deDupeDataById(clone(state.lists), [items]),
        timeoutTrigger:true
      });
    }

    case types.SET_TRIGGER_READY:{
      return {
        ...state,
        triggerReady:true
      }
    }
    case types.FETCH_POSTS_NORMALIZE: {
      let data = itemChanges(items.data);
      const normalizedData = normalize(data, "lists");
      return Object.assign({}, state, {
        isFetching: false,
        lists: normalizedData,
        error: null,
        page,
      });
    }
    case types.FETCH_POSTS_NORMALIZE_MORE: {
      let data = itemChanges(items.data);
      const normalizedData = normalize(data, "lists");
      return Object.assign({}, state, {
        isFetching: false,
        lists: state.lists.posts.concat(normalizedData.entities.posts),
        error: null,
        page,
      });
    }
    case types.LIKE_POST: {
      // let index = state.lists.findIndex((item) => item.id === items.user_id);
      // const newArray = [...state.lists];

      // let filteredArr = newArray[index].posts;

      // let postIndex = filteredArr.findIndex((item) => item.id === items.id);

      // filteredArr = filteredArr[postIndex];
      // filteredArr.liked = !filteredArr.liked;
      // filteredArr.dislike = false;

      // newArray[index].posts[postIndex] = filteredArr;
      // return Object.assign({}, state, {
      //   isPostFetching: false,
      //   lists: newArray,
      //   error: null,
      //   page,
      // });

      return Object.assign({}, state, {
        page,
      });
    }
    case types.UNLIKE_POST: {
      // let index = state.lists.findIndex((item) => item.id === items.user_id);
      // const newArray = [...state.lists];

      // let filteredArr = newArray[index].posts;

      // let postIndex = filteredArr.findIndex((item) => item.id === items.id);

      // filteredArr = filteredArr[postIndex];
      // filteredArr.dislike = !filteredArr.dislike;
      // filteredArr.liked = false;

      // newArray[index].posts[postIndex] = filteredArr;
      // return Object.assign({}, state, {
      //   isPostFetching: false,
      //   lists: newArray,
      //   error: null,
      //   page,
      // });
      return Object.assign({}, state, {
        page,
      });
    }
    case types.FETCH_USER_POSTS_PENDING: {
      return {
        ...state,
        isPostFetching: true,
      };
    }
    case types.SUBMIT_POST_PENDING: {
      return {
        ...state,
        isProcessing: true,
        error: null,
        message: "",
        triggerReady:false
      };
    }
    case types.SUBMIT_POST_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        triggerReady:false
      };
    }
    case types.DELETE_POST: {
      let newArray = {...state.posts};
      const newPosts = newArray[items.user_id];
      const removeArray = newPosts.filter((post) => post.id !== items.id);

      newArray[items.user_id] = removeArray;
      return {
        ...state,
        posts: newArray,
      };

    }
    case types.UNSAVE_POST:{
      let newArray = {...state.posts};
      const newPosts = newArray[items.save_id];
      const removeArray = newPosts.filter((post) => post.id !== items.post_id);

      newArray[items.save_id] = removeArray;
      return {
        ...state,
        posts: newArray,
      };
    }
    case types.SET_COMMENT_COUNT:{
      let index = state.lists.findIndex((item) => item.id === items.user_id);
      const newArray = [...state.lists];

      let filteredArr = newArray[index].posts;

      let postIndex = filteredArr.findIndex((item) => item.id === items.post_id);

      filteredArr = filteredArr[postIndex];
      filteredArr.comments_count = total_comment;

      newArray[index].posts[postIndex] = filteredArr;
      return Object.assign({}, state, {
        lists: newArray,
      });
    }
    case types.SUBMIT_POST_SUCCESS: {
      if (state.lists) {
          let index = state.lists.findIndex((item) => item.id === items.user_id);
          let newArray = [...state.lists];

          try {
          let filteredArr;
          if (index === -1) {
            newArray = [items.user, ...state.lists];
            index = 0;
            filteredArr = newArray[index].posts = [items];
          } else {
              //We move the user to first position.
              if (index > 0) {
                  let existingRecord = newArray.splice(index, 1);
                  newArray.unshift(existingRecord[0]);
                  index=0;
              }
            filteredArr = [items].concat(newArray[index].posts);
          }
          filteredArr = filteredArr.reduce((acc, current) => {
            const x = acc.find((item) => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

          newArray[index].posts = filteredArr;
          newArray[index].posts_count = 10;
      } catch(e)
     {
         console.log(e);
     }

     if(state.triggerReady){
        ScheduleLocalNotification(items);
      }

      return Object.assign([], state, {
        isPostFetching: false,
        isProcessing: false,
        lists: newArray,
        error: null,
        defaultList: null,
        triggerReady:false,
        page,
      });
  } else {
      return {...state};
  }
    }

    case types.FETCH_USER_PUBLIC_POST_SUCCESS: {
      return {
        ...state,
        isPublicFetching:false,
        posts:{
          ...state.posts,
          [user_id]:items.data
        },
        nextPosts:{
          ...state.nextPosts,
          [user_id]:items.next_page_url
        }
      }
    }

    case types.FETCH_USER_PUBLIC_POST_MORE_SUCCESS: {
      return {
        ...state,
        isPublicFetching:false,
        posts:{
          ...state.posts,
          [user_id]:[...state.posts[user_id], ...items.data]
        },
        nextPosts:{
          ...state.nextPosts,
          [user_id]:items.next_page_url
        }
      }
    }

    case types.POST_SNOOZE_FRIEND: {

      let newArray = {...state.posts};
      let newPosts = newArray[items];

      let postArry = [];

      newPosts.map((_,key)=>{
        postArry = newPosts[key];
        postArry.user.is_snoozed = true;
        newPosts[key] = postArry;
      });
      newArray[items] = newPosts;
      return {
        ...state,
        posts:newArray,
      };
    }

    case types.POST_UNSNOOZE_FRIEND: {

      let newArray = {...state.posts};
      let newPosts = newArray[items];

      let postArry = [];

      newPosts.map((_,key)=>{
        postArry = newPosts[key];
        postArry.user.is_snoozed = false;
        newPosts[key] = postArry;
      });
      newArray[items] = newPosts;
      return {
        ...state,
        posts:newArray,
      };
    }

    case types.POST_UNFRIEND: {

      let newArray = {...state.posts};
      let newPosts = newArray[items];

      let postArry = [];

      newPosts.map((_,key)=>{
        postArry = newPosts[key];
        postArry.user.is_friend = false;
        newPosts[key] = postArry;
      });
      newArray[items] = newPosts;
      return {
        ...state,
        posts:newArray,
      };
    }

    case types.VIEWABLE_ITEMS_CHANGED: {
      return { ...state, viewableItems };
    }

    case types.SET_POST_PRIVACY: {
      return { ...state, defaultPrivacy: items };
    }

    case types.SET_POST_DESTINATION: {
      return { ...state, defaultPostDestination: items };
    }

    case types.FETCH_CATEGORIES_SUCCESS: {
      return { ...state, categories: items };
    }

    case types.SET_DEFAULT_LIST: {
      return { ...state, defaultList: items };
    }

    case types.ADD_POST_FORM: {
      return { ...state, form: items };
    }

    case types.RESET_POST_FORM: {
      return { ...state, form: {} };
    }

    default: {
      return state;
    }
  }
};
