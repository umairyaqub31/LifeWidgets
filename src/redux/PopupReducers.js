



const HANDLE_LIKECLICK_SUCCESS = 'HANDLE_LIKECLICK_SUCCESS';
const HANDLE_DISLIKECLICK_SUCCESS = 'HANDLE_DISLIKECLICK_SUCCESS';
const HANDLE_FAVORITECLICK_SUCCESS = 'HANDLE_FAVORITECLICK_SUCCESS';
const HANDLE_LIKETEXTCLICK_SUCCESS = 'HANDLE_LIKETEXTCLICK_SUCCESS';
const HANDLE_ADDFRIENDCLICK_SUCCESS = 'HANDLE_ADDFRIENDCLICK_SUCCESS';
const HANDLE_CONFIRMFRIENDCLICK_SUCCESS = 'HANDLE_CONFIRMFRIENDCLICK_SUCCESS';
const HANDLE_INVITEFRIENDCLICK_SUCCESS = 'HANDLE_INVITEFRIENDCLICK_SUCCESS';
const HANDLE_CHECKEDCLICK_SUCCESS = 'HANDLE_CHECKEDCLICK_SUCCESS';
const HANDLE_SELECTPRIVACYCLICK_SUCCESS = 'HANDLE_SELECTPRIVACYCLICK_SUCCESS';
const HANDLE_GROUPCLICK_SUCCESS = 'HANDLE_GROUPCLICK_SUCCESS';
const HANDLE_GROUPCLICK_SUCCESS1 = 'HANDLE_GROUPCLICK_SUCCESS1';
const HANDLE_GROUPCLICK_SUCCESS2 = 'HANDLE_GROUPCLICK_SUCCESS2';
const HANDLE_NEWSFEEDCLICK_SUCCESS = 'HANDLE_NEWSFEEDCLICK_SUCCESS';
const HANDLE_SNACKBARHANDLE_SUCCESS = 'HANDLE_SNACKBARHANDLE_SUCCESS';
const HANDLE_POSTHANDLERCLICK_SUCCESS = 'HANDLE_POSTHANDLERCLICK_SUCCESS';
const HANDLE_COMMENTHANDLERCLICK_SUCCESS = 'HANDLE_COMMENTHANDLERCLICK_SUCCESS';
const HANDLE_FLIRTCLICK_SUCCESS = 'HANDLE_FLIRTCLICK_SUCCESS';
const HANDLE_INTERSTED_IN_CLICK_SUCCESS = 'HANDLE_INTERSTED_IN_CLICK_SUCCESS';
const HANDLE_AGESHOW_CLICK_SUCCESS = 'HANDLE_AGESHOW_CLICK_SUCCESS';
const HANDLE_LASTNAME_CLICK_SUCCESS = 'HANDLE_LASTNAME_CLICK_SUCCESS';
const HANDLE_FULLNAME_CLICK_SUCCESS = 'HANDLE_FULLNAME_CLICK_SUCCESS';
const HANDLE_CONNECTCLICK_SUCCESS = 'HANDLE_CONNECTCLICK_SUCCESS';
const HANDLE_CONNECTREMOVECLICK_SUCCESS = 'HANDLE_CONNECTREMOVECLICK_SUCCESS';
const HANDLE_AUTHCLICK_SUCCESS = 'HANDLE_AUTHCLICK_SUCCESS';
const HANDLE_SIGNOUTCLICK_SUCCESS = 'HANDLE_SIGNOUTCLICK_SUCCESS';
const HANDLE_TIMECHECKEDCLICK_SUCCESS = 'HANDLE_TIMECHECKEDCLICK_SUCCESS';
const HANDLE_SWITCHCLICK_SUCCESS = 'HANDLE_SWITCHCLICK_SUCCESS';
const HANDLE_ABOUT_US_CLICK_SUCCESS = 'HANDLE_ABOUT_US_CLICK_SUCCESS';
const HANDLE_FLIRTSHIDESHOW_CLICK_SUCCESS = 'HANDLE_FLIRTSHIDESHOW_CLICK_SUCCESS';
const HANDLE_BARHIDESHOW_CLICK_SUCCESS = 'HANDLE_BARHIDESHOW_CLICK_SUCCESS';
const HANDLE_BILLHIDESHOW_CLICK_SUCCESS = 'HANDLE_BILLHIDESHOW_CLICK_SUCCESS';
const HANDLE_FEEDBACKHIDESHOW_CLICK_SUCCESS = 'HANDLE_FEEDBACKHIDESHOW_CLICK_SUCCESS';
const HANDLE_RESTAURANTHIDESHOW_CLICK_SUCCESS = 'HANDLE_RESTAURANTHIDESHOW_CLICK_SUCCESS';
const HANDLE_COMPANYHIDESHOW_CLICK_SUCCESS = 'HANDLE_COMPANYHIDESHOW_CLICK_SUCCESS';

import postjson from '@common/post.json'

const initialState = {
        posts:postjson,
        liked:true,
        dislike: false,
        favorite:true,
        likedtext:true,
        addfriend: true,
        confirmfriend:true,
        invite:true,
        checked:true,
        value:'Public',
        icon:'globe-americas',
        post_status:'News Feed',
        group: 'Job opportunities for USA',
        group1: 'Think Twice Code Once',
        group2: 'Tweet Discussion Group',
        pointerEvents:'auto',
        opacity:1,
        tag_with_text:'',
        tag_Friends:'',
        newpost:{},
        new_comment:{},
        snackbar_visible:false,
        snackbar_message:'snackbar is visible',
        flirt_mode:'Yes',
        intersted_In:'No',
        flirt_aboutUs:'No',
        age_show:'Yes',
        last_name:'No',
        full_name:'No',
        connect:true,
        connectClose:true,
        authState:true,
        timeChecked:false,
        isSwitchOn:true,
        flirtsMenuHide:'Yes',
        BarMenuHide:'Yes',
        billRightMenuHide:'Yes',
        FeedbackMenuHide:'Yes',
        RestaurantsMenuHide:'Yes',
        CompanyMenuHide: 'Yes',
};
export default function (state = initialState, action) {
        if (action.type === HANDLE_LIKECLICK_SUCCESS) {
                // let like = false;
                // if(action.payload=== true){
                //       like =false
                // }
                // if(action.payload=== false){
                //         like =true
                //   }
        return {
                ...state,
                liked: !state.liked,
                dislike: false
                }
        };
        if (action.type === HANDLE_DISLIKECLICK_SUCCESS) {
                let dislike = false;
                if(action.payload=== true){
                        dislike =false
                }
                if(action.payload=== false){
                        dislike =true
                  }
        return {
                ...state,
                dislike: dislike,
                liked:false
                }
        };
        if (action.type === HANDLE_FAVORITECLICK_SUCCESS) {
        return {
                ...state,
                favorite:!state.favorite
                }
        };
        if (action.type === HANDLE_LIKETEXTCLICK_SUCCESS) {
                let likedtext = false;
                if(action.payload=== true){
                        likedtext =false
                }
                if(action.payload=== false){
                        likedtext =true
                  }
        return {
                ...state,
                        likedtext:likedtext
                }
        };
        if (action.type === HANDLE_ADDFRIENDCLICK_SUCCESS) {
                let add = true;
                if(action.payload=== true){
                        add =false
                }
                if(action.payload=== false){
                        add =true
                  }
        return {
                ...state,
                        addfriend:add
                }
        };
        if (action.type === HANDLE_CONFIRMFRIENDCLICK_SUCCESS) {
        return {
                ...state,
                        confirmfriend:false
                }
        };
        if (action.type === HANDLE_INVITEFRIENDCLICK_SUCCESS) {
        return {
                ...state,
                        invite:false
                }
        };
        if (action.type === HANDLE_CHECKEDCLICK_SUCCESS) {
                let tag = '';
                let tag_text = '';
                if(action.payload === true){
                        tag_text='is with',
                        tag='Sawan Jay'
                }
                if(action.payload === false){
                        tag=''
                }
        return {
                ...state,
                        checked:!state.checked,
                        tag_with_text:tag_text,
                        tag_Friends:tag
                }
        };
        if (action.type === HANDLE_SELECTPRIVACYCLICK_SUCCESS) {
                let icon = '';
                if(action.payload=== 'Only Me'){
                        icon='lock'
                }
                if(action.payload=== 'Public'){
                        icon='globe-americas'
                }
                if(action.payload=== 'Friends'){
                        icon='user-friends'
                }
                return {
                        ...state,
                         value:action.payload,
                         icon:icon
                }
        };
        if (action.type === HANDLE_SNACKBARHANDLE_SUCCESS) {
                return {
                        ...state,
                        snackbar_visible:!state.snackbar_visible,
                }
        };
        if (action.type === HANDLE_GROUPCLICK_SUCCESS) {
                return {
                        ...state,
                        post_status:state.group,
                        pointerEvents:'none',
                        opacity:.4
                }
        };
        if (action.type === HANDLE_GROUPCLICK_SUCCESS1) {
                return {
                        ...state,
                        post_status:state.group1,
                        pointerEvents:'none',
                        opacity:.4
                }
        };
        if (action.type === HANDLE_GROUPCLICK_SUCCESS2) {
                return {
                        ...state,
                        post_status:state.group2,
                        pointerEvents:'none',
                        opacity:.4
                }
        };
        if (action.type === HANDLE_NEWSFEEDCLICK_SUCCESS) {
                return {
                        ...state,
                        post_status:'News Feed',
                        pointerEvents:'auto',
                        opacity:1
                }
        };
        if (action.type === HANDLE_POSTHANDLERCLICK_SUCCESS) {
                // alert(JSON.stringify())
                return {
                        ...state,
                        newpost:action.payload,
                }
        };
        if (action.type === HANDLE_COMMENTHANDLERCLICK_SUCCESS) {
                return {
                        ...state,
                        new_comment:action.payload,
                }
        };
        if (action.type === HANDLE_FLIRTCLICK_SUCCESS) {
                return {
                        ...state,
                        flirt_mode:action.payload,
                }
        };
        if (action.type === HANDLE_INTERSTED_IN_CLICK_SUCCESS) {
                return {
                        ...state,
                        intersted_In:action.payload,
                }
        };
        if (action.type === HANDLE_ABOUT_US_CLICK_SUCCESS) {
                return {
                        ...state,
                        flirt_aboutUs:action.payload,
                }
        };
        if (action.type === HANDLE_AGESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        age_show:action.payload,
                }
        };
        if (action.type === HANDLE_LASTNAME_CLICK_SUCCESS) {
                return {
                        ...state,
                        last_name:action.payload,
                }
        };
        if (action.type === HANDLE_FULLNAME_CLICK_SUCCESS) {
                return {
                        ...state,
                        full_name:action.payload,
                }
        };
        if (action.type === HANDLE_CONNECTCLICK_SUCCESS) {
                return {
                        ...state,
                        connect:!action.payload,
                }
        };
        if (action.type === HANDLE_CONNECTREMOVECLICK_SUCCESS) {
                return {
                        ...state,
                        connectClose:false,
                }
        };
        if (action.type === HANDLE_AUTHCLICK_SUCCESS) {
                return {
                        ...state,
                        authState:true,
                }
        };
        if (action.type === HANDLE_SIGNOUTCLICK_SUCCESS) {
                return {
                        ...state,
                        authState:false,
                }
        };
        if (action.type === HANDLE_TIMECHECKEDCLICK_SUCCESS) {
                return {
                        ...state,
                        timeChecked:!action.payload,
                }
        };
        if (action.type === HANDLE_SWITCHCLICK_SUCCESS) {
                return {
                        ...state,
                        isSwitchOn:!action.payload,
                }
        };
        if (action.type === HANDLE_FLIRTSHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        flirtsMenuHide:action.payload,
                }
        };
        if (action.type === HANDLE_BARHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        BarMenuHide:action.payload,
                }
        };
        if (action.type === HANDLE_BILLHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        billRightMenuHide:action.payload,
                }
        };
        if (action.type === HANDLE_FEEDBACKHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        FeedbackMenuHide:action.payload,
                }
        };
        if (action.type === HANDLE_RESTAURANTHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        RestaurantsMenuHide:action.payload,
                }
        };
        if (action.type === HANDLE_COMPANYHIDESHOW_CLICK_SUCCESS) {
                return {
                        ...state,
                        CompanyMenuHide:action.payload,
                }
        };
        return state;
}
