import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SIZE_SCREEN, BTN_TYPE } from "../../helpers/constants";
import ChatService from "../../services/chat-service";
import * as DocumentPicker from "expo-document-picker";
import { connect } from "react-redux";
import { FAB } from "react-native-paper";
import { SelectedParticipant } from "@components";

class GroupAdd extends Component {
  state = {
    keyword: "",
    isPickImage: null,
    isLoader: false,
  };

  renderParticipant = (item) => {
    return (
      <View style={styles.participant} key={item.id}>
        <View style={{ paddingLeft: 10 }}>
          {item.avatar != null ? (
            <Image
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={{ uri: item.avatar }}
            />
          ) : (
            <Image
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../../../assets/images/avatar.png")}
            />
          )}
        </View>
        <Text numberOfLines={2} style={{ textAlign: "center" }}>
          {item.full_name}
        </Text>
      </View>
    );
  };

  createDialog = () => {
    const users = this.props.selected;
    let str = this.state.keyword.trim();
    if (str.length < 3) {
      return alert("Please Enter a group name");
    }
    this.setState({ isLoader: true });
    const occupants_ids = users.map((elem) => {
      return elem.cube_user_id;
    });
    console.log(this.state.keyword, "chatname");
    ChatService.createPublicDialog(
      occupants_ids,
      str,
      this.state.isPickImage
    ).then((newDialog) => {
      this.setState({ isLoader: false });
      this.props.clearSelectedItem();
      ToastAndroid.show("Group Created Successfully !", ToastAndroid.SHORT);
      this.props.navigation.navigate("ChatUsers");
    });
  };

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    console.log("documentresult", result);
    var documentData = {
      name: result.name,
      size: result.size,
      type: "image/png",
      uri: result.uri,
    };
    this.setState({ isPickImage: documentData });
    console.log("documentresult", result);
    return documentData;
  };
  onPickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      this.setState({ isPickImage: image });
    });
  };

  updateSearch = (keyword) => this.setState({ keyword });

  render() {
    const { isPickImage, isLoader } = this.state;
    return (
      <View style={styles.container}>
        {isLoader ? (
          <ActivityIndicator
            size="large"
            animating={this.state.isLoader}
            color="#bc2b78"
            size="large"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 80,
            }}
          />
        ) : (
          <View>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={this.pickDocument}
                style={styles.picker}
              >
                {isPickImage ? (
                  <Image
                    style={styles.imgPicker}
                    source={{ uri: isPickImage.uri }}
                  />
                ) : (
                  <View style={styles.iconPicker}>
                    <Icon name="local-see" size={50} color="#48A6E3" />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.description}>
                <TextInput
                  style={styles.searchInput}
                  autoCapitalize="none"
                  placeholder="Group name..."
                  returnKeyType="search"
                  onChangeText={this.updateSearch}
                  placeholderTextColor="grey"
                  value={this.state.search}
                  maxLength={255}
                />
                <Text style={styles.descriptionText}>
                  Please provide a group subject and optional group icon
                </Text>
              </View>
            </View>
            <View style={styles.participantsContainer}>
              <SelectedParticipant is_hide={true} />
            </View>
          </View>
        )}

        <FAB
          style={{
            position: "absolute",
            margin: 30,
            right: 10,
            bottom: 0,
            backgroundColor: "#0d96ff",
          }}
          large
          icon="check"
          onPress={this.createDialog}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  participantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  participant: {
    width: 72,
    padding: 5,
    height: 100,
  },
  searchInput: {
    fontSize: 18,
    color: "black",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  picker: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  iconPicker: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#48A6E3",
    justifyContent: "center",
    alignItems: "center",
  },
  imgPicker: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  description: {
    width: SIZE_SCREEN.width - 110,
  },
  descriptionText: {
    paddingVertical: 5,
    color: "grey",
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    selected:
      typeof state.Message.selectedItems !== "undefined"
        ? state.Message.selectedItems
        : [],
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ChatRedux");
  return {
    ...ownProps,
    ...stateProps,
    clearSelectedItem: () => {
      dispatch(actions.clearSelectedItem());
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(GroupAdd);