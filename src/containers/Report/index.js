import * as React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { Color, LifeWidget } from "@common";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "",
      block: false,
      unfollow: false,
      loading: false,
    };
  }

  selectedProblem = (problem) => {
    this.setState({ problem });
  };

  blockToggle = async () => {
    this.setState({ block: !this.state.block });
  };

  unfollowToggle = async () => {
    const { unfollow } = this.state;

    this.setState({ unfollow: !this.state.unfollow });
    if(unfollow){
        const json = await LifeWidget.followFriend(this.props.route.params.item.user.id);
    } else {
        const json = await LifeWidget.unfollowFriend(this.props.route.params.item.user.id);
        
    }
    
  };

  sendReport = async () => {
  
    const { problem } = this.state;
    if (problem) {
      this.setState({ loading: true });
      let type = "post";
      let post_id = this.props.route.params.item.id;
      if(typeof this.props.route.params.item.title !== "undefined"){
        type = "group";
      }
      if(!this.props.route.params.item.id){
        type = "profile";
        post_id = this.props.route.params.item.user.id;
      }
      let data = { message: problem, post_id: post_id, type:type };
      const json = await LifeWidget.submitReports(data);
      this.setState({ loading: false });
      this.props.navigation.goBack();
    }
  };

  render() {
    const item = this.props.route.params.item;
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>
              Please select a problem to continue
            </Text>
            <Text style={styles.textGray}>
              You can report the post after selecting a problem.
            </Text>
            <View style={styles.reportChipsContainer}>
              <TouchableOpacity
                style={[
                  styles.customChipOpacity,
                  this.state.problem === "Nudity"
                    ? { backgroundColor: Color.primary }
                    : {},
                ]}
                onPress={() => this.selectedProblem("Nudity")}
              >
                <Text
                  style={[
                    styles.customChipOpacityText,
                    this.state.problem === "Nudity"
                      ? { color: Color.white }
                      : {},
                  ]}
                >
                  Nudity
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.customChipOpacity,
                  this.state.problem === "Harassment"
                    ? { backgroundColor: Color.primary }
                    : {},
                ]}
                onPress={() => this.selectedProblem("Harassment")}
              >
                <Text
                  style={[
                    styles.customChipOpacityText,
                    this.state.problem === "Harassment"
                      ? { color: Color.white }
                      : {},
                  ]}
                >
                  Harassment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.customChipOpacity,
                  this.state.problem === "Threat"
                    ? { backgroundColor: Color.primary }
                    : {},
                ]}
                onPress={() => this.selectedProblem("Threat")}
              >
                <Text
                  style={[
                    styles.customChipOpacityText,
                    this.state.problem === "Threat"
                      ? { color: Color.white }
                      : {},
                  ]}
                >
                  Threat
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={styles.separator} />
            {item.user &&
            <Text style={styles.textBold}>
              Please select a problem to continue
            </Text>
            }
            {item.user &&
            <TouchableOpacity
              style={styles.listContainer}
              onPress={this.blockToggle}
            >
              <SimpleLineIcons name="user-unfollow" size={30} color="black" />
              <View style={styles.listRight}>
                <Text style={styles.userName}>
                  {this.state.block ? "Unblock" : "Block"}{" "}
                  {item.user.first_name}
                </Text>
                <Text style={styles.textGray}>
                  You won't be able to see or contact each other.
                </Text>
              </View>
            </TouchableOpacity>
            }
            {item.user &&
            <TouchableOpacity
              style={styles.listContainer}
              onPress={this.unfollowToggle}
            >
              <MaterialCommunityIcons
                name="close-box-multiple-outline"
                size={30}
                color="black"
              />
              <View style={styles.listRight}>
                <Text style={styles.userName}>
                  {this.state.unfollow ? "Follow" : "Unfollow"}{" "}
                  {item.user.first_name}
                </Text>
                <Text style={styles.textGray}>
                  You won't be able to see or contact each other.
                </Text>
              </View>
            </TouchableOpacity>
            }
          </View>
          <View>
            <Divider style={styles.separator} />
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={this.sendReport}
            >
              {loading ? (
                <ActivityIndicator color={Color.white} />
              ) : (
                <Text style={styles.primaryBtnText}>Report</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Report;