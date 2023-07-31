import React, { Component } from "react";
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { EventInterestedPopup, EventComponent } from "@components";
import { Color } from "@common";

class EventsGoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.eventsInterstedPopupRef = React.createRef();
    this.goingEventFlatlistRef = null;
    (this.per_page = 10), (this.page = 1);
  }

  _onRefresh = () => {
    this.page = 1;
    let params = {};
    params["going"] = 1;
    this.props.fetchEvent(this.per_page, this.page, params, "going");
  };

  _onEndReached = () => {
    let params = [];
    params["going"] = 1;

    if (this.props.isFetching === false) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchEvent(this.per_page, this.page, params, "going");
      }
    }
  };

  componentDidMount() {
    let params = {};
    params["going"] = 1;
    this.props.fetchEvent(10, 1, params, "going");
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
    const { goingData } = this.props;
    console.log("gData......", goingData);
    return (
      <FlatList
        ref={(ref) => {
          this.goingEventFlatlistRef = ref;
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        data={goingData}
        onEndReachedThreshold={0.5}
        // onEndReached={this._onEndReached}
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
    const { goingData, responseData } = this.props;
    return (
      <View style={styles.container}>
        {goingData ? (
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
    goingData:
      typeof state.Event.goingData !== "undefined" ? state.Event.goingData : {},
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsGoing);
