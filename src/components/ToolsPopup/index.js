import * as React from "react";
import { Alert, Text, TouchableOpacity, View, Dimensions } from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Divider } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";
import {LifeWidget} from "@common";

class ToolsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalizeRef = React.createRef();
  }

  toolsPopup = () => {
    this.modalizeRef.current?.open();
  };

  followingToggle = () => {
    this.props.followingToggle(this.props.item.id);
  };

  reportScreen = () => {
    this.modalizeRef.current?.close();
    this.props.navigation.navigate("Report", { item: this.props.item });
  };

  leaveGroup = () => {
    Alert.alert(
      "Leave group",
      "Are you sure you want to leave this group.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Leave group", onPress: () => this.processLeave() }
      ]
    );
  };

  processLeave = async () => {
    this.modalizeRef.current?.close();
    const json = await LifeWidget.leaveGroup(this.props.item.id);
    this.props.navigation.goBack();
  }

  deleteGroup = () => {
    Alert.alert(
      "Delete group",
      "Are you sure you want to delete this group.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", style: "destructive", onPress: () => this.processDelete() }
      ]
    );
  }

  processDelete = () => {
    this.modalizeRef.current?.close();
    this.props.deleteGroup(this.props.item.id);
    this.props.navigation.goBack();
  }

  render() {
    const { item } = this.props;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              <View style={styles.popupclosehead}>
                <Text style={styles.text}>Tools</Text>
              </View>
              <Divider style={styles.separator} />
              <View style={styles.modalgridcontainer}>
                <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.followingToggle}
                >
                  <View
                    style={[
                      styles.chipiconopacity,
                      styles.activechipiconopacity,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="checkbox-multiple-marked"
                      size={24}
                      color={colors.white}
                    />
                  </View>
                  <Text style={[styles.text, { color: colors.primary }]}>
                    {item.following ? "Unfollow" : "Following"}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.modallistcontainer}>
                        <View style={styles.chipiconopacity}>
                          <FontAwesome name="share" size={24} color={colors.black} />
                        </View>
                        <Text style={styles.text}>Share</Text>
                    </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.reportScreen}
                >
                  <View style={styles.chipiconopacity}>
                    <Ionicons
                      name="ios-warning"
                      size={24}
                      color={colors.black}
                    />
                  </View>
                  <Text style={styles.text}>Report</Text>
                </TouchableOpacity>
                {item.owner==false &&
                <TouchableOpacity style={styles.modallistcontainer} onPress={this.leaveGroup}>
                  <View style={styles.chipiconopacity}>
                    <Ionicons
                      name="ios-log-out"
                      size={24}
                      color={colors.black}
                    />
                  </View>
                  <Text style={styles.text}>Leave Group</Text>
                </TouchableOpacity>
                }
                {item.owner &&
                <TouchableOpacity style={styles.modallistcontainer} onPress={this.deleteGroup}>
                  <View style={styles.chipiconopacity}>
                    <Ionicons
                      name="trash"
                      size={24}
                      color={colors.black}
                    />
                  </View>
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    owners: state.Group.owners,
    joins: state.Group.joins,
    data: state.Group.data,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    followingToggle: (group_id) => {
      actions.followingToggle(dispatch, group_id);
    },
    leaveGroup: (group_id) => {
      actions.leaveGroup(dispatch, group_id);
    },
    deleteGroup: (group_id) => {
      actions.deleteGroup(dispatch, group_id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(ToolsPopup);