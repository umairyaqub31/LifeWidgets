import { LifeWidget } from "@common";
import { DeviceEventEmitter } from "react-native";

const types = {
  FETCH_COMMENT_PENDING: "FETCH_COMMENT_PENDING",
  FETCH_COMMENT_SUCCESS: "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENT_MORE: "FETCH_COMMENT_MORE",
  FETCH_COMMENT_REALTIME: "FETCH_COMMENT_REALTIME",
  POST_COMMENT_PENDING: "POST_COMMENT_PENDING",
  POST_COMMENT_SUCCESS: "POST_COMMENT_SUCCESS",
  POST_COMMENT_FAILURE: "POST_COMMENT_FAILURE",
  DELETE_COMMENT: "DELETE_COMMENT",
  DELETE_REPLY: "DELETE_REPLY",
  TYPE_COMMENT: "TYPE_COMMENT",
  LOADING_FIRST_TIME: "LOADING_FIRST_TIME",
  REPLY_COMMENT: "REPLY_COMMENT",
  REPLY_LOAD_MORE_PENDING: "REPLY_LOAD_MORE_PENDING",
  REPLY_LOAD_MORE: "REPLY_LOAD_MORE",
  COMMENT_TOOGLE_LIKE: "COMMENT_TOOGLE_LIKE",
  REPLY_TOOGLE_LIKE: "REPLY_TOOGLE_LIKE",
  EMOJI_TOGGLE: "EMOJI_TOGGLE",
};

export const actions = {
  fetchCommentsByPostId: async (dispatch, per_page, page, data) => {
    dispatch({ type: types.FETCH_COMMENT_PENDING });

    const json = await LifeWidget.fetchCommentsByPostId(per_page, page, data);
    if (json === undefined) {
    } else if (!json.status) {
      if (page > 1) {
        dispatch({ type: types.FETCH_COMMENT_MORE, data: json });
      } else {
        dispatch({ type: types.FETCH_COMMENT_SUCCESS, data: json });
      }
    }
  },

  fetchCommentsRealTimeByPostId: async (dispatch, per_page, page, data) => {
    const json = await LifeWidget.fetchCommentsRealTimeByPostId(
      per_page,
      page,
      data
    );
    if (json === undefined) {
    } else if (!json.status) {
      dispatch({ type: types.FETCH_COMMENT_REALTIME, data: json });
    }
  },

  postCommentByPostId: async (dispatch, data) => {
    dispatch({ type: types.POST_COMMENT_PENDING });
    const json = await LifeWidget.postCommentByPostId(data);
    if (json === undefined) {
      dispatch({ type: types.POST_COMMENT_FAILURE });
    } else if (json.success) {
      dispatch({ type: types.POST_COMMENT_SUCCESS, data: json });
    } else {
      dispatch({ type: types.POST_COMMENT_FAILURE });
    }
  },
  replyLoadMoreByCommentId: async (dispatch, per_page, page, data) => {
    dispatch({
      type: types.REPLY_LOAD_MORE_PENDING,
      comment_id: data["parent_comment_id"],
    });
    const json = await LifeWidget.replyLoadMoreByCommentId(
      per_page,
      page,
      data
    );
    if (json === undefined) {
    } else if (!json.status) {
      dispatch({
        type: types.REPLY_LOAD_MORE,
        data: json,
        comment_id: data["parent_comment_id"],
      });
    }
  },
  commentToggleLike: async (dispatch, data) => {
    dispatch({ type: types.COMMENT_TOOGLE_LIKE, data });
    const json = await LifeWidget.commentLikeToggle(data.id);
  },

  replyToggleLike: async (dispatch, data) => {
    dispatch({ type: types.REPLY_TOOGLE_LIKE, data });
    const json = await LifeWidget.commentLikeToggle(data.id);
  },
  deleteCommentByPostId: async (dispatch, data) => {
    dispatch({ type: types.DELETE_COMMENT, data });
    const json = await LifeWidget.deleteComment(data);
  },
  deleteReplyByCommentId: async (dispatch, data) => {
    dispatch({ type: types.DELETE_REPLY, data });
    const json = await LifeWidget.deleteComment(data);
  },
  typeComment: (data) => ({
    type: types.TYPE_COMMENT,
    data,
  }),
  loadingFirstTime: () => ({
    type: types.LOADING_FIRST_TIME,
  }),
  replyComment: (data) => ({
    type: types.REPLY_COMMENT,
    data,
  }),
  emojiToggle: (data) => ({
    type: types.EMOJI_TOGGLE,
    data,
  }),
};

const initialState = {
  commentIds: [],
  commentReplayIds: [],
  commentsById: [],
  replaysById: [],
  isFetching: false,
  isPosting: false,
  commentText: "",
  firstTimeLoading: true,
  comment: null,
  isMoreFetching: [],
  emojiOpen: false,
};

export const reducer = (state = initialState, action) => {
  const { type, data, comment_id } = action;
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
        emojiOpen: false,
      };
    }

    case types.POST_COMMENT_FAILURE: {
      return {
        ...state,
        isPosting: false,
      };
    }

    case types.FETCH_COMMENT_SUCCESS: {
      const comments = data;
      const commentReplayIds = {};
      const replaysById = {};
      const isMoreFetching = {};

      Object.keys(comments).map((commentId) => {
        commentReplayIds[commentId] = comments[commentId].recent_replies
          ? [comments[commentId].recent_replies.id.toString()]
          : [];
        if (comments[commentId].recent_replies) {
          replaysById[comments[commentId].recent_replies.id] =
            comments[commentId].recent_replies;
        }
        isMoreFetching[commentId] = false;
      });

      return {
        ...state,
        isFetching: false,
        commentIds: Object.keys(comments),
        commentsById: comments,
        commentReplayIds: commentReplayIds,
        replaysById: replaysById,
        firstTimeLoading: false,
        isMoreFetching: isMoreFetching,
      };
    }

    case types.FETCH_COMMENT_REALTIME: {
      const comments = data;

      if (Object.keys(comments).length > 0) {
        DeviceEventEmitter.emit("event.comment.submitted");
        DeviceEventEmitter.emit("event.comment.realtime");
        return {
          ...state,
          commentIds: [...state.commentIds, ...Object.keys(comments)],
          commentsById: { ...state.commentsById, ...comments },
          firstTimeLoading: false,
        };
      }
      return {
        ...state,
      };
    }

    case types.FETCH_COMMENT_MORE: {
      const comments = data;
      const commentReplayIds = {};
      const replaysById = {};
      const isMoreFetching = {};

      Object.keys(comments).map((commentId) => {
        commentReplayIds[commentId] = comments[commentId].recent_replies
          ? [comments[commentId].recent_replies.id]
          : [];
        if (comments[commentId].recent_replies) {
          replaysById[comments[commentId].recent_replies.id] =
            comments[commentId].recent_replies;
        }
        isMoreFetching[commentId] = false;
      });

      if (Object.keys(comments).length > 0) {
        return {
          ...state,
          isFetching: false,
          commentIds: [...state.commentIds, ...Object.keys(comments)],
          commentsById: { ...state.commentsById, ...comments },
          commentReplayIds: {...commentReplayIds, ...state.commentReplayIds},
          replaysById: {...replaysById, ...state.replaysById},
          isMoreFetching:{...isMoreFetching, ...state.isMoreFetching}
        };
      }
      return {
        ...state,
      };
    }

    case types.POST_COMMENT_SUCCESS: {
      const comment = data.data;
      DeviceEventEmitter.emit("event.comment.counter", comment);
      if (comment.parent_comment_id) {
        return {
          ...state,
          isPosting: false,
          emojiOpen: false,
          commentText: "",
          comment: null,
          commentReplayIds: {
            ...state.commentReplayIds,
            [comment.parent_comment_id]: [
              ...state.commentReplayIds[comment.parent_comment_id],
              comment.id.toString(),
            ],
          },
          replaysById: {
            ...state.replaysById,
            [comment.id]: comment,
          },
        };
      }
      
      return {
        ...state,
        isPosting: false,
        emojiOpen: false,
        commentText: "",
        comment: null,
        commentIds: [...state.commentIds, comment.id.toString()],
        commentReplayIds: {
          ...state.commentReplayIds,
          [comment.id]: [],
        },
        commentsById: {
          ...state.commentsById,
          [comment.id]: comment,
        },
        isMoreFetching: {
          ...state.isMoreFetching,
          [comment.id]: false,
        },
      };
    }

    case types.REPLY_LOAD_MORE: {
      const comments = data;
      return {
        ...state,
        isMoreFetching: {
          ...state.isMoreFetching,
          [comment_id]: false,
        },
        commentReplayIds: {
          ...state.commentReplayIds,
          [comment_id]: [
            ...state.commentReplayIds[comment_id],
            ...Object.keys(comments),
          ],
        },
        replaysById: { ...state.replaysById, ...comments },
      };
    }

    case types.DELETE_COMMENT: {
      const comment = data;
      DeviceEventEmitter.emit("event.comment.delete");
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [comment]: null,
        },
      };
    }

    case types.DELETE_REPLY: {
      const comment = data;
      return {
        ...state,
        replaysById: {
          ...state.replaysById,
          [comment]: null,
        },
      };
    }

    case types.COMMENT_TOOGLE_LIKE: {
      const comment = data;
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [comment.id]: {
            ...comment,
            isLiked: !comment.isLiked,
          },
        },
      };
    }

    case types.REPLY_TOOGLE_LIKE: {
      const comment = data;
      return {
        ...state,
        replaysById: {
          ...state.replaysById,
          [comment.id]: {
            ...comment,
            isLiked: !comment.isLiked,
          },
        },
      };
    }

    case types.TYPE_COMMENT: {
      return {
        ...state,
        commentText: data,
      };
    }

    case types.LOADING_FIRST_TIME: {
      return {
        ...state,
        firstTimeLoading: true,
      };
    }

    case types.REPLY_COMMENT: {
      return {
        ...state,
        comment: data,
      };
    }

    case types.REPLY_LOAD_MORE_PENDING: {
      return {
        ...state,
        isMoreFetching: {
          ...state.isMoreFetching,
          [comment_id]: true,
        },
      };
    }

    case types.EMOJI_TOGGLE: {
      return {
        ...state,
        emojiOpen: data,
      };
    }

    default: {
      return state;
    }
  }
};