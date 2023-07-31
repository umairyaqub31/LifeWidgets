import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { Divider } from "react-native-paper";
import { Pendinginvites, Peoplearound } from "@components";
import PeopleNearMe from "../PeopleNearMe";
import { connect } from "react-redux";
import color from "../../config/color/color";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
    this.params = [];
    (this.per_page = 10), (this.page = 1);
  }

  didFocus = () => {
    this.props.fetchPeoples(this.per_page, this.page, this.params);
  };

  _refresh = () => {
    this.props.fetchPeoples(this.per_page, this.page, this.params);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 50, marginTop: 10 }}>
          <ScrollView
            style={styles.horizontalscrollview}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[styles.customchip, { backgroundColor: color.primary }]}
              onPress={() => this.props.navigation.navigate("Nearme")}
            >
              <Text style={[styles.customchiptext, { color: color.white }]}>
                Near Me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("Suggestions")}
            >
              <Text style={styles.customchiptext}>Suggestions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("FriendsContacts")}
            >
              <Text style={styles.customchiptext}>Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("InvitedContacts")}
            >
              <Text style={styles.customchiptext}>Invited Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() =>
                this.props.navigation.navigate("PendingInvites", { type: "pr" })
              }
            >
              <Text style={styles.customchiptext}>Sent Invites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() =>
                this.props.navigation.navigate("PendingInvites", { type: "p" })
              }
            >
              <Text style={styles.customchiptext}>Pending Invites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("AllFriends")}
            >
              <Text style={styles.customchiptext}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.customchip}
              onPress={() =>
                this.props.navigation.navigate("FamilyAndRelatives")
              }
            >
              <Text style={styles.customchiptext}>Family & Relatives</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() =>
                this.props.navigation.navigate("BusinessAssociate")
              }
            >
              <Text style={styles.customchiptext}>Business Associate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("CoWorkers")}
            >
              <Text style={styles.customchiptext}>Co-Workers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("FriendsCustomers")}
            >
              <Text style={styles.customchiptext}>Customers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("FriendsFollowers")}
            >
              <Text style={styles.customchiptext}>Followers</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <PeopleNearMe navigation={this.props.navigation} />
        {/* <ScrollView
          style={styles.scrolledview}
          refreshControl={<RefreshControl onRefresh={this._refresh} />}
          showsVerticalScrollIndicator={false}
        >
          <Pendinginvites navigation={this.props.navigation} />

          <View style={styles.peoplearoundmescroll}>
              <Text style={styles.heading}>People Around Me</Text>
            <View style={{marginLeft:-15}}>
              <Peoplearound navigation={this.props.navigation} />
            </View>
          </View>
        </ScrollView> */}
      </View>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPeoples: (per_page, page, search, my) => {
      actions.fetchPeoples(dispatch, per_page, page, search, my);
    },
  };
};

export default connect(undefined, undefined, mergeProps)(Friends);
