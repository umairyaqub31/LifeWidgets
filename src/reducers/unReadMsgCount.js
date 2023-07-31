import {SET_UNREADMSG_COUNT,
RESET_UNREADMSG_COUNT,
UPDATE_UNREADMSG_COUNT 

  } from '../actions/unReadmsgcount'
  
  export default (unreadCount = null, action) => {
    switch (action.type) {
      case SET_UNREADMSG_COUNT:
        return action.unreadCount
  
      case UPDATE_UNREADMSG_COUNT: {
        const result = Object.assign(unreadCount, action.unreadCount)
        console.log(result,'resultupdatecode');
        unreadCount = result
        return { ...unreadCount }
      }
  
      case RESET_UNREADMSG_COUNT:
        return null
  
      default:
        return unreadCount
    }
  }