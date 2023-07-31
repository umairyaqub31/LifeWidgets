import * as React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  TextInput,
} from "react-native";
import styles from "./styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";
import { Color } from "@common";
import Item from "./Item";
import Selected from "./Selected";
import CreateButton from "./CreateButton";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items:[]
    };
    this.modalizeRef = React.createRef();
    this.friendSearchEvent;
    this.flatListRef;
    this.per_page = 10;
    this.page = 1;
    this.params = [];

  }

  componentDidMount() {
    this.params["f"] = true;
    this.params["is_chat"] = true;
    this.props.fetchFriends(this.per_page, this.page, this.params);
  }

  open = () => {
    this.modalizeRef.current?.open();
  };

  close = () => {
    this.modalizeRef.current?.close();
  };

  renderItem = ({ item, index }) => {
    return <Item item={item} type={this.props.type} _close={this.close} />;
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchFriends(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
        if (
          this.props.total > this.props.friends.length
        ) {
          this.page++;
          this.props.fetchFriends(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Friends</Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = (text) => {
    clearTimeout(this.friendSearchEvent);
    this.friendSearchEvent = setTimeout(() => {
      this.params["s"] = text;
      this.page = 1;
      this.props.fetchFriends(this.per_page, this.page, this.params);
    }, 1000);
  };

  listHeaderComponent = () => {
    const { type } = this.props;

    return (
      <>
        <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
          <Ionicons name="ios-search" size={24} color={Color.gray} />
          <TextInput
            style={styles.roundedtextinput}
            placeholder="Search Friends"
            placeholderTextColor={Color.gray}
            onChangeText={this.onChangeText}
          />
          
        </View>
        {!!type && type==="selection" &&
        <Selected/>
        }
      </>
    );
  };

  flatListRender = () => {
    const { friends, type } = this.props;
      return (<>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.scrolledview}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }
        onEndReached={this.onEndReached}
        ListEmptyComponent={this.renderEmptyContainer}
        ListHeaderComponent={this.listHeaderComponent}
        onEndReachedThreshold={0.5}
        data={friends}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() =>
          this.props.isFetching ? (
            <ActivityIndicator style={{ margin: 10 }} />
          ) : null
        }
        renderItem={this.renderItem}
      />
      {!!type && type==="selection" &&
      <CreateButton navigate="GroupAdd" />
      }
      </>
      )
  }

  render() {
    const { type } = this.props;
    if(type==="selection"){
        return this.flatListRender();
    }
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={false} handlePosition="inside" modalTopOffset={30}>
          {this.flatListRender()}
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friends:state.People.friends,
    isFetching:state.People.isFriendFetching,
    total:state.People.totalFriends,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchFriends: (per_page, page, params = []) => {
        actions.fetchFriends(dispatch, per_page, page, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(FriendsList);