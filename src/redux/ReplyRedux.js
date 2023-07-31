import { LifeWidget } from "@common";
import {DeviceEventEmitter} from "react-native"

const types = {
  FETCH_COMMENT_PENDING: "FETCH_COMMENT_PENDING",
  FETCH_COMMENT_SUCCESS: "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENT_MORE:"FETCH_COMMENT_MORE",
  FETCH_COMMENT_REALTIME:"FETCH_COMMENT_REALTIME",
  POST_COMMENT_PENDING: "POST_COMMENT_PENDING",
  POST_COMMENT_SUCCESS: "POST_COMMENT_SUCCESS",
  DELETE_COMMENT: "DELETE_COMMENT",
  TYPE_COMMENT: "TYPE_COMMENT",
  LOADING_FIRST_TIME: "LOADING_FIRST_TIME",
};

export const actions = {
  fetchCommentsByPostId: async (dispatch, per_page, page, data) => {
    if(typeof data.id==="undefined"){
      dispatch({ type: types.FETCH_COMMENT_PENDING });
    }
    
    const json = await LifeWidget.fetchCommentsByPostId(per_page, page, data);
    if (json === undefined) {
    } else if (!json.status) {
      if(page>1){
        dispatch({ type: types.FETCH_COMMENT_MORE, data: json });
      } else if(typeof data.id!=="undefined"){
        dispatch({ type: types.FETCH_COMMENT_REALTIME, data: json });
      } else {
        dispatch({ type: types.FETCH_COMMENT_SUCCESS, data: json });
      }
    }
  },
  postCommentByPostId: async (dispatch, data) => {
    dispatch({ type: types.POST_COMMENT_PENDING });
    const json = await LifeWidget.postCommentByPostId(data);
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.POST_COMMENT_SUCCESS, data: json });
    }
  },
  deleteCommentByPostId: async (dispatch, data) => {
    dispatch({ type: types.DELETE_COMMENT, data });
    const json = await LifeWidget.deleteComment(data);
  },
  typeComment: (data) => ({
    type: types.TYPE_COMMENT,
    data,
  }),
  loadingFirstTime: () => ({
    type: types.LOADING_FIRST_TIME
  }),

};

const initialState = {
  commentIds: [],
  commentsById: [],
  isFetching: false,
  isPosting:false,
  commentText:"",
  firstTimeLoading:true
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.FETCH_COMMENT_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.POST_COMMENT_PENDING: {
      return {
        ...state,
        isPosting: true,
      };
    }

    case types.FETCH_COMMENT_SUCCESS: {
      const comments = data;
      return {
        ...state,
        isFetching: false,
        commentIds: Object.keys(comments),
        commentsById: comments,
        firstTimeLoading:false
      };
    }

    case types.FETCH_COMMENT_REALTIME: {
        const comments = data;
        
        if(Object.keys(comments).length>0){
            DeviceEventEmitter.emit('event.comment.submitted');
            return {
                ...state,
                commentIds: [...state.commentIds, ...Object.keys(comments)],
                commentsById: {...state.commentsById, ...comments},
                firstTimeLoading:false
              };
        }
        return {
            ...state
        }
        
      }

      case types.FETCH_COMMENT_MORE: {
        const comments = data;
        
        if(Object.keys(comments).length>0){
            return {
                ...state,
                isFetching: false,
                commentIds: [...Object.keys(comments), ...state.commentIds, ],
                commentsById: {...state.commentsById, ...comments},
              };
        }
        return {
            ...state
        }
        
      }

    case types.POST_COMMENT_SUCCESS: {
      const comment = data.data;
      return {
        ...state,
        isPosting:false,
        commentText:"",
        commentIds: [...state.commentIds, (comment.id).toString()],
        commentsById: {
          ...state.commentsById,
          [comment.id]: comment,
        },
      };
    }

    case types.DELETE_COMMENT: {
      const comment = data;
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [comment]: null,
        },
      };
    }

    case types.TYPE_COMMENT:{
      return {
        ...state,
        commentText:data
      }
    }

    case types.LOADING_FIRST_TIME:{
      return {
        ...state,
        firstTimeLoading:true
      }
    }

    default: {
      return state;
    }
  }
};