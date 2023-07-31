import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import colors from "../../config/color/color";
import { LifeWidget, Config } from "@common";
import { Capitalize } from "@helpers";
import { connect } from "react-redux";

class AllLikesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    (this.per_page = 10), (this.page = 1), (this.params = []);
  }

  componentDidMount() {
    this.props.fetchReactionUsers(this.per_page, this.page);
  }

  onEndReached = () => {
    const { is_loading, is_more } = this.props;
    if (!is_loading) {
      if (is_more) {
        this.page++;
        this.props.fetchReactionUsers(this.per_page, this.page);
      }
    }
  };
  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            onEndReached={this.onEndReached}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.profileimagewithoption}>
                <View style={styles.profileimage}>
                  <View style={styles.avataroverly}>
                    {item.profile_photo ? (
                      <Avatar.Image
                        style={styles.avatarimage}
                        size={42}
                        source={{
                          uri: Config.lifeWidget.url + "/" + item.profile_photo,
                        }}
                      />
                    ) : (
                      <Avatar.Image
                        style={styles.avatarimage}
                        size={42}
                        source={require("@images/avatar.png")}
                      />
                    )}

                    <View style={[styles.avataroverlyicon]}>
                      <AntDesign name="like1" size={15} color={colors.white} />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.username}>
                      {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                    </Text>
                    {/* <Text style={styles.textgray}>2 mutual friend</Text> */}
                  </View>
                </View>
                {/* <TouchableOpacity style={styles.primarybtn}>
                  <Feather name="user-plus" size={15} color={colors.white} />
                  <Text style={styles.primarybtntext}>Add Friend</Text>
                </TouchableOpacity> */}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const post_id = ownProps.item.id;
  const type = "all";
  return {
    user: state.User.user,
    data:
      typeof state.People.reactions !== "undefined"
        ? typeof state.People.reactions[type] !== "undefined"
          ? typeof state.People.reactions[type][post_id] !== "undefined"
            ? state.People.reactions[type][post_id].data
            : []
          : []
        : [],
    is_loading:
      typeof state.People.reactionsExtra !== "undefined"
        ? typeof state.People.reactionsExtra[type] !== "undefined"
          ? typeof state.People.reactionsExtra[type][post_id] !== "undefined"
            ? state.People.reactionsExtra[type][post_id].is_loading
            : false
          : false
        : false,
    is_more:
      typeof state.People.reactions !== "undefined"
        ? typeof state.People.reactions[type] !== "undefined"
          ? typeof state.People.reactions[type][post_id] !== "undefined"
            ? state.People.reactions[type][post_id].is_more
            : false
          : false
        : false,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const post_id = ownProps.item.id;
  const type = "all";
  const { actions } = require("@redux/PeopleRedux");
  return {
    fetchReactionUsers: (per_page, page) => {
      actions.fetchReactionUsers(
        dispatch,
        per_page,
        page,
        { post_id: post_id },
        type
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLikesTab);