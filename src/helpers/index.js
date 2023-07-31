import * as React from "react";
import Capitalize from './Capitalize';
import * as Notifications from 'expo-notifications';
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { Color, Config } from "@common";

const _calculateAge = (birthday) => { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const imageConfig = () => {
    return "/Resize?Resize:geometry=640x480&set:Quality=95"
}

const MinMaxAge = (array=[]) => {

    let dates = [], maximumDate = null, minimumDate = null, maxAge = null, minAge = null;

	if(array.length>0){
        try {
        dates = array.map((item) =>  new Date(item.user.date_of_birth));
        minimumDate = new Date(Math.max.apply(null,dates));
        maximumDate = new Date(Math.min.apply(null,dates));
        maxAge = _calculateAge(maximumDate);
        minAge = _calculateAge(minimumDate);
        } catch (e) {}
    }
    if(maxAge && minAge){
        return "Age: "+minAge+" - "+maxAge;
    }
    return "";
}

const PrivacyStatusName = (status) => {

    if(status===1){
        return "Public"
    } else if(status===2){
        return "Friend"
    } else if(status===3){
        return "Private";
    }
    return "Select Privacy"

}

const PrivacyStatusIcon = (status) => {

    if(status===1){
        return <Fontisto name="earth" size={12} color={Color.black} />
    } else if(status===2){
        return <FontAwesome5
        name="user-friends"
        size={12}
        color={Color.black}
      />
    } else if(status===3){
        return <FontAwesome5
        name="lock"
        size={12}
        color={Color.black}
      />
    }
    return <Fontisto name="player-settings" size={12} color={Color.black} />

}

const OptimizeImage = (attachment_url, type="image") => {
    let config = type=="video"?"":imageConfig();

    return Config.lifeWidget.image_url +"/"+attachment_url+config;
}


const ScheduleLocalNotification = (items) => {
    Notifications.cancelAllScheduledNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Ready!',
        body: "Your post is ready",
        data:{data:items, type:"ready"}
      },
      trigger: { seconds: 5, repeats: false },
    });
}

const getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
export {
    Capitalize,
    MinMaxAge,
    PrivacyStatusName,
    PrivacyStatusIcon,
    OptimizeImage,
    ScheduleLocalNotification,
    getRandomString
}
