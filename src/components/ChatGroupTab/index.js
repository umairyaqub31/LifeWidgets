import * as React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  TextInput,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Item from "./Item";
import { connect } from "react-redux";

class ChatGroupTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.per_page = 1000;
  }


  getUserId = (data) => {
    return data.occupants_ids.filter(
      (val) => val != this.props.user.cube_user_id
    )[0];
  };

  _onChangeText = (val) => {
    const text = val.toLowerCase();
    this.setState({ text });
  };

  deleteDialog = async (dialogId) => {
    this.props.deleteDialog(dialogId, "groupChatDialog");
  };

  _onRefresh = () => {
    this.props.fetchData(this.per_page);
  };

  _renderHeaderComponent = () => {
    return (
      <View
        style={[
          styles.roundedtextinputcontainer,
          styles.boxShadow,
          { marginBottom: 15 },
        ]}
      >
        <Ionicons name="ios-search" size={24} color={colors.gray} />
        <TextInput
          style={styles.roundedtextinput}
          placeholder="Search"
          placeholderTextColor={colors.gray}
          onChangeText={this._onChangeText}
          value={this.state.text}
        />
        {!!this.state.text &&
        <TouchableOpacity onPress={()=>this.setState({text:""})}>
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
        }
      </View>
      
    );
  };

  _renderFooterComponent = () => {
    return null;
  };

  _renderEmptyContainer = () => {
    return (
      <View style={{ marginTop: 10, justifyContent:"center", alignItems:"center" }}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          No group history
        </Text>
      </View>
    );
  };

  _renderItem = ({ item, index }) => (<Item _deleteDialog={this.deleteDialog} index={index} item={item} />);

  render() {
    const { text } = this.state;
    const { data } = this.props;
    const history =
      text.length > 1
        ? data.filter((item) => item.name.toLowerCase().includes(text))
        : data;
    return (
      <>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.scrolledview}>
            {this._renderHeaderComponent()}
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh}
                />
              }
              ListEmptyComponent={this._renderEmptyContainer}
              data={history}
              ListFooterComponent={this._renderFooterComponent}
              renderItem={this._renderItem}
            />
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data:
      typeof state.Message.groupChatDialog !== "undefined"
        ? state.Message.groupChatDialog
        : [],
    user: state.User.user,
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ChatRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchData: (per_page) => {
      actions.fetchGroupChatDialog(dispatch, per_page);
    },
    deleteDialog:(dialog, type)=>{
      actions.deleteDialog(dispatch, dialog, type);
    }
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(ChatGroupTab);