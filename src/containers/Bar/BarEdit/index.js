import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import styles from "./styles";
import { Divider, Checkbox } from "react-native-paper";
import colors from "../../../config/color/color";
import { connect } from "react-redux";
import moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Platform } from "react-native";

class BarEidt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsList: [],
      date: new Date(),
      mode: "time",
      show: false,
      visible: false,
      index: 0,
      type: "from",
    };
  }

  componentDidMount() {
    let form = Object.assign({}, this.props.form);
    if (form.hours && form.hours.length === 7) {
      return false;
    }
    form.hours = [];
    form.hours[0] = {
      day: "Monday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[1] = {
      day: "Tuesday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[2] = {
      day: "Wednesday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[3] = {
      day: "Thursday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[4] = {
      day: "Friday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[5] = {
      day: "Saturday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    form.hours[6] = {
      day: "Sunday",
      open_time: new Date(),
      close_time: new Date(),
      is_open: true,
    };
    this.props.addBarForm(form);
    
  }

  changeDay = (index) => {
    let form = Object.assign({}, this.props.form);
    let { hours } = form;
    hours[index] = { ...hours[index], is_open: !hours[index].is_open };
    form.hours = hours;
    this.props.addBarForm(form);
  };

  fromTimePicker = (index, from) => {
    this.setState({ show: true, index: index, type: "from", date: from });
  };

  toTimePicker = (index, to) => {
    this.setState({ show: true, index: index, type: "to", date: to });
  };

  setDate = (event, date) => {
    if(Platform.OS==="android" && event.type==="dismissed"){
      this.setState({show:false});
      return;
    }
    date = date || this.state.date;
    let { index, type } = this.state;
    let form = Object.assign({}, this.props.form);
    let { hours } = form;
    if (type === "from") {
      hours[index] = { ...hours[index], open_time: date };
    } else {
      hours[index] = { ...hours[index], close_time: date };
    }
    form.hours = hours;
    this.props.addBarForm(form);
    
    console.log(form);
    if(Platform.OS==="android"){
      this.setState({show:false, date:date});
    } else {
      this.setState({ date });
    }
  };

  render() {
    const timeChecked = !this.props.timeChecked ? "checked" : "unchecked";
    const { date, mode } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={styles.ListPanel}>
            {/* <View style={styles.ListPanelHeader}>
              <Text style={styles.heading}>CHOOSE TIME</Text>
            </View> */}
            <View style={styles.ListPanelBody}>
              {this.props.form.hours &&
                this.props.form.hours.map((item, key) => (
                  <View key={key}>
                    <View style={[styles.listContainer, styles.noBorder]}>
                      <Checkbox.Android
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        status={item.is_open ? "checked" : "unchecked"}
                        onPress={() => this.changeDay(key)}
                      />
                      <Text style={styles.titleBold}>{item.day}</Text>
                    </View>

                    
                      {item.is_open ? (
                        <View style={[styles.timeListContainer]}>
                          <TouchableOpacity
                            style={[styles.timeList]}
                            onPress={() => this.fromTimePicker(key, item.open_time)}
                          >
                            <Text style={styles.textGray}>From: </Text>
                            <Text>
                              {moment(item.open_time).format('hh:mm A')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.timeList}
                            onPress={() => this.toTimePicker(key, item.close_time)}
                          >
                            <Text style={styles.textGray}>To: </Text>
                            <Text>
                              {moment(item.close_time).format('hh:mm A')}
                            </Text>
                          </TouchableOpacity>
                          </View>
                      ) : (
                        <Text style={{ color: "red", marginLeft:10 }}>Closed</Text>
                      )}
                    
                  </View>
                ))}

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
                      style={{shadowColor: '#000000', shadowRadius: 0, shadowOpacity: 1, shadowOffset: { height: 0, width: 0 } }}
                      textColor={colors.black}
                      value={new Date(date)}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={this.setDate}
                    />
                  </DialogContent>
                </Dialog>
              ) : this.state.show ? (
                <RNDateTimePicker
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="spinner"
                  onChange={this.setDate}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Bar }) => {
  return {
    form: Bar.form,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    addBarForm: (data) => {
      dispatch(actions.addBarForm(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(BarEidt);