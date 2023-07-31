import * as React from "react";
import {
  Text,
  Platform,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Color } from "@common";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { connect } from "react-redux";
import {PickerStack} from "@components";

const X = Dimensions.get("window").width;

class FeedTimeOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: new Date(),
      disabled: true,
      duration: null,
      minutes: 0,
      hours: 0,
      days: 0,
    };
  }
   makeNumberRange(max) {
     return Array.from(Array(max).keys())
   }

   get minutesRange() {
     return this.makeNumberRange(60)
   }

   get hoursRange() {
     return this.makeNumberRange(24)
   }

   get daysRange() {
     return this.makeNumberRange(365)
   }

   handleValueChange = (field, val) => {
    this.setState({[field]: val}, ()=>this.setSelectedValue(this.state.days, this.state.hours, this.state.minutes, ));
  }
  setDate = (event, date) => {
    if (Platform.OS === "android" && event.type === "dismissed") {
      this.setState({ show: false });
      return;
    }
    var now = moment(new Date());
    var end = moment(date);
    moment(startdate).add(2, "hours");
    var duration = moment.duration(end.diff(now));
    var asSeconds = duration.asSeconds();
    if (asSeconds > 0) {
      if (Platform.OS === "android") {
        this.setState({
          show: false,
          date: date,
          disabled: false,
          duration: duration,
        });
      } else {
        this.setState({ date: date, disabled: false, duration: duration });
      }
    } else {
      if (Platform.OS === "android") {
        this.setState({
          show: false,
          date: date,
          disabled: true,
          duration: duration,
        });
      } else {
        this.setState({ date: date, disabled: true, duration: duration });
      }
    }
  };

  addBreak = () => {
    this.props.addBreak(this.state.date);
  };

  setSelectedValue = (days, hours, minutes) => {
    if (hours > 0 || days > 0 || minutes > 0) {
      var now = moment(new Date());
      var end = moment(new Date()).add(days, "days").add(hours, "hours").add(minutes, "minutes");
      var duration = moment.duration(end.diff(now));
      var asSeconds = duration.asSeconds();
      if (asSeconds > 0) {
        if (Platform.OS === "android") {
          this.setState({
            selectedValue: hours,
            date: end,
            disabled: false,
            duration: duration,
          });
        } else {
          this.setState({
            selectedValue: hours,
            date: end,
            disabled: false,
            duration: duration,
          });
        }
      } else {
        if (Platform.OS === "android") {
          this.setState({
            selectedValue: hours,
            date: end,
            disabled: true,
            duration: duration,
          });
        } else {
          this.setState({
            selectedValue: hours,
            date: end,
            disabled: true,
            duration: duration,
          });
        }
      }
    }
  };

  renderHours = () => {
    let hours = [1,2];
    return hours;
  };

  renderTime = () => {
    let time = [];
    for(let i=1;i<47.99;i++){
      time.push({label:i/2,value:i/2});
    }
    return time;
  }

  render() {
    const { disabled, duration, minutes, hours, days } = this.state;
    let label = "";
    return (
      <View style={{ width: X }}>
        <View style={{ flex: 1, margin: 20 }}>
          <View style={styles.setFeedTime}>
            <Text style={styles.heading}>
              You are all caught up, now let’s get back to work!
            </Text>
            <View style={styles.spacing} />
            <Text style={styles.heading}>How much willpower do you have?</Text>
            <View style={styles.spacing} />
            <Text style={styles.heading}>Don't let me back for: </Text>
            <View style={styles.list}>
              <Text>
                {!!duration && typeof duration === "object"
                  ? duration.days() +
                    "d : " +
                    duration.hours() +
                    "h : " +
                    duration.minutes() +
                    "m"
                  : ""}
              </Text>
            </View>
            <View style={styles.pickerContainer}>
                <PickerStack
                     label="Days"
                     value={days}
                     onValueChange={(val) => this.handleValueChange('days', val)}
                     options={this.daysRange}
                   />
               <PickerStack
                    label="Hours"
                    value={hours}
                    onValueChange={(val) => this.handleValueChange('hours', val)}
                    options={this.hoursRange}
                  />
              <PickerStack
                       label="Mins"
                       value={minutes}
                       onValueChange={(val) => this.handleValueChange('minutes', val)}
                       options={this.minutesRange}
                     />
            </View>

          </View>
          {Platform.OS === "ios" ? (
            <Dialog
              visible={this.state.show}
              width={0.8}
              onTouchOutside={() => {
                this.setState({ show: false });
              }}
            >
              <DialogContent>
                <RNDateTimePicker
                  style={{
                    shadowColor: "#000000",
                    shadowRadius: 0,
                    shadowOpacity: 1,
                    shadowOffset: { height: 0, width: 0 },
                  }}
                  textColor={Color.black}
                  value={this.state.date}
                  mode="time"
                  minimumDate={new Date()}
                  is24Hour={true}
                  display="spinner"
                  onChange={this.setDate}
                />
              </DialogContent>
            </Dialog>
          ) : this.state.show ? (
            <RNDateTimePicker
              value={this.state.date}
              mode="time"
              is24Hour={true}
              minimumDate={new Date()}
              display="spinner"
              onChange={this.setDate}
            />
          ) : null}
          <TouchableOpacity
            disabled={disabled}
            style={[
              styles.primaryBtn,
              disabled ? { backgroundColor: Color.gray } : {},
            ]}
            onPress={this.addBreak}
          >
            <Text style={styles.primaryBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    addBreak: (data) => {
      dispatch(actions.addBreak(data));
    },
  };
};
export default connect(undefined, undefined, mergeProps)(FeedTimeOut);
