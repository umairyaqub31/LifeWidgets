import * as React from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "./styles";
import { Switch } from "react-native-paper";
import FontFamily from "../../../config/fonts/fontfamily";
import { connect } from "react-redux";

class MenuSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { menu } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={styles.flirtList}></View>
          <View style={[styles.list, styles.noMargin]}>
            <Text style={styles.text}></Text>
            <View style={styles.RadioButton}>
              <Text style={[styles.text, { fontFamily: FontFamily.Medium }]}>
                Show/Hide
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Groups</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.groups}
              onValueChange={() => this.props.menuSettings("groups")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Saved</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.saved}
              onValueChange={() => this.props.menuSettings("saved")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Comms</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.comms}
              onValueChange={() => this.props.menuSettings("comms")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Flirts</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.flirt}
              onValueChange={() => this.props.menuSettings("flirt")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Bars</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.bars}
              onValueChange={() => this.props.menuSettings("bars")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Restaurant</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.restaurant}
              onValueChange={() => this.props.menuSettings("restaurant")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Company</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.company}
              onValueChange={() => this.props.menuSettings("company")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Bill of Rights</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.bill_of_rights}
              onValueChange={() => this.props.menuSettings("bill_of_rights")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Feedback</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.feedback}
              onValueChange={() => this.props.menuSettings("feedback")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>How To</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.how_to}
              onValueChange={() => this.props.menuSettings("how_to")}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.textBold}>Reward</Text>
            <Switch
              style={{ marginRight: 20 }}
              value={menu.reward}
              onValueChange={() => this.props.menuSettings("reward")}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    menu: typeof User.menu !== "undefined" ? User.menu : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    menuSettings: (data) => {
      dispatch(actions.menuSettings(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MenuSetting);
