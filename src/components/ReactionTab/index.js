import * as React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import colors from "../../config/color/color";
import { LifeWidget, Config } from "@common";
import { Capitalize, OptimizeImage } from "@helpers";
import { connect } from "react-redux";
const images = [
  {
    code: 1,
    img: require("@images/reaction/100.png"),
  },
  {
    code: 2,
    img: require("@images/reaction/love.png"),
  },
  {
    code: 3,
    img: require("@images/reaction/haha.png"),
  },
  {
    code: 4,
    img: require("@images/reaction/wow.png"),
  },
  {
    code: 5,
    img: require("@images/reaction/sad.png"),
  },
  {
    code: 6,
    img: require("@images/reaction/rolling.png"),
  },
  {
    code: 7,
    img: require("@images/reaction/angry.png"),
  },
];

class ReactionTab extends React.Component {
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

  listFooterComponent = () => {
    const { is_loading } = this.props;
    if (is_loading) {
      return <ActivityIndicator color={colors.gray} />;
    }
    return null;
  };

  onEndReached = () => {
    const { is_loading, is_more } = this.props;
    if (!this.onEndReachedCalledDuringMomentum) {
      if (!is_loading) {
        if (is_more) {
          this.page++;
          this.props.fetchReactionUsers(this.per_page, this.page);
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
    }
  };

  renderItem = ({ item }) => {
    const selected = images.find(
      (img) => img.code === item.reactions.reaction_id
    );
    return (
      <TouchableOpacity style={styles.profileimagewithoption}>
        <View style={styles.profileimage}>
          <View style={styles.avataroverly}>
            {item.profile_photo ? (
              <Avatar.Image
                style={styles.avatarimage}
                size={42}
                source={{
                  uri: OptimizeImage(item.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                style={styles.avatarimage}
                size={42}
                source={require("@images/avatar.png")}
              />
            )}
            {selected && (
              <Image style={[styles.avataroverlyicon]} source={selected.img} />
            )}
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
    );
  };
  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            onEndReached={this.onEndReached}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            ListFooterComponent={this.listFooterComponent}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const post_id = ownProps.item.id;
  const type = ownProps.type;
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
  const type = ownProps.type;
  const { actions } = require("@redux/PeopleRedux");
  return {
    fetchReactionUsers: (per_page, page) => {
      actions.fetchReactionUsers(
        dispatch,
        per_page,
        page,
        { post_id: post_id, reaction_id: ownProps.reaction_id },
        type
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionTab);