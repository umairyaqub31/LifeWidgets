import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import { Divider, Avatar } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../../config/color/color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { GeneralPrivacyStatus } from "@components";
import { PrivacyStatusIcon, OptimizeImage, Capitalize } from "@helpers";
import { connect } from "react-redux";

class RelationshipInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2016-05-15",
      hand: "right",
      visible: false,
      person: {},
    };
    this.privacyactionSheetRef = React.createRef();
    this.delayTyping;
  }

  setProfileData = (key, value) => {
    let form = {};
    form[key] = value;
    this.props.userProfileUpdate(form);
    clearTimeout(this.delayTyping);
    this.delayTyping = setTimeout(() => {
      this.props.sendRequestToServer(form);
    }, 2000);
  };

  onConfirm = (date) => {
    this.setProfileData("anniversary_date", date.toISOString());
    this.setState({ visible: false });
  };

  submitPerson = (person) => {
    if(Object.keys(person).length>0){
      this.setProfileData("relationship", person);
      this.setProfileData("marital_status", "in_relationship");
      this.setProfileData("in_relationship_id", person.id);
      
    }
    
  };

  render() {
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={styles.ListPanel}>
            <View style={styles.ListPanelHeader}>
              <Text style={styles.heading}>RELATIONSHIP</Text>
              <TouchableOpacity
                style={[styles.chipOpacity, styles.boxShadow]}
                onPress={() =>
                  this.privacyactionSheetRef.current.modalizeOpen(
                    "marital_status_privacy",
                    data.marital_status_privacy
                  )
                }
              >
                {PrivacyStatusIcon(data.marital_status_privacy)}
              </TouchableOpacity>
            </View>
            <View style={styles.ListPanelBody}>
              <View style={styles.listContainer}>
                <Picker
                  selectedValue={data.marital_status}
                  onValueChange={(text) => {
                    if (text === "in_relationship" && Object.keys(Object.assign({}, data.relationship)).length === 0) {
                      this.props.navigation.navigate("RelationshipUser", {
                        tags: Object.assign({}, data.relationship),
                        submitPerson: this.submitPerson,
                      });
                      return;
                    }
                    this.setProfileData("marital_status", text);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Single" value="single" />
                  <Picker.Item label="Married" value="married" />
                  <Picker.Item label="Engaged" value="engaged" />
                  <Picker.Item label="Flirt Mode" value="flirt" />
                  <Picker.Item label="Divorced" value="divorced" />
                  <Picker.Item label="Separated" value="separated" />
                  <Picker.Item
                    label="In relationship"
                    value="in_relationship"
                  />
                  <Picker.Item label="Happy" value="happy" />
                  <Picker.Item label="Sad" value="sad" />
                  <Picker.Item label="Widowed" value="widowed" />
                </Picker>
              </View>
              {!!data.marital_status && data.marital_status === "married" && (
                <>
                  <View style={styles.birthdayList}>
                    <Text style={styles.titleBold}>Anniversary:</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({ visible: true })}
                      style={[
                        styles.DatePicker,
                        styles.boxShadow,
                        { padding: 10 },
                      ]}
                    >
                      <Text>
                        {new Date(data.anniversary_date).toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.visible}
                      mode="date"
                      date={new Date(data.anniversary_date)}
                      onConfirm={this.onConfirm}
                      onCancel={() => this.setState({ visible: false })}
                    />
                  </View>
                  <Divider style={styles.separator} />
                </>
              )}
              {data.marital_status==="in_relationship" && Object.keys(Object.assign({}, data.relationship)).length > 0 && (
                <>
                  <View style={[styles.birthdayList, {justifyContent:"space-around"}]}>
                    <Text style={styles.titleBold}>In realtionship with:</Text>
                    <TouchableOpacity style={[styles.profileimage, {alignItems:"center"}]}
                    onPress={()=>{
                      this.props.navigation.navigate("RelationshipUser", {
                        tags: Object.assign({}, data.relationship),
                        submitPerson: this.submitPerson,
                      });
                    }}>
                      {data.relationship.profile_photo ? (
                        <Avatar.Image
                          style={styles.avatarimage}
                          size={42}
                          source={{
                            uri: OptimizeImage(data.relationship.profile_photo),
                          }}
                        />
                      ) : (
                        <Avatar.Image
                          style={styles.avatarimage}
                          size={42}
                          source={require("@images/avatar.png")}
                        />
                      )}

                        <View>
                          <Text style={styles.username}>
                            {Capitalize(data.relationship.first_name)}{" "}
                            {Capitalize(data.relationship.last_name)}
                          </Text>
                        </View>
                    </TouchableOpacity>
                  </View>
                  <Divider style={styles.separator} />
                </>
              )}
            </View>
          </View>

          <GeneralPrivacyStatus
            ref={this.privacyactionSheetRef}
            {...data}
            setProfileData={this.setProfileData}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Profile }) => {
  return {
    data: Profile.data,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    userProfileUpdate: (data) => {
      actions.userProfileUpdate(dispatch, data);
    },
    sendRequestToServer: (data) => {
      actions.sendRequestToServer(dispatch, data);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(RelationshipInfo);