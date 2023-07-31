import { DIALOG_TYPE } from '../helpers/constants';
import { preparationUploadImg, preparationAttachment } from '../helpers/file'
import ConnectyCube from "react-native-connectycube";
import AuthService from "../services/auth-service";
import ChatService from "../services/chat-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {LifeWidget} from "@common"

const types = {
  FETCH_RECENT_CHAT_DIALOG: "FETCH_RECENT_CHAT_DIALOG",
  FETCH_ONLINE_USER: "FETCH_ONLINE_USER",
  FETCH_GROUP_CHAT_DIALOG: "FETCH_GROUP_CHAT_DIALOG",
  SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
  CLEAR_SELECTED_ITEM: "CLEAR_SELECTED_ITEM",
  DELETE_DIALOG: "DELETE_DIALOG",
  FETCH_CHAT_MESSAGE_PENDING: "FETCH_CHAT_MESSAGE_PENDING",
  FETCH_CHAT_MESSAGE: "FETCH_CHAT_MESSAGE",
  FETCH_MORE_CHAT_MESSAGE: "FETCH_MORE_CHAT_MESSAGE",
  FETCH_MORE_CHAT_PENDING: "FETCH_MORE_CHAT_PENDING",
  DELETE_CHAT_MESSAGE: "DELETE_CHAT_MESSAGE",
  SEND_CHAT_MESSAGE:"SEND_CHAT_MESSAGE",
  APPEND_CHAT_MESSAGE:"APPEND_CHAT_MESSAGE",
  SET_BACKGROUND_CHAT_IMAGE:"SET_BACKGROUND_CHAT_IMAGE",
};

export const actions = {
  fetchRecentChatDialog: async (dispatch, per_page) => {
    console.log('.......................fetchRecentChatDialog...................');
    try {
        const json = await ConnectyCube.chat.dialog.list({
          type: 3,
          limit: per_page,
        });
        if (json.items) {
          dispatch({ type: types.FETCH_RECENT_CHAT_DIALOG, data: json.items });
        }
    } catch(e) {
        if (e.code === 403) {
            var value = await AsyncStorage.getItem("userdata");
            var parse = JSON.parse(value);
            await AuthService.signIn(parse)
              .then(() => {
                ChatService.setUpListeners();
                
              })
              .catch((error) => {
                console.log("connectycube login", JSON.stringify(error));
              });
        }

    }
  },
  fetchGroupChatDialog: async (dispatch, per_page) => {
    const json = await ConnectyCube.chat.dialog.list({
      type: 2,
      limit: per_page,
    });
    if (json.items) {
      dispatch({ type: types.FETCH_GROUP_CHAT_DIALOG, data: json.items });
    }
  },
  deleteDialog: async (dispatch, dialog, type="recentChatDialog") => {
    dispatch({ type: types.DELETE_DIALOG, data: {dialog, type}});
    await ConnectyCube.chat.dialog.delete(dialog);
  },
  fetchChatMessage: async (dispatch, dialog, cube_id) => {

    if(!dialog){
      dispatch({ type: types.FETCH_CHAT_MESSAGE_PENDING });
      const newDialog = await ChatService.createPrivateDialog(cube_id);
      if(newDialog){
        dialog = Object.assign({}, newDialog, { _id: newDialog.id })
      }
    }
    const json = await ConnectyCube.chat.message.list({
      chat_dialog_id: dialog._id,
      sort_desc: "date_sent",
    });
    dispatch({ type: types.FETCH_CHAT_MESSAGE, data: {data:json.items, dialog:dialog} });
  },
  fetchMoreChatMessage: async (dispatch, dialog, lastMessage) => {
    dispatch({ type: types.FETCH_MORE_CHAT_PENDING, data: {dialog:dialog} });
    const json = await ConnectyCube.chat.message.list({
      chat_dialog_id: dialog._id,
      date_sent: { lt: lastMessage.date_sent },
      sort_desc: "date_sent",
    });
    dispatch({ type: types.FETCH_MORE_CHAT_MESSAGE, data: {data:json.items, dialog:dialog} });
  },
  sendChatMessage: async (dispatch, dialog, message, user, attachments=null) => {
    const text = message.trim()
    const date = Math.floor(Date.now() / 1000)
    const recipient_id = dialog.type === DIALOG_TYPE.PRIVATE ? dialog.occupants_ids.find(elem => elem != user.cube_user_id)
      : dialog.xmpp_room_jid;
      let msg = {
      type: dialog.type === 3 ? 'chat' : 'groupchat',
      body: text,
      extension: {
        save_to_history: 1,
        dialog_id: dialog.id,
        sender_id: user.cube_user_id,
        date_sent: date,
      },
      markable: 1
    }
    if(attachments){
      msg.body = 'Image attachment'
      const response = await ConnectyCube.storage.createAndUpload(attachments)
      msg.extension.attachments = [{ uid: response.uid, id: response.id, type: "photo" }];
    }
    const _id = await ConnectyCube.chat.send(recipient_id, msg);
    if(_id){
      const tokens = await LifeWidget.getUserDeviceTokenByCubeIds({cube_ids:dialog.occupants_ids});
      if(tokens){
        sendPushNotification(msg.body, user, tokens);
      }
     
    }
  },
  appendChatMessage:(dispatch, data, dialog)=> {
    dispatch({ type: types.APPEND_CHAT_MESSAGE, data: {data,dialog} });
  },
  deleteChatMessage: async (dispatch, message_id, id) => {
    dispatch({ type: types.DELETE_CHAT_MESSAGE, data: {message_id, id}});
    const json = await ConnectyCube.chat.message.delete(message_id);
  },
  setBackgroundChatImage: async (dispatch, data, dialog) => {
    dispatch({ type: types.SET_BACKGROUND_CHAT_IMAGE, data: {data,dialog}});
  },
  fetchOnlineUser: async (dispatch, data) => {
    dispatch({ type: types.FETCH_ONLINE_USER, data: data });
  },
  setSelectedItem: (data) => ({
    type: types.SET_SELECTED_ITEM,
    data,
  }),
  clearSelectedItem: () => ({
    type: types.CLEAR_SELECTED_ITEM
  }),
};

const initialState = {
  recentChatDialog: [],
  groupChatDialog: [],
  onlineUsers: [],
  selectedItems:[],
  lastDialog:{},
  isChatFetching:false,
  history:{},
  extra:{}
};

const sendPushNotification = async (text, user, tokens) => {
  const message = {
    to: tokens,
    sound: "default",
    title: user.first_name,
    body: text,
    data: {
      connectyCubeId: user.cube_user_id,
      chatName: user.first_name,
      userImg: user.profile_photo,
      type: "chat",
    },
  };
  let response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.FETCH_RECENT_CHAT_DIALOG: {
      let items = [];
      let meta_data = {};
      for (var i = 0; i < data.length; i++) {
        meta_data = {};
        if(data[i].description){
          meta_data = JSON.parse(data[i].description);
        }
        items[i] = {
          ...data[i],
          photo: data[i].photo
            ? ConnectyCube.storage.privateUrl(data[i].photo)
            : null,
          meta_data:meta_data
        };
      }
      return {
        ...state,
        recentChatDialog: items,
      };
    }
    case types.SET_BACKGROUND_CHAT_IMAGE:{
      let newArr = [...state.recentChatDialog];
      let dialogIndex = newArr.findIndex((item) => item._id === data.dialog._id);

      let dialogArry = newArr[dialogIndex];
      dialogArry.meta_data = data.data;
      newArr[dialogIndex] = dialogArry;
      return Object.assign({}, state, {
        recentChatDialog: newArr,
      });
    }
    case types.FETCH_GROUP_CHAT_DIALOG: {
      let items = [];
      for (var i = 0; i < data.length; i++) {
        items[i] = {
          ...data[i],
          photo: data[i].photo
            ? ConnectyCube.storage.privateUrl(data[i].photo)
            : null,
        };
      }
      return {
        ...state,
        groupChatDialog: items,
      };
    }
    case types.FETCH_ONLINE_USER: {
      return {
        ...state,
        onlineUsers: data,
      };
    }
    case types.SET_SELECTED_ITEM: {

      let selected = [...state.selectedItems];
      let selectedArray = [];
      let found = selected.find((item) => item.id === data.id);
      if (!found) {
          selected.push(data);
      } else {
          selected = selected.filter((item) => item.id !== data.id);
      }
      selectedArray = selected;

      return {
        ...state,
        selectedItems: selectedArray,
      };
    }
    case types.DELETE_DIALOG:{

      let newArray = [...state[data.type]];
      const dialogArray = newArray.filter((dialog) => dialog._id !== data.dialog);
      return {
        ...state,
        [data.type]: dialogArray,
      };
    }
    case types.FETCH_CHAT_MESSAGE:{
      let history = [];
      let items = data.data ?? [];
      for (var i = 0; i < items.length; i++) {
        history[i] = {
          ...items[i],
          text: items[i].message,
          createdAt: items[i].created_at,
          user: { _id: items[i].recipient_id },
          image:
            items[i].attachments.length > 0
              ? ConnectyCube.storage.privateUrl(
                  items[i].attachments[0].uid
                )
              : "",
        };
      }
      return {
        ...state,
        lastDialog:data.dialog,
        isChatFetching:false,
        history: {
          ...state.history,
          [data.dialog._id]: history,
        },
        extra:{
          ...state.extra,
          [data.dialog._id]: {is_more:history.length>99?true:false},
        }
      };
    }
    case types.FETCH_MORE_CHAT_MESSAGE:{
      let history = [];
      let items = data.data ?? [];
      for (var i = 0; i < items.length; i++) {
        history[i] = {
          ...items[i],
          text: items[i].message,
          createdAt: items[i].created_at,
          user: { _id: items[i].recipient_id },
          image:
            items[i].attachments.length > 0
              ? ConnectyCube.storage.privateUrl(
                  items[i].attachments[0].uid
                )
              : "",
        };
      }
      return {
        ...state,
        lastDialog:data.dialog,
        isChatFetching:false,
        history: {
          ...state.history,
          [data.dialog._id]: state.history[data.dialog._id].concat(history),
        },
        extra:{
          ...state.extra,
          [data.dialog._id]: {is_more:history.length>99?true:false, is_loading:false},
        }
      };
    }
    case types.FETCH_MORE_CHAT_PENDING:{
      return {
        ...state,
        extra:{
          ...state.extra,
          [data.dialog._id]: {is_loading:true, is_more:true},
        }
      };
    }
    case types.APPEND_CHAT_MESSAGE:{
      let receiver_id;
      if(data.data.type==="chat"){
        receiver_id = data.dialog.occupants_ids.find(elem => elem != data.data.extension.sender_id)
      } else {
        receiver_id = data.data.extension.sender_id
      }  
      let user =  {_id:receiver_id}
      let history = {
        ...data.data,
        text: data.data.body,
        createdAt: moment().format(),
        user:user,
        image:
        data.data.attachments && data.data.attachments.length > 0
            ? ConnectyCube.storage.privateUrl(
              data.data.attachments[0].uid
              )
            : "",
      };
        
      return {
        ...state,
        history: {
          ...state.history,
          [data.dialog._id]: [history].concat(state.history[data.dialog._id]),
        },
      };
    }
    case types.FETCH_CHAT_MESSAGE_PENDING:{
      return {
        ...state,
        isChatFetching:true
      }
    }
    case types.DELETE_CHAT_MESSAGE:{
      return {
        ...state,
        history: {
          ...state.history,
          [data.id]:state.history[data.id].filter((message) => message._id !== data.message_id)
        },
      };
    }
    case types.CLEAR_SELECTED_ITEM:{
      return {
        ...state,
        selectedItems: [],
      };
    }

    default: {
      return state;
    }
  }
};
