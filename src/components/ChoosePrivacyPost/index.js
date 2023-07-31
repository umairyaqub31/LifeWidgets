import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { Divider, RadioButton } from "react-native-paper";
import { FontAwesome5, Fontisto, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class ChoosePrivacyPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setPostPrivacy = (item) => {
    this.props.setPostDestination({ name: "News Feed", id: 0 });
    this.props.setDefaultList();
    this.props.setPostPrivacy(item);
  };

  componentDidMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <Text style={styles.heading}>Who can see your post?</Text>
          <Divider style={styles.separator} />
          <RadioButton.Group
            value={
              this.props.defaultPrivacy
                ? this.props.defaultPrivacy.name
                : "Public"
            }
          >
            <TouchableOpacity
              style={[
                styles.modallistcontainer,
                styles.noMargin,
                styles.noPadding,
              ]}
              onPress={() => this.setPostPrivacy({ name: "Public", id: 1 })}
            >
              <View style={styles.customchipicons}>
                <Fontisto name="earth" size={22} color={colors.black} />
              </View>
              <View style={styles.modallistcontainerRight}>
                <View>
                  <Text
                    style={[
                      styles.modallist,
                      { fontFamily: FontFamily.Medium },
                    ]}
                  >
                    Public
                  </Text>
                  <Text style={styles.graytext}>Anyone can see who's.</Text>
                </View>

                <RadioButton
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="Public"
                  onPress={() => this.setPostPrivacy({ name: "Public", id: 1 })}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modallistcontainer}
              onPress={() => this.setPostPrivacy({ name: "Friends", id: 2 })}
            >
              <View style={styles.customchipicons}>
                <FontAwesome5
                  name="user-friends"
                  size={22}
                  color={colors.black}
                />
              </View>
              <View style={styles.modallistcontainerRight}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.modallist,
                      { fontFamily: FontFamily.Medium },
                    ]}
                  >
                    Friends
                  </Text>
                  <Text style={styles.graytext}>
                    Only friends can see your post.
                  </Text>
                </View>

                <RadioButton
                  checked="checked"
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="Friends"
                  onPress={() =>
                    this.setPostPrivacy({ name: "Friends", id: 2 })
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modallistcontainer}
              onPress={() => this.setPostPrivacy({ name: "Only Me", id: 3 })}
            >
              <View style={styles.customchipicons}>
                <FontAwesome5 name="lock" size={22} color={colors.black} />
              </View>
              <View style={styles.modallistcontainerRight}>
                <View>
                  <Text
                    style={[
                      styles.modallist,
                      { fontFamily: FontFamily.Medium },
                    ]}
                  >
                    Only Me
                  </Text>
                  <Text style={styles.graytext}>Only me.</Text>
                </View>

                <RadioButton
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="Only Me"
                  onPress={() =>
                    this.setPostPrivacy({ name: "Only Me", id: 3 })
                  }
                />
              </View>
            </TouchableOpacity>
          </RadioButton.Group>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Post }) => {
  return {
    defaultPrivacy: Post.defaultPrivacy,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    setPostPrivacy: (item) => {
      dispatch(actions.setPostPrivacy(item));
    },
    setPostDestination: (item) => {
      dispatch(actions.setPostDestination(item));
    },
    setDefaultList: () => {
      dispatch(actions.setDefaultList(null));
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(ChoosePrivacyPost);