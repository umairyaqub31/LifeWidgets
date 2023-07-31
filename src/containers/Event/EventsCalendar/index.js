import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { Calendar as RCalendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { connect } from "react-redux";
import color from "../../../config/color/color";

const createCalendarIds = require("./createCalenderConfig");

class EventsCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      Marked: false,
      loopDates: [],
      selectedDayDate: "",
      selectedDay: "",
      selectedDateEvents: [],
    };
  }
  componentDidMount() {
    const { data } = this.props;
    let dateData = [];
    if (data !== undefined) {
      data.map((i) => {
        var res = i.start_date.split(" ");
        var d = res[0];

        dateData.push({
          start_date: d,
          id: i.id,
        });
      });
    }

    var obj1 = dateData.reduce(
      (c, v) =>
        Object.assign(c, {
          [v.start_date]: {
            selected: true,
            marked: true,
            dotColor: "green",
            EventID: v.id,
          },
        }),
      {}
    );
    this.setState({ loopDates: obj1 });
  }
  componentWillUnmount() {
    // this.focusListener();
  }

  // particular date Click
  onDayPress = async (day) => {
    const { data } = this.props;

    let temp = [];
    data.map((i) => {
      var res = i.start_date.split(" ");
      var d = res[0];

      if (d == day.dateString) {
        temp.push(i);
      }
    });

    if (temp.length > 0) {
      this.setState({
        selectedDateEvents: temp,
      });
    } else {
      this.setState({
        selectedDateEvents: [],
      });
    }

    let params = {};
    params["sd"] = day.dateString;
    this.props.fetchEvent(10, 1, params, "calendar");

    this.setState({ selected: day.dateString });

    var date = new Date(day.timestamp).getDate();
    this.setState({
      selectedDayDate: date,
    });

    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = days[new Date(day.timestamp).getDay()];
    var dayFirstThree = d.substring(0, 3);
    this.setState({
      selectedDay: dayFirstThree,
    });
  };

  render() {
    const { selectedDateEvents } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <RCalendar
              testID={createCalendarIds.calendars.FIRST}
              current={new Date()}
              style={[styles.calendar, styles.boxShadow]}
              onDayPress={(day) => this.onDayPress(day)}
              markedDates={{
                [this.state.selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  EventID: 0,
                  // selectedColor: '#466A8F'
                },
                ...this.state.loopDates,
              }}
            />
          </View>
          {selectedDateEvents !== undefined && selectedDateEvents.length > 0 ? (
            <>
              <View style={styles.listInline}>
                <View style={styles.eventDayContainer}>
                  <Text style={styles.eventDay}>{this.state.selectedDay}</Text>
                  <Text style={styles.eventDate}>
                    {this.state.selectedDayDate}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  {selectedDateEvents.map((e) => (
                    <TouchableOpacity
                      style={[styles.boxShadow, styles.roundedContainer]}
                      onPress={() =>
                        this.props.navigation.navigate("EventsDetails", {
                          item: e,
                        })
                      }
                    >
                      <Text
                        style={{
                          fontFamily: FontFamily.Medium,
                          color: colors.white,
                        }}
                      >
                        {e.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.listInline}>
              <TouchableOpacity
                style={[
                  styles.boxShadow,
                  styles.roundedContainer,
                  { backgroundColor: color.gray },
                ]}
              >
                <Text
                  style={{ fontFamily: FontFamily.Medium, color: colors.white }}
                >
                  No Event
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addEventPlusBtn}
          onPress={() => this.props.navigation.navigate("CreateCalenderEvent")}
        >
          <AntDesign name="pluscircle" size={54} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: typeof state.Event.data !== "undefined" ? state.Event.data : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions: eventActions } = require("@redux/EventRedux");

  return {
    fetchEvent: (per_page, page, params = [], type) => {
      eventActions.fetchEvent(dispatch, per_page, page, params, type);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsCalendar);
