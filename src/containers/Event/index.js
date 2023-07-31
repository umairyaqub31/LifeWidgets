import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../config/color/color";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { EventInterestedPopup } from "@components";
import { connect } from "react-redux";
import { Config } from "@common";
import { EventComponent } from "@components";
import { Color } from "@common";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      eventID: null,
    };
    this.eventsInterstedPopupRef = React.createRef();
    this.eventFlatlistRef = null;
    (this.per_page = 10), (this.page = 1);
  }

  componentDidMount() {
    let params = [];
    params["privacy"] = "public";
    this.props.fetchEvent(10, 1, params, "all");
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

  _onRefresh = () => {
    this.page = 1;
    let params = [];
    params["privacy"] = "public";
    this.props.fetchEvent(this.per_page, this.page, params, "all");
  };

  _onEndReached = () => {
    let params = [];
    params["privacy"] = "public";

    if (this.props.isFetching === false) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchEvent(this.per_page, this.page, params, "all");
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

  renderEvent = () => {
    const { data } = this.props;
    var size = 5;

    return (
      <FlatList
        ref={(ref) => {
          this.eventFlatlistRef = ref;
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        data={data}
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

  render() {
    const { responseData, data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.spacingXL} />
        <View style={styles.barSearchChips}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("EventsNearMe")}
            >
              <Text style={styles.customchiptext}>Near Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("EventsCalendar")}
            >
              <Text style={styles.customchiptext}>Calendar</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.customchip} onPress={()=> this.props.navigation.navigate('AllEvents')}>
                                        <Text style={styles.customchiptext}>Invited</Text>
                                    </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("EventsGoing")}
            >
              <Text style={styles.customchiptext}>Going</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("PendingEvents")}
            >
              <Text style={styles.customchiptext}>Pending</Text>
              {this.props.pendingData.length > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {this.props.pendingData.length}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("EventsInterested")}
            >
              <Text style={styles.customchiptext}>Interested In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customchip}
              onPress={() => this.props.navigation.navigate("MyEvent")}
            >
              <Text style={styles.customchiptext}>My Events</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.separator} />
        </View>

        {data ? <>{this.renderEvent()}</> : <>{this.renderEmptyContainer()}</>}

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
    data: typeof state.Event.data !== "undefined" ? state.Event.data : [],
    isFetching: state.Event.isFetching,
    responseData: state.Event.responseData,
    total: state.Event.total,
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
export default connect(mapStateToProps, mapDispatchToProps)(Events);
