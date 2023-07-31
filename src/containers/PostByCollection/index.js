import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Divider } from "react-native-paper";
import {
  UserProfileHeader,
  SavepostPopup,
  UserPost,
  SharePopup,
  FbGrid,
} from "@components";
import { Avatar } from "react-native-paper";
import { Config } from "@common";
import { Capitalize, OptimizeImage } from "@helpers";
import moment from "moment";
import { connect } from "react-redux";

class PostByCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.actionSheetRef = React.createRef();
    this.actionSheetRef2 = React.createRef();
  }

  componentDidMount() {
    const { item } = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>{Capitalize(item.title)}</Text>
        </View>
      ),
    });
    this.props.uploadProfile();
  }

  sharePopupButton = (id) => {
    this.actionSheetRef2.current.modalizeOpen(id);
  };

  savePostPopup = (id) => {
    this.actionSheetRef.current.SavepostPopup(id);
  };

  onPress = (url, index, event) => {
    // url and index of the image you have clicked alongwith onPress event.
  };

  render() {
    const { item } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <UserPost
            navigation={this.props.navigation}
            user_id={item.id}
            save_id={item.id}
            _sharePopupButton={this.sharePopupButton}
            _savePostPopup={this.savePostPopup}
          />
          <SavepostPopup ref={this.actionSheetRef} {...this.props} unsave={true} save_id={item.id} />
          <SharePopup ref={this.actionSheetRef2} {...this.props} />
        </View>
      </View>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    uploadProfile: (per_page, page) => {
      actions.uploadProfile(dispatch, per_page, page);
    },
    allUserMedia: (per_page, page, user_id) => {
      actions.allUserMedia(dispatch, per_page, page, user_id);
    },
  };
};
export default connect(undefined, undefined, mergeProps)(PostByCollection);