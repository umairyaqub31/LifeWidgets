import * as React from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import styles from "./styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import * as RootNavigation from "../../common/NavigationService";
import { connect } from "react-redux";

class CompanyOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
    this.modalizeRef = React.createRef();
  }

  open = (item) => {
    this.setState({ item });
    this.modalizeRef.current?.open();
  };

  close = () => {
    this.modalizeRef.current.close();
  };

  deleteCompany = () => {
    Alert.alert("Delete!", "Are you sure you eant to delete this company", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          this.props.deleteCompany(this.state.item.id);
          this.modalizeRef.current.close();
        },
      },
    ]);
  };

  editCompany = () => {
    this.modalizeRef.current.close();
    RootNavigation.navigate("AddCompany", { item: this.state.item });
  };

  viewCompany = () => {
    this.modalizeRef.current.close();
    RootNavigation.navigate("BarAbout", { item: this.state.item });
  };

  render() {
    const { item } = this.state;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              <>
              {!!item.type && (item.type==="bar" || item.type==="bar_restaurant") &&
              <TouchableOpacity
                style={styles.modallistcontainer}
                onPress={this.viewCompany}
              >
                <View style={styles.customchipicons}>
                  <Feather name="eye" size={20} color={colors.black} />
                </View>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modallist}>View</Text>
                    <Text style={styles.graytext}>View details</Text>
                  </View>
                </View>
              </TouchableOpacity>
              }
                {/* <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.editCompany}
                >
                  <View style={styles.customchipicons}>
                    <Feather name="edit" size={26} color={colors.black} />
                  </View>
                  <View style={styles.pendinginvitesnamecontainer}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.modallist}>Edit company</Text>
                      <Text style={styles.graytext}>
                        Edit fields, logo, banner and business hours
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.deleteCompany}
                >
                  <View style={styles.customchipicons}>
                    <Feather name="trash" size={26} color={colors.black} />
                  </View>
                  <View style={styles.pendinginvitesnamecontainer}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.modallist}>Delete company</Text>
                      <Text style={styles.graytext}>
                        Delete company permanently
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
              
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    deleteCompany: (item) => {
      actions.deleteCompany(dispatch, item);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(CompanyOption);