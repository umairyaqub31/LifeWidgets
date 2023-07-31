import * as React from "react";
import {
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Color } from "@common";
import { UserImage } from "@components";
import { Capitalize } from "@helpers";
import { Checkbox } from 'react-native-paper';
import * as RootNavigation from "../../common/NavigationService";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  toggleSelect = () => {
    let { item } = this.props;
    this.props.setSelectedItem(item);
  }

  navigateToChat = () => {
    let { item, type } = this.props;
    if(type && type==="navigate"){
        this.props._close();
        RootNavigation.navigate("Message", {
          connectyCubeId: item.cube_user_id,
          chatName: item.first_name,
          userImg: item.profile_photo,
        });
    }
  }

  render() {
    const { selected, item, type } = this.props;
    return (
        <View>
          <View style={styles.pendinginvitescontainer}>
          <UserImage item={item} style={styles.avatarimage} size={52} />
   
            <View style={styles.pendinginvitesnamecontainer}>
              <View>
                <Pressable onPress={this.navigateToChat}>
                  <Text style={styles.username} >
                    {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                    {item.verified && (
                      <AntDesign name="star" size={18} color={Color.gold} />
                    )}
                  </Text>
                </Pressable>
              </View>
              {!!type && type==="selection" &&
                <Checkbox.Android onPress={this.toggleSelect} color={Color.primary} status={selected.find((data) => data.id === item.id)?"checked":"unchecked"} />
              }
            </View>
          </View>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    selected:typeof state.Message.selectedItems !== "undefined"?state.Message.selectedItems:[],
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ChatRedux");
  return {
    ...ownProps,
    ...stateProps,
    setSelectedItem: (data) => {
        dispatch(actions.setSelectedItem(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Item);