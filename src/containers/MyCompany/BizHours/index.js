import * as React from "react";
import {
  ActivityIndicator,
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
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Platform } from "react-native";

class BizHours extends React.Component {
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
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.validation}
        >
          <Text style={styles.headRightText}>Save</Text>
        </TouchableOpacity>
      ),
    });

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
    this.props.addCompanyForm(form);
    
  }

  validation = () => {

    var formData = new FormData();
    let form = this.props.form;
    Object.keys(form).map(function (key) {
      if (key === "services") {
        form[key].forEach((item, i) => {
          formData.append("services[" + i + "]", item);
        });
      } else if (key === "hours") {
        form[key].forEach((item, i) => {
          formData.append("hours[" + i + "]", JSON.stringify(item));
        });
      } else {
        formData.append(key, form[key]);
      }
    });
    formData.append("screen","bizHours");
    this.props.submitCompany(formData);
  }
  changeDay = (index) => {
    let form = Object.assign({}, this.props.form);
    let { hours } = form;
    hours[index] = { ...hours[index], is_open: !hours[index].is_open };
    form.hours = hours;
    this.props.addCompanyForm(form);
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
    this.props.addCompanyForm(form);
    
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
        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.7}
          visible={this.props.isProcessing}
          dialogAnimation={new ScaleAnimation()}
          onDismiss={() => {
            this.props.navigation.navigate("MyCompany");
          }}
          dialogTitle={
            <DialogTitle title={"Processing..."} hasTitleBar={false} />
          }
        >
          <DialogContent>
            <ActivityIndicator size="large" color={colors.primary} />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = ({ Company }) => {
  return {
    form: Company.form,
    isProcessing: Company.isProcessing,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCompanyForm: (data) => {
      dispatch(actions.addCompanyForm(data));
    },
    submitCompany: (data) => {
      actions.submitCompany(dispatch, data);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(BizHours);