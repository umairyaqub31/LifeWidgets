import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import styles from "./styles";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar, Divider, RadioButton } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Capitalize } from "@helpers";
import FontFamily from "../../config/fonts/fontfamily";
import { UserImage } from "@components";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class ContactPopup extends React.Component {
  constructor(props) {
    super(props);
    this.modalizeRef = React.createRef();
  }

  open = () => {
    this.modalizeRef.current?.open();
  };

  close = () => {
    this.modalizeRef.current?.close();
  };

  checkedType = (id) => {
    let category_ids = this.props.item.categories_ids;
    const index = category_ids.find((item) => item === id);
    console.log(index);
    if (index) {
      category_ids = category_ids.filter((item) => item !== id);
    } else {
      category_ids.push(id);
    }
    console.log(category_ids);
    this.props.addFriendToType(category_ids);
  };

  cancelFriendRequest = () => {
    this.props.cancelFriendRequest(this.props.item.id);
    this.modalizeRef.current?.close();
  };

  render() {
    const { item } = this.props;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={[styles.scrolledView]}>
              <TouchableOpacity style={styles.pendinginvitescontainer}>
                <UserImage
                  item={this.props.item}
                  style={styles.avatarimage}
                  size={52}
                />
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <Text style={styles.username}>
                      {Capitalize(this.props.item.first_name)}{" "}
                      {Capitalize(this.props.item.last_name)}
                    </Text>
                    {this.props.item.since_friend && (
                      <Text style={styles.graytext}>
                        Friends since {this.props.item.since_friend}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              {typeof item.request !== "undefined"
                ? !item.is_friend &&
                  item.request.is_send_request === false &&
                  item.request.is_entry && (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={[styles.primaryBtn, { margin: 5 }]}
                        onPress={() => this.props.acceptFriendRequest(item.id)}
                      >
                        <Text style={styles.primaryBtnText}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.primaryBtn,
                          { backgroundColor: colors.lightGray, margin: 5 },
                        ]}
                        onPress={() => this.props.cancelFriendRequest(item.id)}
                      >
                        <Text
                          style={[
                            styles.primaryBtnText,
                            { color: colors.black },
                          ]}
                        >
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                : null}
              {typeof item.request !== "undefined"
                ? !item.is_friend &&
                  !item.request.is_entry && (
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={() => this.props.sendFriendRequest(item.id)}
                    >
                      <Text style={styles.primaryBtnText}>Add Friend</Text>
                    </TouchableOpacity>
                  )
                : null}
              {typeof item.request !== "undefined"
                ? !item.is_friend &&
                  item.request.is_send_request &&
                  item.request.is_entry && (
                    <TouchableOpacity
                      style={[
                        styles.primaryBtn,
                        { backgroundColor: colors.lightGray },
                      ]}
                      onPress={() => this.props.cancelFriendRequest(item.id)}
                    >
                      <Text
                        style={[styles.primaryBtnText, { color: colors.black }]}
                      >
                        Cancel friend request
                      </Text>
                    </TouchableOpacity>
                  )
                : null}
              {this.props.item.is_friend && (
                <>
                  <Divider style={{ marginTop: 13 }} />
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={this.cancelFriendRequest}
                  >
                    <AntDesign name="deleteuser" size={28} color="red" />
                    <View style={styles.pendinginvitesnamecontainer}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.modallist, { color: "red" }]}>
                          Unfriend {Capitalize(this.props.item.first_name)}
                        </Text>
                        <Text style={styles.graytext}>
                          Remove {Capitalize(this.props.item.first_name)} as a
                          friend
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

export default ContactPopup;