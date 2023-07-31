import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import { OptimizeImage, Capitalize } from "@helpers";

class InviteFriend extends React.Component {

  _acceptGroupRequest = () => {
    const { item } = this.props;
    this.props._acceptGroupRequest(item.group.id, item.user.id, item.id);
  }
  
  _joinGroupInvite = () => {
    const { item } = this.props;
    this.props._joinGroupInvite(item.group.id, item.id);
  }

  render() {
    const { item } = this.props;
    if(!item){
      return null;
    }
    //alert(JSON.stringify(item,null,2))
    //return null;
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.group.attachments) {
      banner = OptimizeImage(item.group.attachments.attachment_url);
    }
    return (
      <View style={styles.groupInvitefriendscontainer}>
        {item.invited === 1 && item.invited_by ? (
          <View style={styles.profileimage}>
            {item.invited_by.profile_photo ? (
              <Avatar.Image
                style={styles.avatarimage}
                size={52}
                source={{
                  uri: OptimizeImage(item.invited_by.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                style={styles.avatarimage}
                size={52}
                source={require("@images/avatar.png")}
              />
            )}
            <View>
              <Text style={[styles.username, { marginLeft: 10 }]}>
                {Capitalize(item.invited_by.first_name)}{" "}
                {Capitalize(item.invited_by.last_name)}
              </Text>
              <Text style={[{ marginLeft: 10 }]}>Invite you to join group</Text>
            </View>
          </View>
        ) : (
          <View style={styles.profileimage}>
            {item.user.profile_photo ? (
              <Avatar.Image
                style={styles.avatarimage}
                size={52}
                source={{
                  uri: OptimizeImage(item.user.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                style={styles.avatarimage}
                size={52}
                source={require("@images/avatar.png")}
              />
            )}
            <View>
              <Text style={[styles.username, { marginLeft: 10 }]}>
                {Capitalize(item.user.first_name)}{" "}
                {Capitalize(item.user.last_name)}
              </Text>
              <Text style={[{ marginLeft: 10 }]}>Request to join group</Text>
            </View>
          </View>
        )}

        <View style={styles.profileimage}>
          <TouchableOpacity>
            <Image style={styles.avatarimage} source={{ uri: banner }} />
          </TouchableOpacity>
          <View>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.username}>{item.group.title}</Text>
                {/* <Text style={styles.graytext}>Member since September 2015</Text> */}
              </View>
            </View>
            {item.invited === 1 ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity style={styles.primarybtn} onPress={this._joinGroupInvite}>
                  <Text style={styles.primarybtntext}>
                    <Feather name="plus" size={16} color={colors.white} />
                    Join
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.graybtn}>
                  <Text style={styles.graybtntext}>Reject</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity style={styles.primarybtn} onPress={this._acceptGroupRequest}>
                  <Text style={styles.primarybtntext}>
                    <Feather name="plus" size={16} color={colors.white} />
                    Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.graybtn}>
                  <Text style={styles.graybtntext}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default InviteFriend;