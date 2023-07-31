import { DeviceEventEmitter } from "react-native";
import axios from "axios";
import { coolDownAsync } from "expo-web-browser";
export default class LifeWidget {
  _api = null;

  static init = ({ url }) => {
    try {
      this._api = axios.create({
        baseURL: url,
        timeout: 10000,
      });
    } catch (error) {
      return error;
    }
  };

  static setClientToken = async (token) => {
    this._api.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  static register = async (data) => {
    try {
      const response = await this._api.post("/register", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static login = async (data) => {
    try {
      const response = await this._api.post("/login", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static forgetPasswordRequest = async (data) => {
    try {
      const response = await this._api.post("/forgot-password", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static verifyPasswordRequest = async (data) => {
    try {
      const response = await this._api.post("/verify-forgot-password", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static changePasswordRequest = async (data) => {
    try {
      const response = await this._api.post("/change-password", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static posts = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/posts", {
        params: { per_page: per_page, page: page, sort: "desc" },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static userPublicFeed = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/userPublicFeed", {
        params: { per_page: per_page, page: page, sort: "desc" },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deletePost = async (id) => {
    try {
      const response = await this._api.delete("/v1/post/" + id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //api to get token
  static getToken = async (id) => {
    try {
      const response = await this._api.get("/v1/users/token", {
        params: { cube_id: id },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  //FOR GETTING LIST OF FRIEND
  static getFriend = async () => {
    try {
      const response = await this._api.get("/v1/my-friends");
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //For Searching the user
  static searchUser = async (data) => {
    try {
      const response = await this._api.get("/v1/users/search", {
        params: { search: data },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //For Getting All Users List
  static usersList = async (data) => {
    try {
      const response = await this._api.get("/v1/user_list_app");
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //For Getting All firnds of the user Users List
  static friendList = async (id) => {
    try {
      const response = await this._api.get("/v1/user_friend_list", {
        params: { user_id: id },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //For create connectycubeId of the user If Not exist
  static createConnectycubeId = async (data) => {
    try {
      const response = await this._api.post("/v1/users_connect_cube", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submit = async (data) => {
    try {
      const response = await this._api.post("/v1/posts", data, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength !== null) {
            this.progressData = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            DeviceEventEmitter.emit("event.progress", this.progressData);
          }
        },
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static share = async (data) => {
    try {
      const response = await this._api.post("/v1/share", data, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength !== null) {
            this.progressData = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            DeviceEventEmitter.emit("event.progress", this.progressData);
          }
        },
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static morePosts = async (per_page, page, user_id, save_id, group_id) => {
    try {
      const response = await this._api.get("/v1/morePosts", {
        params: {
          per_page: per_page,
          page: page,
          user_id: user_id,
          save_id: save_id,
          group_id: group_id,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadProfilePhoto = async (data) => {
    try {
      const response = await this._api.post("/v1/user-profile-photo", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadProfileBanner = async (data) => {
    try {
      const response = await this._api.post("/v1/user-profile-banner", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadIntroVideo = async (data) => {
    try {
      const response = await this._api.post("/v1/user-intro-video", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadProfile = async (queryArray = []) => {
    let params = {};
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get("/v1/user-profile", {
        params: params,
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static userProfileUpdate = async (data) => {
    try {
      const response = await this._api.post("/v1/user-profile-update", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static postLiked = async (post_id) => {
    try {
      const response = await this._api.post(`/v1/post/${post_id}/like`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static postDisliked = async (post_id) => {
    try {
      const response = await this._api.post(`/v1/post/${post_id}/dislike`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static addReaction = async (post_id, reaction_id) => {
    try {
      const response = await this._api.post(
        `/v1/post/${post_id}/add-reaction/${reaction_id}`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static removeReaction = async (post_id) => {
    try {
      const response = await this._api.post(
        `/v1/post/${post_id}/remove-reaction`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getLikeUnlikeUsers = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/users-post-like-unlike`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getLikeUsers = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/users-post-like`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getDislikeUsers = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/users-post-dislike`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getPost = async (id) => {
    try {
      const response = await this._api.get(`/v1/post`, { params: { id: id } });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /****************** People ******************/

  static peoples = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get("/v1/people", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static sendFriendRequest = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/friend/${friend_id}/request`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static acceptFriendRequest = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/accept-request`
      );

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static cancelFriendRequest = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/reject-request`
      );

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static addFriendToType = async (friend_id, data) => {
    try {
      const response = await this._api.post(
        `/v1/friend/${friend_id}/add-friend-type`,
        data
      );

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static followFriend = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/friend/${friend_id}/follow`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static unfollowFriend = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/friend/${friend_id}/unfollow`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static snoozeFriend = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/friend/${friend_id}/snooze`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static unsnoozeFriend = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/friend/${friend_id}/unsnooze`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************ Bars *************************/

  static fetchBarTypes = async () => {
    try {
      const response = await this._api.get("/v1/bar-types");

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCategories = async () => {
    try {
      const response = await this._api.get("/v1/categories");

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBarServices = async () => {
    try {
      const response = await this._api.get("/v1/bar-services");

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBars = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }
    try {
      const response = await this._api.get("/v1/bars", { params: params });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static submitBar = async (data) => {
    try {
      const response = await this._api.post("/v1/bars", data, {
        // onUploadProgress: (progressEvent) => {
        //   const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        //   if (totalLength !== null) {
        //     this.progressData = Math.round( (progressEvent.loaded * 100) / totalLength );
        //     DeviceEventEmitter.emit('event.bar.progress', this.progressData);
        //   }
        // }
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static barCheckIn = async (bar_id) => {
    try {
      const response = await this._api.post(`/v1/bar/${bar_id}/check-in`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static barCheckOut = async (bar_id) => {
    try {
      const response = await this._api.post(`/v1/bar/${bar_id}/check-out`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static addBarFavourite = async (bar_id) => {
    try {
      const response = await this._api.post(`/v1/bar/${bar_id}/favourites`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static removeBarFavourite = async (bar_id) => {
    try {
      const response = await this._api.delete(`/v1/bar/${bar_id}/favourites`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static sendBarClaim = async (data) => {
    try {
      const response = await this._api.post(`/v1/request-bar-claim`, data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deleteCompany = async (id) => {
    try {
      const response = await this._api.delete(`/v1/bars/${id}`);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************** Events ********************/

  static fetchEvents = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get("/v1/event", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  //api to save events
  static submitEvents = async (data) => {
    try {
      const response = await this._api.post("/v1/event", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitResponse = async (data) => {
    try {
      const response = await this._api.post("/v1/event/interest", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //api to get Save events userbased
  static getEvents = async (data) => {
    try {
      const response = await this._api.get("/v1/calendar_event_user", {
        params: { user_id: data },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  //api to update events
  static updateEvents = async (data) => {
    try {
      const response = await this._api.post("/v1/calendar_date_update", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //api to check calendar Date
  static checkcalendardate = async (data) => {
    try {
      const response = await this._api.get("/v1/calendar_event_with_date", {
        params: data,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************** Media ********************/
  static allUserMedia = async (per_page, page, user_id) => {
    let params = { per_page: per_page, page: page, user_id: user_id };
    try {
      const response = await this._api.get("/v1/all-user-media", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static allUserVideo = async (per_page, page, user_id) => {
    let params = { per_page: per_page, page: page, user_id: user_id };
    try {
      const response = await this._api.get("/v1/all-user-video", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /***************** Post Comment ***************************/
  static fetchCommentsByPostId = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }
    try {
      const response = await this._api.get("/v1/comments", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static replyLoadMoreByCommentId = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }
    try {
      const response = await this._api.get("/v1/replys", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCommentsRealTimeByPostId = async (
    per_page,
    page,
    queryArray = []
  ) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }
    try {
      const response = await this._api.get("/v1/real-time", { params: params });

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static postCommentByPostId = async (data) => {
    try {
      const response = await this._api.post("/v1/comments", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static commentLikeToggle = async (comment_id) => {
    try {
      const response = await this._api.post(
        `/v1/commentLikeToggle/${comment_id}`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deleteComment = async (id) => {
    try {
      const response = await this._api.delete("/v1/comments/" + id);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************** Group ************************/

  static groups = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get("/v1/groups", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static searchGroups = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get("/v1/group-search", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static submitGroup = async (data) => {
    try {
      const response = await this._api.post("/v1/groups", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadGroupCoverPhoto = async (group_id, data) => {
    try {
      const response = await this._api.post(
        `/v1/group/${group_id}/cover-photo`,
        data
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static groupInvitesRequest = async (per_page, page) => {
    try {
      const response = await this._api.get(`/v1/group/invites-request`, {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static acceptGroupRequest = async (group_id, user_id) => {
    try {
      const response = await this._api.post(
        `/v1/group/${group_id}/member/${user_id}/accept`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static joinGroupInvite = async (group_id) => {
    try {
      const response = await this._api.post(`/v1/group/${group_id}/join`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static sendGroupInvite = async (group_id, friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/group/${group_id}/friend/${friend_id}/invite`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static leaveGroup = async (group_id) => {
    try {
      const response = await this._api.post(`/v1/group/${group_id}/leave`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deleteGroup = async (group_id) => {
    try {
      const response = await this._api.delete(`/v1/groups/${group_id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static removeFromGroup = async (group_id, friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/group/${group_id}/remove/${friend_id}`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static followGroupToggle = async (group_id) => {
    try {
      const response = await this._api.post(
        `/v1/group/${group_id}/follow-toggle`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static groupMembers = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/group-members`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************** Reports *************/

  static submitReports = async (data) => {
    try {
      const response = await this._api.post("/v1/reports", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************** Feedback *************/

  static submitFeedback = async (data) => {
    try {
      const response = await this._api.post("/v1/feedback", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /******************** Flirt **********************/

  static flirts = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/flirts", {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static activeFlirts = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/active-flirts", {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static pendingFlirts = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/pending-flirts", {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static pendingFlirtRequest = async (per_page, page) => {
    try {
      const response = await this._api.get("/v1/pending-request-flirts", {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static submitFlirt = async (data) => {
    try {
      const response = await this._api.post("/v1/flirt-settings", data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static flirtSettings = async () => {
    try {
      const response = await this._api.get("/v1/flirt-settings");

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static sendFlirtRequest = async (friend_id) => {
    try {
      const response = await this._api.post(`/v1/flirt/${friend_id}/request`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static acceptFlirtRequest = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/accept-flirt-request`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static cancelFlirtRequest = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/reject-flirt-request`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static removeActiveFlirt = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/remove-from-flirt`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static toggleOpenToMeet = async (friend_id) => {
    try {
      const response = await this._api.post(
        `/v1/user/${friend_id}/toggle-open-meet`
      );

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static updateCurrentLocation = async (data) => {
    try {
      const response = await this._api.post(
        "/v1/update-current-location",
        data
      );

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static saveCollection = async (data) => {
    try {
      const response = await this._api.post(`/v1/saves`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static collections = async (per_page, page) => {
    try {
      const response = await this._api.get(`/v1/saves`, {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deleteCollection = async (id) => {
    try {
      const response = await this._api.delete(`/v1/saves/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static postSave = async (data) => {
    try {
      const response = await this._api.post(`/v1/post-save`, data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static postUnsave = async (data) => {
    try {
      const response = await this._api.post(`/v1/post-unsave`, data);

      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /****************************Business*******************/

  static companyTypes = async () => {
    try {
      const response = await this._api.get(`/v1/business-types`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************* Settings ****************************/
  static submitCelebrityRequest = async (data) => {
    try {
      const response = await this._api.post(
        "/v1/submit-celebrity-request",
        data
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static tutorialVideos = async (per_page, page) => {
    try {
      const response = await this._api.get("/how-to-use", {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /************************* Leaderboard ****************************/
  static leaderboards = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).map((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._api.get("/v1/leaderborads", { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static deleteAccount = async (data) => {
    try {
      const response = await this._api.post(`/v1/delete-account`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static accessYourInformation = async (data) => {
    try {
      const response = await this._api.post(`/v1/access-information`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static fetchAccessYourInformation = async (per_page, page) => {
    try {
      const response = await this._api.get(`/v1/access-information`, {
        params: { per_page: per_page, page: page },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  /******************** Contacts ************************/
  static syncContacts = async (data) => {
    try {
      const response = await this._api.post(`/v1/contacts`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getSyncContacts = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/contacts`, { params: params });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static shareMessage = async (data) => {
    try {
      const response = await this._api.post(`/v1/share-messages`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getUserDeviceTokenByCubeIds = async (data) => {
    try {
      const response = await this._api.post(
        `/v1/device-token-by-cube-ids`,
        data
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static getReactionUsers = async (per_page, page, queryArray = []) => {
    let params = { per_page: per_page, page: page };
    if (Object.keys(queryArray).length > 0) {
      Object.keys(queryArray).map((value) => {
        if (queryArray[value]) {
          params[value] = queryArray[value];
        }
      });
    }

    try {
      const response = await this._api.get(`/v1/reactions`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static uploadMetaData = async (data) => {
    try {
      const response = await this._api.post("/v1/upload-user-meta", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static userDeleteMedia = async (data) => {
    try {
      const response = await this._api.post("/v1/user-delete-media", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

}
