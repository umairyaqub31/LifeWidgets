import { LifeWidget } from "@common";

const types = {
  UPLOAD_PROFILE_PHOTO_PENDING: "UPLOAD_PROFILE_PHOTO_PENDING",
  UPLOAD_PROFILE_PHOTO_SUCCESS: "UPLOAD_PROFILE_PHOTO_SUCCESS",

  UPLOAD_PROFILE_BANNER_PENDING: "UPLOAD_PROFILE_BANNER_PENDING",
  UPLOAD_PROFILE_BANNER_SUCCESS: "UPLOAD_PROFILE_BANNER_SUCCESS",

  UPLOAD_INTRO_VIDEO_PENDING: "UPLOAD_INTRO_VIDEO_PENDING",
  UPLOAD_INTRO_VIDEO_SUCCESS: "UPLOAD_INTRO_VIDEO_SUCCESS",

  USER_PROFILE_SUCCESS: "USER_PROFILE_SUCCESS",
  SET_USER_PROFILE: "SET_USER_PROFILE",

  OTHER_PROFILE_PENDING: "OTHER_PROFILE_PENDING",
  OTHER_PROFILE_SUCCESS: "OTHER_PROFILE_SUCCESS",

  SEND_USER_FRIEND_REQUEST: "SEND_USER_FRIEND_REQUEST",
  CANCEL_USER_FRIEND_REQUEST: "CANCEL_USER_FRIEND_REQUEST",
  ACCEPT_USER_FRIEND_REQUEST: "ACCEPT_USER_FRIEND_REQUEST",
  FETCH_ALL_USER_MEDIA: "FETCH_ALL_USER_MEDIA",
  FETCH_ALL_USER_VIDEO: "FETCH_ALL_USER_VIDEO",
  FETCH_ALL_USER_MEDIA_PENDING: "FETCH_ALL_USER_MEDIA_PENDING",

  DELETE_MEDIA:"DELETE_MEDIA",
};

export const actions = {
  uploadProfilePhoto: async (dispatch, data) => {
    dispatch({ type: types.UPLOAD_PROFILE_PHOTO_PENDING });
    const json = await LifeWidget.uploadProfilePhoto(data);
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.UPLOAD_PROFILE_PHOTO_SUCCESS, data: json });
    }
  },

  uploadProfileBanner: async (dispatch, data) => {
    dispatch({ type: types.UPLOAD_PROFILE_BANNER_PENDING });
    const json = await LifeWidget.uploadProfileBanner(data);
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.UPLOAD_PROFILE_BANNER_SUCCESS, data: json });
    }
  },

  uploadIntroVideo: async (dispatch, data) => {
    dispatch({ type: types.UPLOAD_INTRO_VIDEO_PENDING });
    const json = await LifeWidget.uploadIntroVideo(data);
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.UPLOAD_INTRO_VIDEO_SUCCESS, data: json });
    }
  },

  uploadProfile: async (dispatch) => {
    const json = await LifeWidget.uploadProfile();
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.USER_PROFILE_SUCCESS, data: json });
    }
  },

  otherUserProfile: async (dispatch, data, user_id) => {
    dispatch({ type: types.OTHER_PROFILE_PENDING });
    const json = await LifeWidget.uploadProfile(data);
    if (json === undefined) {
    } else if (json.success) {
      dispatch({ type: types.OTHER_PROFILE_SUCCESS, data: json, user_id });
    }
  },

  userProfileUpdate: (dispatch, data) => {
    dispatch({ type: types.SET_USER_PROFILE, data });
  },

  sendRequestToServer: async (dispatch, data) => {
    const json = await LifeWidget.userProfileUpdate(data);
  },

  sendUserFriendRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.SEND_USER_FRIEND_REQUEST, user_id: friend_id });
    const json = await LifeWidget.sendFriendRequest(friend_id);
  },
  acceptUserFriendRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.ACCEPT_USER_FRIEND_REQUEST, user_id: friend_id });
    const json = await LifeWidget.acceptFriendRequest(friend_id);
  },
  cancelUserFriendRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.CANCEL_USER_FRIEND_REQUEST, user_id: friend_id });
    const json = await LifeWidget.cancelFriendRequest(friend_id);
  },
  allUserMedia: async (dispatch, per_page, page, user_id) => {
    dispatch({
      type: types.FETCH_ALL_USER_MEDIA_PENDING,
    });
    const json = await LifeWidget.allUserMedia(per_page, page, user_id);
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({
        type: types.FETCH_ALL_USER_MEDIA,
        data: json,
        page: page,
        user_id: user_id,
      });
    }
  },
  allUserVideo: async (dispatch, per_page, page, user_id) => {
    dispatch({
      type: types.FETCH_ALL_USER_MEDIA_PENDING,
    });
    const json = await LifeWidget.allUserVideo(per_page, page, user_id);
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({
        type: types.FETCH_ALL_USER_VIDEO,
        data: json,
        page: page,
        user_id: user_id,
      });
    }
  },
  deleteMedia: async (dispatch, id, user_id) => {
    dispatch({ type: types.DELETE_MEDIA, data: id, user_id:user_id });
    const json = await LifeWidget.userDeleteMedia({id:id});
  },
};

const initialState = {
  data: {},
  user: {},
  userFetching: false,
  photo_uploading: false,
  banner_uploading: false,
  video_uploading: false,
  data_uploading: false,
  meida: {},
  video: {},
  mediaFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { type, data, page, user_id } = action;
  switch (type) {
    case types.UPLOAD_PROFILE_PHOTO_PENDING: {
      return {
        ...state,
        photo_uploading: true,
      };
    }

    case types.UPLOAD_INTRO_VIDEO_PENDING: {
      return {
        ...state,
        video_uploading: true,
      };
    }

    case types.FETCH_ALL_USER_MEDIA_PENDING: {
      return {
        ...state,
        mediaFetching: true,
      };
    }

    case types.UPLOAD_PROFILE_BANNER_PENDING: {
      return {
        ...state,
        banner_uploading: true,
      };
    }

    case types.OTHER_PROFILE_PENDING: {
      return {
        ...state,
        userFetching: true,
      };
    }

    case types.UPLOAD_PROFILE_PHOTO_SUCCESS: {
      return {
        ...state,
        photo_uploading: false,
        data: {
          ...state.data,
          profile_photo: data.data.profile_photo,
        },
      };
    }

    case types.UPLOAD_PROFILE_BANNER_SUCCESS: {
      return {
        ...state,
        banner_uploading: false,
        data: {
          ...state.data,
          profile_banner: data.data,
        },
      };
    }

    case types.UPLOAD_INTRO_VIDEO_SUCCESS: {
      return {
        ...state,
        video_uploading: false,
        data: {
          ...state.data,
          intro_video: data.data,
        },
      };
    }

    case types.USER_PROFILE_SUCCESS: {
      return {
        ...state,
        data: data.data,
      };
    }

    case types.OTHER_PROFILE_SUCCESS: {
      return {
        ...state,
        userFetching: false,
        user: {
          ...state.user,
          [user_id]: data.data,
        },
      };
    }

    case types.SEND_USER_FRIEND_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          [user_id]: {
            ...state.user[user_id],
            is_friend: false,
            request: {
              is_entry: true,
              is_send_request: true,
            },
          },
        },
      };
    }

    case types.CANCEL_USER_FRIEND_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          [user_id]: {
            ...state.user[user_id],
            is_friend: false,
            request: {
              is_entry: false,
              is_send_request: false,
            },
          },
        },
      };
    }

    case types.ACCEPT_USER_FRIEND_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          [user_id]: {
            ...state.user[user_id],
            is_friend: true,
          },
        },
      };
    }

    case types.SET_USER_PROFILE: {
      return {
        ...state,
        data: {
          ...state.data,
          ...data,
        },
      };
    }

    case types.FETCH_ALL_USER_MEDIA: {
      if (page > 1) {
        return {
          ...state,
          mediaFetching: false,
          media: {
            ...state.media,
            [user_id]: {
              ...state.media[user_id],
              data: [...state.media[user_id].data, ...data.data],
            },
          },
        };
      } else {
        return {
          ...state,
          mediaFetching: false,
          media: {
            ...state.media,
            [user_id]: { data: data.data, total: data.total },
          },
        };
      }
    }

    case types.FETCH_ALL_USER_VIDEO: {
      if (page > 1) {
        return {
          ...state,
          mediaFetching: false,
          video: {
            ...state.video,
            [user_id]: {
              ...state.video[user_id],
              data: [...state.video[user_id].data, ...data.data],
            },
          },
        };
      } else {
        return {
          ...state,
          mediaFetching: false,
          video: {
            ...state.video,
            [user_id]: { data: data.data, total: data.total },
          },
        };
      }
    }

    case types.DELETE_MEDIA:{
      return {
        ...state,
        media: {
          ...state.media,
          [user_id]:{data:state.media[user_id].data.filter((media) => media.media_id !== data), total:state.media[user_id].total-1}
        },
      };
    }

    default: {
      return state;
    }
  }
};