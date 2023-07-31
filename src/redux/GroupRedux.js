import { LifeWidget } from "@common";
const types = {
  FETCH_GROUP_PENDING: "FETCH_GROUP_PENDING",
  FETCH_GROUP_SUCCESS: "FETCH_GROUP_SUCCESS",
  FETCH_GROUP_MORE: "FETCH_GROUP_MORE",
  FETCH_GROUP_FAILURE: "FETCH_GROUP_FAILURE",
  ADD_GROUP_FORM: "ADD_GROUP_FORM",
  SUBMIT_GROUP_PENDING: "SUBMIT_GROUP_PENDING",
  SUBMIT_GROUP_SUCCESS: "SUBMIT_GROUP_SUCCESS",
  SUBMIT_GROUP_FAILURE: "SUBMIT_GROUP_FAILURE",
  UPLOAD_GROUP_PENDING: "UPLOAD_GROUP_PENDING",
  UPLOAD_GROUP_SUCCESS: "UPLOAD_GROUP_SUCCESS",
  UPLOAD_GROUP_FAILURE: "UPLOAD_GROUP_FAILURE",

  FETCH_GROUP_INVITES_PENDING: "FETCH_GROUP_INVITES_PENDING",
  FETCH_GROUP_INVITES_SUCCESS: "FETCH_GROUP_INVITES_SUCCESS",
  FETCH_GROUP_INVITES_MORE: "FETCH_GROUP_INVITES_MORE",
  FETCH_GROUP_INVITES_FAILURE: "FETCH_GROUP_INVITES_FAILURE",

  FETCH_GROUP_OWNER_PENDING: "FETCH_GROUP_OWNER_PENDING",
  FETCH_GROUP_OWNER_SUCCESS: "FETCH_GROUP_OWNER_SUCCESS",
  FETCH_GROUP_OWNER_MORE: "FETCH_GROUP_OWNER_MORE",
  FETCH_GROUP_OWNER_FAILURE: "FETCH_GROUP_OWNER_FAILURE",

  FETCH_GROUP_JOIN_PENDING: "FETCH_GROUP_JOIN_PENDING",
  FETCH_GROUP_JOIN_SUCCESS: "FETCH_GROUP_JOIN_SUCCESS",
  FETCH_GROUP_JOIN_MORE: "FETCH_GROUP_JOIN_MORE",
  FETCH_GROUP_JOIN_FAILURE: "FETCH_GROUP_JOIN_FAILURE",

  FETCH_SEARCH_GROUP_PENDING: "FETCH_SEARCH_GROUP_PENDING",
  FETCH_SEARCH_GROUP_SUCCESS: "FETCH_SEARCH_GROUP_SUCCESS",
  FETCH_SEARCH_GROUP_MORE: "FETCH_SEARCH_GROUP_MORE",
  FETCH_SEARCH_GROUP_FAILURE: "FETCH_SEARCH_GROUP_FAILURE",

  ACCEPT_GROUP_REQUEST:"ACCEPT_GROUP_REQUEST",

  JOIN_GROUP_INVITE:"JOIN_GROUP_INVITE",

  JOIN_GROUP_REQUEST:"JOIN_GROUP_REQUEST",

  FOLLOWING_GROUP_TOOGLE:"FOLLOWING_GROUP_TOOGLE",

  SET_GROUP_PRIVACY: "SET_GROUP_PRIVACY",

  DELETE_GROUP:"DELETE_GROUP",
};

export const actions = {
  fetchGroups: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_GROUP_PENDING });
    const json = await LifeWidget.groups(per_page, page);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_GROUP_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_GROUP_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_GROUP_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_GROUP_SUCCESS, page: page, data: json });
      }
    }
  },

  fetchGroupsOwner: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_GROUP_OWNER_PENDING });
    const json = await LifeWidget.groups(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_GROUP_OWNER_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_GROUP_OWNER_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_GROUP_OWNER_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_GROUP_OWNER_SUCCESS, page: page, data: json });
      }
    }
  },

  fetchGroupsJoin: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_GROUP_JOIN_PENDING });
    const json = await LifeWidget.groups(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_GROUP_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_GROUP_JOIN_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_GROUP_JOIN_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_GROUP_JOIN_SUCCESS, page: page, data: json });
      }
    }
  },

  searchGroups: async (dispatch, per_page, page, params) => {
    dispatch({ type: types.FETCH_SEARCH_GROUP_PENDING });
    const json = await LifeWidget.searchGroups(per_page, page, params);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_SEARCH_GROUP_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_SEARCH_GROUP_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_SEARCH_GROUP_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_SEARCH_GROUP_SUCCESS, page: page, data: json });
      }
    }
  },

  groupInvitesRequest: async (dispatch, per_page, page) => {
    dispatch({ type: types.FETCH_GROUP_INVITES_PENDING });
    const json = await LifeWidget.groupInvitesRequest(per_page, page);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_GROUP_INVITES_FAILURE,
        message: "Can't get data from server",
      });
    } else if (json.status) {
      dispatch({ type: types.FETCH_GROUP_INVITES_FAILURE, message: json.data.message });
    } else {
      if (page > 1) {
        dispatch({ type: types.FETCH_GROUP_INVITES_MORE, page: page, data: json });
      } else {
        dispatch({ type: types.FETCH_GROUP_INVITES_SUCCESS, page: page, data: json });
      }
    }
  },
  submitGroup: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_GROUP_PENDING });
    const json = await LifeWidget.submitGroup(data);

    if (json.success) {
      dispatch({ type: types.SUBMIT_GROUP_SUCCESS, data: json });
    } else {
      dispatch({
        type: types.SUBMIT_GROUP_FAILURE,
        message: json.data.message,
      });
    }
  },

  acceptGroupRequest: async (dispatch, group_id, user_id, id) => {
    dispatch({ type: types.ACCEPT_GROUP_REQUEST, data: id });
    const json = await LifeWidget.acceptGroupRequest(group_id, user_id);
  },

  joinGroupInvite: async (dispatch, group_id, id) => {
    dispatch({ type: types.JOIN_GROUP_INVITE, data: id });
    const json = await LifeWidget.joinGroupInvite(group_id);
  },

  groupJoinRequest: async (dispatch, group_id) => {
    dispatch({ type: types.JOIN_GROUP_REQUEST, data: group_id });
    const json = await LifeWidget.groupJoinRequest(group_id);
  },

  followingToggle: async (dispatch, group_id) => {
    dispatch({ type: types.FOLLOWING_GROUP_TOOGLE, data: group_id });
    const json = await LifeWidget.followGroupToggle(group_id);
  },

  deleteGroup: async (dispatch, group_id) => {
    dispatch({ type: types.DELETE_GROUP, data: group_id });
    const json = await LifeWidget.deleteGroup(group_id);
  },

  uploadGroupCoverPhoto: async (dispatch, group_id, data) => {
    dispatch({ type: types.UPLOAD_GROUP_PENDING });
    const json = await LifeWidget.uploadGroupCoverPhoto(group_id, data);

    if (json.success) {
      dispatch({ type: types.UPLOAD_GROUP_SUCCESS, data: json });
    } else {
      dispatch({
        type: types.UPLOAD_GROUP_FAILURE,
        message: json.data.message,
      });
    }
  },
  addGroupForm: (data) => ({
    type: types.ADD_GROUP_FORM,
    data,
  }),
  setGroupPrivacy: (data) => ({
    type: types.SET_GROUP_PRIVACY,
    data,
  }),
};

const initialState = {
  isFetching: false,
  isOwnerFetching: false,
  isJoinFetching: false,
  isInvitesFetching: false,
  isProcessing: false,
  isUploading: false,
  data: [],
  owners: [],
  joins: [],
  invites:[],
  totalInvites:0,
  error: null,
  total:0,
  totalOwner:0,
  totalJoin:0,
  page: 1,
  form: {},
  privacy:{name:"Public", id:1},
  search:[],
  isSearching:false,
  totalSearch:0,

};

export const reducer = (state = initialState, action) => {
  const { type, error, data, page } = action;
  switch (type) {
    case types.FETCH_GROUP_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: data.data,
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        data: state.data.concat(data.data),
        total: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_INVITES_PENDING: {
      return {
        ...state,
        isInvitesFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_INVITES_FAILURE: {
      return {
        ...state,
        isInvitesFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_INVITES_SUCCESS: {
      return Object.assign({}, state, {
        isInvitesFetching: false,
        invites: data.data,
        totalInvites: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_INVITES_MORE: {
      return Object.assign({}, state, {
        isInvitesFetching: false,
        invites: state.invites.concat(data.invites),
        totalInvites: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_OWNER_PENDING: {
      return {
        ...state,
        isOwnerFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_OWNER_FAILURE: {
      return {
        ...state,
        isOwnerFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_OWNER_SUCCESS: {
      return Object.assign({}, state, {
        isOwnerFetching: false,
        owners: data.data,
        totalOwner: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_OWNER_MORE: {
      return Object.assign({}, state, {
        isOwnerFetching: false,
        owners: state.owners.concat(data.data),
        totalOwner: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_JOIN_PENDING: {
      return {
        ...state,
        isJoinFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_JOIN_FAILURE: {
      return {
        ...state,
        isJoinFetching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_GROUP_JOIN_SUCCESS: {
      return Object.assign({}, state, {
        isJoinFetching: false,
        joins: data.data,
        totalJoin: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_GROUP_JOIN_MORE: {
      return Object.assign({}, state, {
        isJoinFetching: false,
        joins: state.joins.concat(data.data),
        totalJoin: data.total,
        error: null,
        page,
      });
    }

    case types.SUBMIT_GROUP_PENDING: {
      return {
        ...state,
        isProcessing: true,
      };
    }

    case types.SUBMIT_GROUP_FAILURE: {
      return {
        ...state,
        isProcessing: false,
      };
    }

    case types.SUBMIT_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        isProcessing: false,
        form:{},
        owners: [data.data].concat(state.data),
        totalOwner: state.totalOwner+1
      });
    }

    case types.UPLOAD_GROUP_PENDING: {
        return {
          ...state,
          isUploading: true,
        };
      }
  
    case types.UPLOAD_GROUP_FAILURE: {
      return {
        ...state,
        isUploading: false,
      };
    }
  
    case types.UPLOAD_GROUP_SUCCESS: {
      let indexOwner = state.owners.findIndex((item) => item.id === data.data.attachable_id);
      let indexJoin = state.joins.findIndex((item) => item.id === data.data.attachable_id);
      const newOwners = [...state.owners];
      const newJoins = [...state.joins];
      if(indexOwner>-1){
        newOwners[indexOwner].attachments = data.data;
      }
      if(indexJoin>-1){
        newJoins[indexJoin].attachments = data.data;
      }
      return Object.assign({}, state, {
        owners: newOwners,
        joins: newJoins,
        isUploading:false
      });
    }

    case types.ACCEPT_GROUP_REQUEST:{
      let index = state.invites.findIndex((item) => item.id === data);
      const newArray = [...state.invites];
      if(index>-1){
        newArray.splice(index, 1);
      }
      return Object.assign({}, state, {
        invites: newArray,
      });
    }

    case types.JOIN_GROUP_INVITE:{
      let index = state.invites.findIndex((item) => item.id === data);
      const newArray = [...state.invites];
      if(index>-1){
        newArray.splice(index, 1);
      }
      return Object.assign({}, state, {
        invites: newArray,
      });
    }

    case types.JOIN_GROUP_REQUEST:{
      let index = state.search.findIndex((item) => item.id === data);
      const newArray = [...state.search];
      if(index>-1){
        newArray[index].member = {requested:1};
      }
      return Object.assign({}, state, {
        search: newArray,
      });
    }

    case types.FOLLOWING_GROUP_TOOGLE:{
      let indexOwner = state.owners.findIndex((item) => item.id === data);
      let indexJoin = state.joins.findIndex((item) => item.id === data);
      const newOwners = [...state.owners];
      const newJoins = [...state.joins];
      if(indexOwner>-1){
        newOwners[indexOwner].following = !newOwners[indexOwner].following;
      }
      if(indexJoin>-1){
        newJoins[indexJoin].following = !newJoins[indexJoin].following;
      }
      return Object.assign({}, state, {
        owners: newOwners,
        joins: newJoins,
      });
    }

    case types.DELETE_GROUP:{
      let groups = [...state.owners];
      const newGroups = groups.filter((group) => group.id !== data);
      return {
        ...state,
        owners: newGroups,
        totalOwner:state.totalOwner - 1
      };
    }

    case types.ADD_GROUP_FORM: {
      return { ...state, form: data };
    }

    case types.SET_GROUP_PRIVACY:{
      return { ...state, privacy: data };
    }

    case types.FETCH_SEARCH_GROUP_PENDING: {
      return {
        ...state,
        isSearching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_SEARCH_GROUP_FAILURE: {
      return {
        ...state,
        isSearching: false,
        error: null,
        message: "",
      };
    }

    case types.FETCH_SEARCH_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        isSearching: false,
        search: data.data,
        totalSearch: data.total,
        error: null,
        page,
      });
    }

    case types.FETCH_SEARCH_GROUP_MORE: {
      return Object.assign({}, state, {
        isSearching: false,
        search: state.search.concat(data.data),
        totalSearch: data.total,
        error: null,
        page,
      });
    }

    default: {
      return state;
    }
  }
};