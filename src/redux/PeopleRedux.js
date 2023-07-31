import { LifeWidget } from "@common";

const types = {
  FETCH_PEOPLES_PENDING: "FETCH_PEOPLES_PENDING",
  FETCH_PEOPLES_SUCCESS: "FETCH_PEOPLES_SUCCESS",
  FETCH_PEOPLES_FAILURE: "FETCH_PEOPLES_FAILURE",
  FETCH_FRIENDS_PENDING: "FETCH_FRIENDS_PENDING",
  FETCH_FRIENDS_SUCCESS: "FETCH_FRIENDS_SUCCESS",
  FETCH_FRIENDS_FAILURE: "FETCH_FRIENDS_FAILURE",
  FETCH_FRIENDS_MORE: "FETCH_FRIENDS_MORE",
  FETCH_PEOPLES_MORE: "FETCH_PEOPLES_MORE",
  SET_PEOPLE_SEARCH: "SET_PEOPLE_SEARCH",
  SEND_FRIEND_REQUEST: "SEND_FRIEND_REQUEST",
  ACCEPT_FRIEND_REQUEST: "ACCEPT_FRIEND_REQUEST",
  CANCEL_FRIEND_REQUEST: "CANCEL_FRIEND_REQUEST",
  REJECT_FRIEND_REQUEST: "REJECT_FRIEND_REQUEST",
  ADD_FRIEND_TO_TYPE: "ADD_FRIEND_TO_TYPE",
  FOLLOW_FRIEND: "FOLLOW_FRIEND",
  UNFOLLOW_FRIEND: "UNFOLLOW_FRIEND",
  FETCH_PEOPLE_AROUND_SUCCESS: "FETCH_PEOPLE_AROUND_SUCCESS",
  FETCH_PEOPLE_AROUND_MORE: "FETCH_PEOPLE_AROUND_MORE",
  SEND_AROUND_FRIEND_REQUEST: "SEND_AROUND_FRIEND_REQUEST",
  CANCEL_AROUND_FRIEND_REQUEST: "CANCEL_AROUND_FRIEND_REQUEST",
  FETCH_RELATIONSHIP_USER_PENDING: "FETCH_RELATIONSHIP_USER_PENDING",
  FETCH_RELATIONSHIP_USER_SUCCESS: "FETCH_RELATIONSHIP_USER_SUCCESS",

  REMOVE_FROM_GROUP: "REMOVE_FROM_GROUP",

  FETCH_MEMBER_PENDING: "FETCH_MEMBER_PENDING",
  FETCH_MEMBER_SUCCESS: "FETCH_MEMBER_SUCCESS",
  FETCH_MEMBER_FAILURE: "FETCH_MEMBER_FAILURE",
  FETCH_MEMBER_MORE: "FETCH_MEMBER_MORE",

  SEND_GROUP_INVITE: "SEND_GROUP_INVITE",

  FETCH_TOP_LEADERBOARD: "FETCH_TOP_LEADERBOARD",

  SNOOZE_FRIEND: "SNOOZE_FRIEND",
  UNSNOOZE_FRIEND: "UNSNOOZE_FRIEND",

  FETCH_CONTACTS_PENDING: "FETCH_CONTACTS_PENDING",
  FETCH_CONTACTS_SUCCESS: "FETCH_CONTACTS_SUCCESS",
  FETCH_CONTACTS_FAILURE: "FETCH_CONTACTS_FAILURE",
  FETCH_CONTACTS_MORE: "FETCH_CONTACTS_MORE",
  
  FETCH_REACTION_PENDING: "FETCH_REACTION_PENDING",
  FETCH_REACTION_USER: "FETCH_REACTION_USER",
  FETCH_REACTION_USER_MORE: "FETCH_REACTION_USER_MORE",

  FETCH_SUGGESTION_PENDING: "FETCH_SUGGESTION_PENDING",
  FETCH_SUGGESTION_SUCCESS: "FETCH_SUGGESTION_SUCCESS",
  FETCH_SUGGESTION_FAILURE: "FETCH_SUGGESTION_FAILURE",
  FETCH_SUGGESTION_MORE: "FETCH_SUGGESTION_MORE",
};

export const actions = {
  fetchPeoples: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_PEOPLES_PENDING });
    const json = await LifeWidget.peoples(per_page, page, params);
    if (json === undefined) {
      dispatch(actions.fetchPeoplesFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchPeoplesFailure(json.data.message));
    } else {
      if (page > 1) {
        dispatch(actions.fetchPeoplesMore(json));
      } else {
        dispatch(actions.fetchPeoplesSuccess(json));
      }
    }
  },
  fetchPeopleAround: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_PEOPLES_PENDING });
    const json = await LifeWidget.peoples(per_page, page, params);
    if (json === undefined) {
      dispatch(actions.fetchPeoplesFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchPeoplesFailure(json.data.message));
    } else {
      if (page > 1) {
        dispatch(actions.fetchPeopleAroundMore(json));
      } else {
        dispatch(actions.fetchPeopleAroundSuccess(json));
      }
    }
  },
  fetchFriends: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_FRIENDS_PENDING });
    const json = await LifeWidget.peoples(per_page, page, params);
    if (json === undefined) {
      dispatch(actions.fetchFriendsFailure("Can't get data from server"));
    } else if (json.status) {
      dispatch(actions.fetchFriendsFailure(json.data.message));
    } else {
      if (page > 1) {
        dispatch(actions.fetchFriendsMore(json, params));
      } else {
        dispatch(actions.fetchFriendsSuccess(json, params));
      }
    }
  },
  fetchRelationshipUsers: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_RELATIONSHIP_USER_PENDING });
    const json = await LifeWidget.peoples(per_page, page, params);
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({
        type: types.FETCH_RELATIONSHIP_USER_SUCCESS,
        items: json,
        page: page,
      });
    }
  },
  sendFriendRequest: async (dispatch, friend_id, around = false) => {
    if (around) {
      dispatch({ type: types.SEND_AROUND_FRIEND_REQUEST, friend_id });
    } else {
      dispatch({ type: types.SEND_FRIEND_REQUEST, friend_id });
    }

    const json = await LifeWidget.sendFriendRequest(friend_id);
  },
  acceptFriendRequest: async (dispatch, friend_id) => {
    dispatch({ type: types.ACCEPT_FRIEND_REQUEST, friend_id });
    const json = await LifeWidget.acceptFriendRequest(friend_id);
  },
  cancelFriendRequest: async (dispatch, friend_id, around = false) => {
    if (around) {
      dispatch({ type: types.CANCEL_AROUND_FRIEND_REQUEST, friend_id });
    } else {
      dispatch({ type: types.CANCEL_FRIEND_REQUEST, friend_id });
    }

    const json = await LifeWidget.cancelFriendRequest(friend_id);
  },

  fetchMembers: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_MEMBER_PENDING });
    const json = await LifeWidget.groupMembers(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_MEMBER_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({
        type: types.FETCH_MEMBER_FAILURE,
        message: json.data.message,
      });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_MEMBER_MORE, page: page, items: json });
      } else {
        dispatch({ type: types.FETCH_MEMBER_SUCCESS, page: page, items: json });
      }
    }
  },

  fetchContacts: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_CONTACTS_PENDING });
    const json = await LifeWidget.getSyncContacts(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_CONTACTS_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({
        type: types.FETCH_CONTACTS_FAILURE,
        message: json.data.message,
      });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_CONTACTS_MORE, page: page, items: json });
      } else {
        dispatch({
          type: types.FETCH_CONTACTS_SUCCESS,
          page: page,
          items: json,
        });
      }
    }
  },

  fetchReactionUsers: async (dispatch, per_page, page, params = [], key) => {
    dispatch({ type: types.FETCH_REACTION_PENDING, items: params, key: key });
    const json = await LifeWidget.getReactionUsers(per_page, page, params);
    if (json === undefined) {
    } else if (json.status) {
    } else {
      if (page > 1) {
        dispatch({
          type: types.FETCH_REACTION_USER_MORE,
          items: { data: json, param: params },
          key: key,
        });
      } else {
        dispatch({
          type: types.FETCH_REACTION_USER,
          items: { data: json, param: params },
          key: key,
        });
      }
    }
  },

  fetchSuggestions: async (dispatch, per_page, page, params = []) => {
    dispatch({ type: types.FETCH_MEMBER_PENDING });
    const json = await LifeWidget.peoples(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_SUGGESTION_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({
        type: types.FETCH_SUGGESTION_FAILURE,
        message: json.data.message,
      });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_SUGGESTION_MORE, page: page, items: json });
      } else {
        dispatch({ type: types.FETCH_SUGGESTION_SUCCESS, page: page, items: json });
      }
    }
  },

  fetchLeaderboards: async (dispatch, data) => {
    const json = await LifeWidget.leaderboards(data);
    if (json === undefined) {
    } else if (json.status) {
    } else {
      dispatch({
        type: types.FETCH_TOP_LEADERBOARD,
        items: { data: json, code: data.code },
      });
    }
  },

  sendGroupInvite: async (dispatch, group_id, friend_id) => {
    dispatch({ type: types.SEND_GROUP_INVITE, friend_id });
    const json = await LifeWidget.sendGroupInvite(group_id, friend_id);
  },

  removeFromGroup: async (dispatch, group_id, friend_id) => {
    dispatch({ type: types.REMOVE_FROM_GROUP, friend_id });
    const json = await LifeWidget.removeFromGroup(group_id, friend_id);
  },

  followFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.FOLLOW_FRIEND, friend_id });
    const json = await LifeWidget.followFriend(friend_id);
  },
  unfollowFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.UNFOLLOW_FRIEND, friend_id });
    const json = await LifeWidget.unfollowFriend(friend_id);
  },

  snoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.SNOOZE_FRIEND, friend_id });
    const json = await LifeWidget.snoozeFriend(friend_id);
  },
  unsnoozeFriend: async (dispatch, friend_id) => {
    dispatch({ type: types.UNSNOOZE_FRIEND, friend_id });
    const json = await LifeWidget.unsnoozeFriend(friend_id);
  },

  addFriendToType: async (dispatch, friend_id, data) => {
    dispatch({
      type: types.ADD_FRIEND_TO_TYPE,
      friend_id,
      items: data.type_ids,
    });
    const json = await LifeWidget.addFriendToType(friend_id, data);
  },
  fetchPeoplesFailure: (error) => ({
    type: types.FETCH_PEOPLES_FAILURE,
    error,
  }),
  fetchPeoplesSuccess: (items) => ({
    type: types.FETCH_PEOPLES_SUCCESS,
    items,
    page: items.current_page,
  }),
  fetchPeoplesMore: (items) => ({
    type: types.FETCH_PEOPLES_MORE,
    items,
    page: items.current_page,
  }),

  fetchPeopleAroundSuccess: (items) => ({
    type: types.FETCH_PEOPLE_AROUND_SUCCESS,
    items,
    page: items.current_page,
  }),
  fetchPeopleAroundMore: (items) => ({
    type: types.FETCH_PEOPLE_AROUND_MORE,
    items,
    page: items.current_page,
  }),

  fetchFriendsFailure: (error) => ({
    type: types.FETCH_FRIENDS_FAILURE,
    error,
  }),
  fetchFriendsSuccess: (items, params) => ({
    type: types.FETCH_FRIENDS_SUCCESS,
    items,
    page: items.current_page,
    params,
  }),
  fetchFriendsMore: (items, params) => ({
    type: types.FETCH_FRIENDS_MORE,
    items,
    page: items.current_page,
    params,
  }),

  setPeopleSearch: (search) => ({
    type: types.SET_PEOPLE_SEARCH,
    search,
  }),
};

const initialState = {
  isFetching: false,
  isFriendFetching: false,
  isRelationFetching: false,
  error: null,
  items: [],
  page: 1,
  search: "",
  total: 0,
  friends: [],
  families: [],
  businesses: [],
  workers: [],
  totalFriends: 0,
  totalFamilies: 0,
  totalBusinesses: 0,
  totalWorkers: 0,
  peopleAround: [],
  peopleAroundTotal: 0,
  relationshipUsers: [],
  totalRelationship: 0,
  totalCustomers: 0,
  totalFollowers: 0,
  customers: [],
  followers: [],
  members: [],
  totalMember: 0,
  isMemberFetching: false,
  leaderboards: {},
  contacts: [],
  totalContact: 0,
  isContactFetching: false,
  reactions: {"all":{}, "100":{}, "love":{}, "haha":{}, "wow":{}, "sad":{}, "sarcasm":{}, "angry":{}},
  reactionsExtra: {},
  suggestions: [],
  totalSuggestion: 0,
  isSuggestionFetching:false
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page, search, friend_id, params, key } = action;
  switch (type) {
    case types.FETCH_PEOPLES_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_PEOPLES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: error,
        message: "",
      };
    }

    case types.FETCH_PEOPLES_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        items: items.data,
        error: null,
        page,
        total: items.total,
      });
    }

    case types.FETCH_PEOPLES_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(items.data),
        error: null,
        page,
        total: items.total,
      });
    }

    case types.FETCH_PEOPLE_AROUND_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        peopleAround: items.data,
        error: null,
        page,
        peopleAroundTotal: items.total,
      });
    }

    case types.FETCH_PEOPLE_AROUND_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        peopleAround: state.peopleAround.concat(items.data),
        error: null,
        page,
        peopleAroundTotal: items.total,
      });
    }

    case types.FETCH_FRIENDS_PENDING: {
      return {
        ...state,
        isFriendFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_FRIENDS_FAILURE: {
      return {
        ...state,
        isFriendFetching: false,
        error: error,
        message: "",
      };
    }

    case types.FETCH_RELATIONSHIP_USER_PENDING: {
      return {
        ...state,
        isRelationFetching: false,
      };
    }

    case types.FETCH_FRIENDS_SUCCESS: {
      let multiArray = { friends: items.data, totalFriends: items.total };
      if (params["c"] === 1) {
        multiArray = { families: items.data, totalFamilies: items.total };
      } else if (params["c"] === 2) {
        multiArray = { businesses: items.data, totalBusinesses: items.total };
      } else if (params["c"] === 3) {
        multiArray = { workers: items.data, totalWorkers: items.total };
      } else if (params["c"] === 4) {
        multiArray = { customers: items.data, totalCustomers: items.total };
      } else if (params["c"] === 5) {
        multiArray = { followers: items.data, totalFollowers: items.total };
      }

      return Object.assign({}, state, {
        isFriendFetching: false,
        ...multiArray,
        error: null,
        page,
      });
    }

    case types.FETCH_FRIENDS_MORE: {
      let multiArray = {
        friends: state.friends.concat(items.data),
        totalFriends: items.total,
      };
      if (params["c"] === 1) {
        multiArray = {
          families: state.families.concat(items.data),
          totalFamilies: items.total,
        };
      } else if (params["c"] === 2) {
        multiArray = {
          businesses: state.businesses.concat(items.data),
          totalBusinesses: items.total,
        };
      } else if (params["c"] === 3) {
        multiArray = {
          workers: state.workers.concat(items.data),
          totalWorkers: items.total,
        };
      } else if (params["c"] === 4) {
        multiArray = {
          customers: state.customers.concat(items.data),
          totalCustomers: items.total,
        };
      } else if (params["c"] === 5) {
        multiArray = {
          followers: state.followers.concat(items.data),
          totalFollowers: items.total,
        };
      }
      return Object.assign({}, state, {
        isFriendFetching: false,
        ...multiArray,
        error: null,
        page,
      });
    }

    case types.SEND_FRIEND_REQUEST: {
      let index = state.items.findIndex((item) => item.id === friend_id);
      let indexMember = state.members.findIndex(
        (item) => item.id === friend_id
      );
      let indexContact = state.contacts.findIndex(
        (item) => item.user && item.user.id === friend_id
      );
      let indexSuggestion = state.suggestions.findIndex(
        (item) => item && item.id === friend_id
      );
      const newArray = [...state.items];
      const newMember = [...state.members];
      const newContacts = [...state.contacts];
      const newSuggestions = [...state.suggestions];
      if (index > -1) {
        newArray[index].request.is_entry = true;
        newArray[index].request.is_send_request = true;
      }
      if (indexMember > -1) {
        newMember[indexMember].request.is_entry = true;
        newMember[indexMember].request.is_send_request = true;
      }
      if (indexContact > -1) {
        newContacts[indexContact].user.request.is_entry = true;
        newContacts[indexContact].user.request.is_send_request = true;
      }
      if (indexSuggestion > -1) {
        newSuggestions[indexSuggestion].request.is_entry = true;
        newSuggestions[indexSuggestion].request.is_send_request = true;
      }

      return Object.assign({}, state, {
        items: newArray,
        members: newMember,
        contacts: newContacts,
        suggestions:newSuggestions,
      });
    }

    case types.SEND_GROUP_INVITE: {
      let index = state.friends.findIndex((item) => item.id === friend_id);
      const newArray = [...state.friends];
      newArray[index].group_invited = true;
      return Object.assign({}, state, {
        friends: newArray,
      });
    }

    case types.SEND_AROUND_FRIEND_REQUEST: {
      let index = state.peopleAround.findIndex((item) => item.id === friend_id);
      const newArray = [...state.peopleAround];
      newArray[index].request.is_entry = true;
      newArray[index].request.is_send_request = true;
      return Object.assign({}, state, {
        peopleAround: newArray,
      });
    }

    case types.CANCEL_AROUND_FRIEND_REQUEST: {
      let index = state.peopleAround.findIndex((item) => item.id === friend_id);
      const newArray = [...state.peopleAround];
      newArray[index].request.is_friend = false;
      newArray[index].request.is_entry = false;
      newArray[index].request.is_send_request = false;
      return Object.assign({}, state, {
        peopleAround: newArray,
      });
    }

    case types.ACCEPT_FRIEND_REQUEST: {
      let index = state.items.findIndex((item) => item.id === friend_id);
      let indexMember = state.members.findIndex(
        (item) => item.id === friend_id
      );
      let indexContact = state.contacts.findIndex(
        (item) => item.user && item.user.id === friend_id
      );
      const newArray = [...state.items];
      const newMember = [...state.members];
      const newContacts = [...state.contacts];
      if (index > -1) {
        newArray[index].is_friend = true;
      }
      if (indexMember > -1) {
        newMember[indexMember].is_friend = true;
      }
      if (indexContact > -1) {
        newContacts[indexContact].user.is_friend = true;
      }

      return Object.assign({}, state, {
        items: newArray,
        members: newMember,
        contacts: newContacts,
      });
    }

    case types.FETCH_RELATIONSHIP_USER_SUCCESS: {
      if (page > 1) {
        return {
          ...state,
          relationshipUsers: relationshipUsers.concat(items.data),
        };
      }

      return {
        ...state,
        relationshipUsers: items.data,
        totalRelationship: items.total,
      };
    }

    case types.CANCEL_FRIEND_REQUEST: {
      let multiArray = [],
        index = -1;
      index = state.items.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["items"] = [...state.items];
        multiArray["items"][index].is_friend = false;
        multiArray["items"][index].request.is_entry = false;
        multiArray["items"][index].request.is_send_request = false;
      }

      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].is_friend = false;
        multiArray["friends"][index].request.is_entry = false;
        multiArray["friends"][index].request.is_send_request = false;
        multiArray["totalFriends"] = state.totalFriends - 1;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].is_friend = false;
        multiArray["families"][index].request.is_entry = false;
        multiArray["families"][index].request.is_send_request = false;
        multiArray["totalFamilies"] = state.totalFamilies - 1;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].is_friend = false;
        multiArray["businesses"][index].request.is_entry = false;
        multiArray["businesses"][index].request.is_send_request = false;
        multiArray["totalBusinesses"] = state.totalBusinesses - 1;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].is_friend = false;
        multiArray["workers"][index].request.is_entry = false;
        multiArray["workers"][index].request.is_send_request = false;
        multiArray["totalWorkers"] = state.totalWorkers - 1;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].is_friend = false;
        multiArray["customers"][index].request.is_entry = false;
        multiArray["customers"][index].request.is_send_request = false;
        multiArray["totalCustomers"] = state.totalCustomers - 1;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].is_friend = false;
        multiArray["followers"][index].request.is_entry = false;
        multiArray["followers"][index].request.is_send_request = false;
        multiArray["totalFollowers"] = state.totalFollowers - 1;
      }

      index = state.members.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["members"] = [...state.members];
        multiArray["members"][index].is_friend = false;
        multiArray["members"][index].request.is_entry = false;
        multiArray["members"][index].request.is_send_request = false;
      }

      index = state.contacts.findIndex(
        (item) => item.user && item.user.id === friend_id
      );
      if (index > -1) {
        multiArray["contacts"] = [...state.contacts];
        multiArray["contacts"][index].user.is_friend = false;
        multiArray["contacts"][index].user.request.is_entry = false;
        multiArray["contacts"][index].user.request.is_send_request = false;
      }

      index = state.suggestions.findIndex(
        (item) => item && item.id === friend_id
      );
      if (index > -1) {
        multiArray["suggestions"] = [...state.suggestions];
        multiArray["suggestions"][index].is_friend = false;
        multiArray["suggestions"][index].request.is_entry = false;
        multiArray["suggestions"][index].request.is_send_request = false;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.ADD_FRIEND_TO_TYPE: {
      let multiArray = [],
        index = -1;
      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].categories_ids = items;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].categories_ids = items;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].categories_ids = items;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].categories_ids = items;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].categories_ids = items;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].categories_ids = items;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.FOLLOW_FRIEND: {
      let multiArray = [],
        index = -1;
      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].is_followed = true;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].is_followed = true;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].is_followed = true;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].is_followed = true;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].is_followed = true;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].is_followed = true;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.SNOOZE_FRIEND: {
      let multiArray = [],
        index = -1;
      index = state.items.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["items"] = [...state.items];
        multiArray["items"][index].is_snoozed = true;
      }

      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].is_snoozed = true;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].is_snoozed = true;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].is_snoozed = true;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].is_snoozed = true;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].is_snoozed = true;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].is_snoozed = true;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.UNFOLLOW_FRIEND: {
      let multiArray = [],
        index = -1;
      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].is_followed = false;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].is_followed = false;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].is_followed = false;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].is_followed = false;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].is_followed = false;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].is_followed = false;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.UNSNOOZE_FRIEND: {
      let multiArray = [],
        index = -1;
      index = state.items.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["items"] = [...state.items];
        multiArray["items"][index].is_snoozed = false;
      }
      index = state.friends.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["friends"] = [...state.friends];
        multiArray["friends"][index].is_snoozed = false;
      }

      index = state.families.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["families"] = [...state.families];
        multiArray["families"][index].is_snoozed = false;
      }
      index = state.businesses.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["businesses"] = [...state.businesses];
        multiArray["businesses"][index].is_snoozed = false;
      }

      index = state.workers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["workers"] = [...state.workers];
        multiArray["workers"][index].is_snoozed = false;
      }

      index = state.customers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["customers"] = [...state.customers];
        multiArray["customers"][index].is_snoozed = false;
      }

      index = state.followers.findIndex((item) => item.id === friend_id);
      if (index > -1) {
        multiArray["followers"] = [...state.followers];
        multiArray["followers"][index].is_snoozed = false;
      }

      return Object.assign({}, state, {
        ...multiArray,
      });
    }

    case types.FETCH_MEMBER_PENDING: {
      return {
        ...state,
        isMemberFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_MEMBER_FAILURE: {
      return {
        ...state,
        isMemberFetching: false,
        error: error,
        message: "",
      };
    }

    case types.FETCH_MEMBER_SUCCESS: {
      return Object.assign({}, state, {
        isMemberFetching: false,
        members: items.data,
        totalMember: items.total,
      });
    }

    case types.FETCH_MEMBER_MORE: {
      return Object.assign({}, state, {
        isMemberFetching: false,
        members: state.members.concat(items.data),
        totalMember: items.total,
      });
    }

    /********************* Suggestion ******************/
    case types.FETCH_SUGGESTION_PENDING: {
      return {
        ...state,
        isSuggestionFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_SUGGESTION_FAILURE: {
      return {
        ...state,
        isSuggestionFetching: false,
        error: error,
        message: "",
      };
    }

    case types.FETCH_SUGGESTION_SUCCESS: {
      return Object.assign({}, state, {
        isSuggestionFetching: false,
        suggestions: items.data,
        totalSuggestion: items.total,
      });
    }

    case types.FETCH_SUGGESTION_MORE: {
      return Object.assign({}, state, {
        isSuggestionFetching: false,
        suggestions: state.suggestions.concat(items.data),
        totalSuggestion: items.total,
      });
    }

    /**************Contact*****************/
    case types.FETCH_CONTACTS_PENDING: {
      return {
        ...state,
        isContactFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_CONTACTS_FAILURE: {
      return {
        ...state,
        isContactFetching: false,
        error: error,
        message: "",
      };
    }

    case types.FETCH_CONTACTS_SUCCESS: {
      return Object.assign({}, state, {
        isContactFetching: false,
        contacts: items.data,
        totalContact: items.total,
      });
    }

    case types.FETCH_CONTACTS_MORE: {
      return Object.assign({}, state, {
        isContactFetching: false,
        contacts: state.contacts.concat(items.data),
        totalContact: items.total,
      });
    }

    case types.REMOVE_FROM_GROUP: {
      let index = state.members.findIndex((item) => item.id === friend_id);
      const newArray = [...state.members];
      if (index > -1) {
        newArray.splice(index, 1);
      }
      return Object.assign({}, state, {
        members: newArray,
        totalMember: state.totalMember - 1,
      });
    }

    case types.SET_PEOPLE_SEARCH: {
      return Object.assign({}, state, {
        search,
      });
    }
    case types.FETCH_TOP_LEADERBOARD: {
      return {
        ...state,
        leaderboards: {
          ...state.leaderboards,
          [items.code]: items.data,
        },
      };
    }
    case types.FETCH_REACTION_PENDING: {
      return {
        ...state,
        reactionsExtra: {
          ...state.reactionsExtra,
          [key]: { [items.post_id]: { is_loading: true } },
        },
      };
    }
    case types.FETCH_REACTION_USER: {
      return {
        ...state,
        reactions: {
          ...state.reactions,
          [key]: {
            ...state.reactions[key],
            [items.param.post_id]: {
              ...state.reactions[key][items.param.post_id],
              data: items.data.data,
              is_more: items.data.to<items.data.total?true:false,
            },
          },
        },
        reactionsExtra: {
          ...state.reactionsExtra,
          [key]: { [items.param.post_id]: { is_loading: false } },
        },
      };
    }
    case types.FETCH_REACTION_USER_MORE: {
      return {
        ...state,
        reactions: {
          ...state.reactions,
          [key]: {
            ...state.reactions[key],
            [items.param.post_id]: {
              ...state.reactions[key][items.param.post_id],
              data: state.reactions[key][items.param.post_id].data.concat(
                items.data.data
              ),
              is_more: items.data.to<items.data.total?true:false,
            },
          },
        },
        reactionsExtra: {
          ...state.reactionsExtra,
          [key]: { [items.param.post_id]: { is_loading: false } },
        },
      };
    }

    default: {
      return state;
    }
  }
};