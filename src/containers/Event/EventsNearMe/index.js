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
import { connect } from "react-redux";
import { Color } from "@common";

class EventsNearMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.eventsInterstedPopupRef = React.createRef();
    this.nearEventFlatlistRef = null;
    (this.per_page = 10), (this.page = 1);
  }

  convertDate = (date, time) => {
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

  componentDidMount() {
    let params = {};
    params["near"] = "*";
    this.props.fetchEvent(10, 1, params, "near");
  }

  _onRefresh = () => {
    this.page = 1;
    let params = {};
    params["near"] = "*";
    this.props.fetchEvent(this.per_page, this.page, params, "near");
  };

  _onEndReached = () => {
    console.log("end...");
    let params = [];
    params["near"] = "*";

    if (this.props.isFetching === false) {
      if (this.props.total > this.props.nearEventData.length) {
        this.page++;
        this.props.fetchEvent(this.per_page, this.page, params, "near");
      }
    }
  };

  openResponsePannel = (id) => {
    this.setState({
      eventID: id,
    });
    this.eventsInterstedPopupRef.current._invitationPopup();
  };

  saveResponse = (key, value) => {
    let responseData = Object.assign({}, this.props.responseData);

    responseData["interested"] = 0;
    responseData["going"] = 0;
    responseData["rejected"] = 0;
    responseData["event_id"] = this.state.eventID;
    responseData[key] = value;

    let formData = new FormData();

    for (var key in responseData) {
      formData.append(key, responseData[key]);
    }

    this.props.saveResponse(formData);
  };

  addResponse = (value) => {
    if (value === "interested") {
      this.saveResponse("interested", 1);
    } else if (value === "going") {
      this.saveResponse("going", 1);
    } else if (value === "rejected") {
      this.saveResponse("rejected", 1);
    }
  };

  submitResponse = () => {
    const { responseData } = this.props;
    this.props.submitInviteResponse(responseData, this.state.eventID);
  };

  renderItems = ({ item, index }) => {
    return (
      <EventComponent
        item={item}
        index={index}
        navigation={this.props.navigation}
        openResponsePannel={this.openResponsePannel}
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
    const { nearEventData } = this.props;
    return (
      <FlatList
        ref={(ref) => {
          this.goingEventFlatlistRef = ref;
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        data={nearEventData}
        onEndReachedThreshold={0.5}
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
    const { nearEventData, responseData } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.spacingXL} />
        {nearEventData ? (
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
    nearEventData:
      typeof state.Event.nearEventData !== "undefined"
        ? state.Event.nearEventData
        : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions: eventActions } = require("@redux/EventRedux");

  return {
    fetchEvent: (per_page, page, params = [], type) => {
      eventActions.fetchEvent(dispatch, per_page, page, params, type);
    },
    saveResponse: (data) => {
      dispatch(eventActions.saveResponse(data));
    },
    submitInviteResponse: (params = [], type) => {
      eventActions.submitInviteResponse(dispatch, params, type);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsNearMe);
