export const SET_UNREADMSG_COUNT = 'SET_UNREADMSG_COUNT'
export const RESET_UNREADMSG_COUNT = 'RESET_UNREADMSG_COUNT'
export const UPDATE_UNREADMSG_COUNT = 'UPDATE_UNREADMSG_COUNT'

export const setUnreadMsgCount = unreadCount => ({ type: SET_UNREADMSG_COUNT, unreadCount })
export const resetUnreadMsgCount = () => ({ type: RESET_UNREADMSG_COUNT })
export const updateUnreadMsgCount = unreadCount => ({ type: UPDATE_UNREADMSG_COUNT, unreadCount })
