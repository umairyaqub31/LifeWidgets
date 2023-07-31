import * as React from 'react';
import {  ActivityIndicator, Text, View, ScrollView,FlatList, RefreshControl ,TextInput} from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Divider } from 'react-native-paper';
import { InviteFriend } from '@components'
import { connect } from "react-redux";


class GroupInvite extends React.Component{

  constructor(props) {
    super(props);
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: () => <Text style={styles.headRightText}>Invites and Requests</Text>
    });
    this.props.groupInvitesRequest(this.per_page, this.page);
  }

  onRefresh = () => {
    this.page = 1;
    this.props.groupInvitesRequest(this.per_page, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.isInvitesFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Nothing found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isInvitesFetching) {
      if (this.props.totalInvites > this.props.invites.length) {
        this.page++;
        this.props.groupInvitesRequest(this.per_page, this.page);
      }
    }
  };

  renderItem = ({ item, index }) => {
    return <InviteFriend item={item} _acceptGroupRequest={this.acceptGroupRequest} _joinGroupInvite={this.joinGroupInvite} />
  };

  acceptGroupRequest = (group_id, user_id, id) => {
    this.props.acceptGroupRequest(group_id, user_id, id);
  }

  joinGroupInvite = (group_id, id) => {
    this.props.joinGroupInvite(group_id, id);
  }

  render(){
    const {isInvitesFetching, invites} = this.props;
    return(
      <View style={styles.container}>
      <View style={styles.scrolledview}>
          {/* <View style={{marginBottom:10}}>
            <Text style={styles.heading}>Invites and request</Text>
          </View> */}
          {/* <View style={[styles.roundedtextinputcontainer,styles.boxShadow]}>
            <Ionicons name="ios-search" size={24} color={colors.gray} />
            <TextInput
                style={styles.roundedtextinput}
                placeholder="Search for friends"
                placeholderTextColor= {colors.gray} 
            />
          </View> */}
          {/* <Divider style={styles.separator}/> */}
          <FlatList
          //contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          ListEmptyComponent={this.renderEmptyContainer}
          onEndReachedThreshold={0.5}
          data={invites}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isInvitesFetching ? (
              <ActivityIndicator color={colors.gray} style={{ margin: 10 }} />
            ) : null
          }
          renderItem={this.renderItem}
        />
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    invites: state.Group.invites,
    isInvitesFetching: state.Group.isInvitesFetching,
    totalInvites: state.Group.totalInvites,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    groupInvitesRequest: (per_page, page) => {
      actions.groupInvitesRequest(dispatch, per_page, page);
    },
    acceptGroupRequest: (group_id, user_id, id) => {
      actions.acceptGroupRequest(dispatch, group_id, user_id, id);
    },
    joinGroupInvite: (group_id, id) => {
      actions.joinGroupInvite(dispatch, group_id, id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(GroupInvite);

