import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { Divider } from "react-native-paper";
import {
  SavepostPopup,
  UserPost,
  SharePopup,
  ToolsPopup,
  GroupProfileHead
} from "@components";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { connect } from "react-redux";

class Groupdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.savePostSheetRef = React.createRef();
    this.toolsactionSheetRef = React.createRef();
    this.actionSheetRef = React.createRef();
    this.actionSheetRef2 = React.createRef();
  }

  componentDidMount(){
    let flag = false;
    const {item} = this.props.route.params;
    if(item.member && item.member.joined==1 && (item.is_post || item.owner)){
      flag = true;
    }
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text numberOfLines={1} style={styles.headertitleText}>{item.title}</Text>
        </View>
      ),
    });

    if(flag){
      this.props.navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={this.selectGroup}
              style={[styles.headRight, styles.chipOpcity]}
            >
              <AntDesign name="pluscircle" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }

  selectGroup = () => {
    const { item } = this.props.route.params;
    this.props.resetPostForm();
    this.props.setPostPrivacy({ name: item.title, id: item.id });
    this.props.setPostDestination({ name: "Group", id: 0 });
    this.props.setDefaultList(item.id);
    this.props.navigation.navigate("AddPost", { group: true });
  };

  toolsPopup = () => {
    this.toolsactionSheetRef.current.toolsPopup();
  };

  sharePopupButton = (id) => {
    this.actionSheetRef2.current.modalizeOpen(id);
  };

  savePostPopup = (id) => {
    this.actionSheetRef.current.SavepostPopup(id);
  };

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  render() {
    const {item} = this.props.route.params;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview} showsVerticalScrollIndicator={false}>
          <GroupProfileHead toolsPopup={this.toolsPopup} {...this.props} item={item}/>
          <Divider />
          {item.member && item.member.joined==1 &&
          <UserPost
            navigation={this.props.navigation}
            user_id={item.id}
            group_id={item.id}
            //listHeaderComponent={this.listHeaderComponent}
            _sharePopupButton={this.sharePopupButton}
            _savePostPopup={this.savePostPopup}
          />
          }
          <SavepostPopup ref={this.actionSheetRef} {...this.props} unsave={true} save_id={item.id} />
          <SharePopup ref={this.actionSheetRef2} {...this.props} />
        </ScrollView>
        <ToolsPopup item={item} ref={this.toolsactionSheetRef} navigation={this.props.navigation} />
      </View>
    );
  }
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    setPostDestination: (item) => {
      dispatch(actions.setPostDestination(item));
    },
    setDefaultList: (item) => {
      dispatch(actions.setDefaultList(item));
    },
    setPostPrivacy: (item) => {
      dispatch(actions.setPostPrivacy(item));
    },
    resetPostForm: (item) => {
      dispatch(actions.resetPostForm());
    },
  };
};
export default connect(
  undefined,
  undefined,
  mergeProps
)(Groupdetail);
