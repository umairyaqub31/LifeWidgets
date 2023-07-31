import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../config/color/color";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { EventInterestedPopup, EventComponent } from "@components";
import { Config, Color } from "@common";
import { connect } from "react-redux";

class PendingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.eventsInterstedPopupRef = React.createRef();
    this.pendingEventFlatlistRef = null;
    (this.per_page = 10), (this.page = 1);
  }

  _onRefresh = () => {
    this.page = 1;
    let params = {};
    params["pending"] = 1;
    this.props.fetchEvent(this.per_page, this.page, params, "pending");
  };

  _onEndReached = () => {
    let params = [];
    params["pending"] = 1;

    if (this.props.isFetching === false) {
      if (this.props.total > this.props.pendingData.length) {
        this.page++;
        this.props.fetchEvent(this.per_page, this.page, params, "pending");
      }
    }
  };

  componentDidMount() {
    let params = {};
    params["pending"] = 1;
    this.props.fetchEvent(10, 1, params, "pending");
  }

  convertDate = (d, t) => {
    var res = d.split(" ");
    var date = res[0];
    var time = res[1];

    var dayDate = new Date(date).getDate();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dayText = days[new Date(date).getDay()];

    var startTime = time;

    var month = new Date(date).getMonth() + 1; //Current Month
    var year = new Date(date).getFullYear();

    return (
      dayText +
      "," +
      " " +
      dayDate +
      "/" +
      year +
      " " +
      "." +
      " " +
      "At" +
      " " +
      startTime
    );
  };

  saveResponse = (key, value, id) => {
    let responseData = Object.assign({}, this.props.responseData);

    responseData["interested"] = 0;
    responseData["going"] = 0;
    responseData["rejected"] = 0;
    responseData["accepted"] = 0;
    responseData["cantAttend"] = 0;
    responseData["event_id"] = id;
    responseData[key] = value;

    let formData = new FormData();

    for (var key in responseData) {
      formData.append(key, responseData[key]);
    }
    this.props.saveResponse(formData);

    this.submitResponse(formData, id);
  };

  addResponse = (value, id) => {
    if (value === "accept") {
      this.saveResponse("accepted", 1, id);
    } else if (value === "reject") {
      this.saveResponse("rejected", 1, id);
    }
  };

  submitResponse = (data, id) => {
    this.props.submitInviteResponse(data, id);
  };

  renderItems = ({ item, index }) => {
    return (
      <EventComponent
        item={item}
        index={index}
        navigation={this.props.navigation}
        openResponsePannel={this.openResponsePannel}
        route={"pending"}
        addResponse={this.addResponse}
      />
    );
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.heading, { textAlign: "center", marginTop: 20 }]}
          >
            No Events found, please try updating your filters.
          </Text>
          <Text style={[styles.text, { marginTop: 20, textAlign: "center" }]}>
            Please create your own event and share to people.
          </Text>
        </View>
      );
    }
    return null;
  };

  renderEvent = () => {
    const { pendingData } = this.props;
    var size = 5;
    return (
      <FlatList
        ref={(ref) => {
          this.pendingEventFlatlistRef = ref;
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        data={pendingData}
        onEndReachedThreshold={0.5}
        initialNumToRender={50}
        onEndReached={this._onEndReached}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItems}
        disableVirtualization={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
        }
        ListFooterComponent={() =>
          this.props.isFetching ? (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: "center" }}
              size="large"
              color={Color.gray}
            />
          ) : null
        }
      />
    );
  };

  render() {
    const { pendingData, responseData } = this.props;
    return (
      <View style={styles.container}>
        {pendingData ? (
          <>{this.renderEvent()}</>
        ) : (
          <>{this.renderEmptyContainer()}</>
        )}

        <EventInterestedPopup
          ref={this.eventsInterstedPopupRef}
          addResponse={this.addResponse}
          resValue={responseData}
          submitResponse={this.submitResponse}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.Event.isFetching,
    total: state.Event.total,
    responseData: state.Event.responseData,
    pendingData:
      typeof state.Event.pendingData !== "undefined"
        ? state.Event.pendingData
        : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions: eventActions } = require("@redux/EventRedux");

  return {
    fetchEvent: (per_page, page, params = [], type) => {
      eventActions.fetchEvent(dispatch, per_page, page, params, type);
    },
    submitInviteResponse: (params = [], type) => {
      eventActions.submitInviteResponse(dispatch, params, type);
    },
    saveResponse: (data) => {
      dispatch(eventActions.saveResponse(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingEvents);
