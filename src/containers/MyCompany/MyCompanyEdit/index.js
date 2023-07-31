import * as React from "react";
import { Alert, ActivityIndicator, Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../../config/color/color";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { LifeWidget } from "@common";

class MyCompanyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      address:"",
      phone_number:"",
      website:"",
      type: "",
      loading:false
    };
  }

  componentDidMount(){
    this.props.fetchBarTypes();
  }

  sendClaim = async () => {
    const {name, address, phone_number, website, type} = this.state;
    const bar_id = this.props.route.params.item.id;
    const data = {bar_id, name, address, phone_number, website, type};
    if(name=="" || address=="" || phone_number=="" || type==""){
      Alert.alert(
        "Required fields",
        "Please fill all fields",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }
    this.setState({loading:true});
    const json = await LifeWidget.sendBarClaim(data);
    Alert.alert(
      "Sent",
      "Your claim request has been successfully submitted.",
      [
        { text: "OK", onPress: () => this.props.navigation.goBack() }
      ]
    );
    this.setState({loading:false, name:"", address:"", phone_number:"", website:""});
  }

  render() {
    const {types} = this.props;
    const {item} = this.props.route.params;
    const {name, address, phone_number, website, type, loading} = this.state;
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <Text style={{margin:10, fontSize:17, color:colors.gray}}>Claim bar "{item.name}"</Text>
            <View>
              <TextInput
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                value={name}
                style={[styles.textinputrounded, styles.boxShadow]}
                onChangeText={(text)=>this.setState({name:text})}
                label="Company Name"
              />
              <TextInput
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                value={address}
                style={[styles.textinputrounded, styles.boxShadow]}
                onChangeText={(text)=>this.setState({address:text})}
                label="Company Address"
              />
              <TextInput
                keyboardType="phone-pad"
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                value={phone_number}
                style={[styles.textinputrounded, styles.boxShadow]}
                onChangeText={(text)=>this.setState({phone_number:text})}
                label="Business Phone"
              />
              <TextInput
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                value={website}
                style={[styles.textinputrounded, styles.boxShadow]}
                label="Business Website"
                onChangeText={(text)=>this.setState({website:text})}
              />
              <Text style={{alignSelf:"center", margin:10, fontSize:17, color:colors.gray}}>Business Type</Text>
              <Picker
                  style={{ color: colors.black }}
                  selectedValue={type}
                  onValueChange={(itemValue) =>
                    this.setState({ type: itemValue })
                  }
                >
                <Picker.Item
                    color={colors.black}
                    label={""}
                    value={""}
                  />
                {types.length>0 && types.map((item,key)=>(
                  <Picker.Item
                    key={key}
                    color={colors.black}
                    label={item.type_name}
                    value={item.id}
                  />
                ))}
                </Picker>
            </View>
          </ScrollView>
          {loading? 
          <ActivityIndicator color={colors.gray}  />:
          <TouchableOpacity style={styles.primaryBtn} onPress={this.sendClaim}>
            <Text style={styles.primaryBtnText}>Complete</Text>
          </TouchableOpacity>
          }
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ Bar, User }) => {
  return {
    types: Bar.types,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchBarTypes: () => {
      actions.fetchBarTypes(dispatch);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MyCompanyEdit);