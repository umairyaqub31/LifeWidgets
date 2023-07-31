import { LifeWidget } from "@common";

const types = {
    LOGOUT: "LOGOUT",
    LOGOUT_RESETSTATE: "LOGOUT_RESETSTATE",
    LOGIN: "LOGIN_SUCCESS",
    PHONE_VALIDATE: "PHONE_VALIDATE",
    ADD_BREAK_TIME: "ADD_BREAK_TIME",
    SELECTED_TAB: "SELECTED_TAB",
    MENU_SETTING: "MENU_SETTING",
    REQUEST_COPY_SETTING: "REQUEST_COPY_SETTING",
    MENU_CELEBRITY_SETTING: "MENU_CELEBRITY_SETTING",
    FEEDWELCOME_UPDATE: "FEEDWELCOME_UPDATE",
    FETCH_TUTORIAL_PENDING: "FETCH_TUTORIAL_PENDING",
    FETCH_TUTORIAL_VIDEOS: "FETCH_TUTORIAL_VIDEOS",
    FETCH_TUTORIAL_VIDEOS_MORE: "FETCH_TUTORIAL_VIDEOS_MORE",
    SET_PHONE_OBJECT: "SET_PHONE_OBJECT",
    FETCH_ACCESS_INFORMATION_PENDING:"FETCH_ACCESS_INFORMATION_PENDING",
    FETCH_ACCESS_INFORMATION:"FETCH_ACCESS_INFORMATION",
    FETCH_ACCESS_INFORMATION_MORE:"FETCH_ACCESS_INFORMATION_MORE",
    UPDATE_USER_DATA:"UPDATE_USER_DATA"

  };
  export const actions = {
    login: (user, token) => {
      return { type: types.LOGIN, user, token };
    },
    phoneValidate: (phoneValidateUser, token) => {
      return { type: types.PHONE_VALIDATE, phoneValidateUser, token };
    },
    addBreak: (data) => {
      return { type: types.ADD_BREAK_TIME, data };
    },
    feedWelcomeDone: (data) => {
      return { type: types.FEEDWELCOME_UPDATE, data };
    },
    logout() {
      return { type: types.LOGOUT };
    },
    logoutResetState() {
      return { type: types.LOGOUT_RESETSTATE };
    },
    selectTab: (data) => {
      return { type: types.SELECTED_TAB, data };
    },
    menuSettings: (data) => {
      return { type: types.MENU_SETTING, data };
    },
    requestCopySettings: (data) => {
      return { type: types.REQUEST_COPY_SETTING, data };
    },
    celebritySettings: (data) => {
      return { type: types.MENU_CELEBRITY_SETTING, data };
    },
    fetchTutorialVideos: async (dispatch, per_page, page) => {
      dispatch({ type: types.FETCH_TUTORIAL_PENDING});
      const json = await LifeWidget.tutorialVideos(per_page, page);

      if (json === undefined) {
      } else if (json.status) {
      } else {
        if (page > 1) {
          dispatch({ type: types.FETCH_TUTORIAL_VIDEOS_MORE, data: json });
        } else {
          dispatch({ type: types.FETCH_TUTORIAL_VIDEOS, data: json });
        }
      }
    },
    fetchAccessInformation: async (dispatch, per_page, page) => {
      dispatch({ type: types.FETCH_ACCESS_INFORMATION_PENDING});
      const json = await LifeWidget.fetchAccessYourInformation(per_page, page);

      if (json === undefined) {
      } else if (json.status) {
      } else {
        if (page > 1) {
          dispatch({ type: types.FETCH_ACCESS_INFORMATION_MORE, data: json });
        } else {
          dispatch({ type: types.FETCH_ACCESS_INFORMATION, data: json });
        }
      }
    },
    setPhoneObject: (data) => {
      return { type: types.SET_PHONE_OBJECT, data };
    },
    updateUserData: (dispatch, data) => {
      dispatch({ type: types.UPDATE_USER_DATA, data });
    },
  };

  const initialState = {
    user: null,
    phoneValidateUser:null,
    token: null,
    breakTime:null,
    selectedTab:"people",
    menu:{flirt:true,bars:true,restaurant:true, feedback:true, share_us:true, bill_of_rights:true, company:true, reward:true, how_to:true,groups:true,saved:true,comms:true,},
    celebrity:{},
    accessInformation:{},
    feedWelcomeCompleted: false,
    isFetching:false,
    tutorialVideos:[],
    tutorialVideosTotal:0,
    phoneObject:{
      cca2:'US',
      calling_code:'1',
      phone_number:null
    },
    availableCopies:[],
    totalAvailableCopies:0,
    isFetchingCopies:false,

  };

  export const reducer = (state = initialState, action) => {
    const { type, user, phoneValidateUser, token, data } = action;

    switch (type) {
      case types.LOGOUT_RESETSTATE: case types.LOGOUT:
        return Object.assign({}, initialState);
      case types.LOGIN:
        return { ...state, user, token };
      case types.PHONE_VALIDATE:
          return { ...state, phoneValidateUser, token };
      case types.ADD_BREAK_TIME:
        return { ...state, breakTime:data };
      case types.FEEDWELCOME_UPDATE:
        return { ...state, feedWelcomeCompleted:data };
      case types.SELECTED_TAB:
          return { ...state, selectedTab:data };
      case types.MENU_SETTING:{
        return {
          ...state,
          menu:{
            ...state.menu,
            [data]:typeof state.menu!=="undefined"? !state.menu[data]:true
          }
        }
      }
      case types.REQUEST_COPY_SETTING:{
        if(typeof data === "object"){
          return Object.assign({}, state, {
            accessInformation:data
          });
        }
        return {
          ...state,
          accessInformation:{
            ...state.accessInformation,
            [data]:typeof state.accessInformation!=="undefined"? !state.accessInformation[data]:true
          }
        }
      }
      case types.MENU_CELEBRITY_SETTING:{
        return {
          ...state,
          celebrity:data
        }
      }
      case types.FETCH_TUTORIAL_PENDING: {
        return {
          ...state,
          isFetching: true
        }
      }
      case types.FETCH_TUTORIAL_VIDEOS: {
        return {
          ...state,
          tutorialVideos: data.data,
          tutorialVideosTotal:data.total,
          isFetching: false
        }
      }
      case types.FETCH_TUTORIAL_VIDEOS_MORE: {
        return {
          ...state,
          tutorialVideos: state.tutorialVideos.concat(data.data),
          tutorialVideosTotal:data.total,
          isFetching: false
        }
      }
      case types.FETCH_ACCESS_INFORMATION_PENDING: {
        return {
          ...state,
          isFetchingCopies:true
        }
      }
      case types.FETCH_ACCESS_INFORMATION: {
        return {
          ...state,
          availableCopies: data.data,
          totalAvailableCopies:data.total,
          isFetchingCopies:false
        }
      }
      case types.FETCH_ACCESS_INFORMATION_MORE: {
        return {
          ...state,
          availableCopies: state.availableCopies.concat(data.data),
          totalAvailableCopies:data.total,
          isFetchingCopies:false
        }
      }
      case types.SET_PHONE_OBJECT:{
        return {
          ...state,
          phoneObject: data
        }
      }
      case types.UPDATE_USER_DATA: {
        return {
          ...state,
          user: {
            ...state.user,
            ...data,
          },
        };
      }
      default:
        return state;
    }
  };
