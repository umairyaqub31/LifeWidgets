import * as React from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { UserImage } from "@components";
import { Capitalize } from "@helpers";
import { Color } from "@common";
import styles from "./styles";

class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleSelect = (item) => {
    this.props.setSelectedItem(item);
  }

  render() {
    const { selected, is_hide } = this.props;
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={selected}
        renderItem={({ item, key }) => (
          <View
            key={key}
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
              marginTop: 10,
            }}
          >
          {!is_hide &&
            <TouchableOpacity style={styles.removeButton} onPress={()=>this.toggleSelect(item)}>
          
              <Entypo name="cross" size={24} color={Color.gray} />
            </TouchableOpacity>
          }
            <UserImage item={item} size={62} />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("UserProfile", {
                  user_id: item.id,
                })
              }
            >
              <Text numberOfLines={1}>{Capitalize(item.first_name)}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected:
      typeof state.Message.selectedItems !== "undefined"
        ? state.Message.selectedItems
        : [],
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { actions } = require("@redux/ChatRedux");
    return {
      ...ownProps,
      ...stateProps,
      setSelectedItem: (data) => {
          dispatch(actions.setSelectedItem(data));
      },
    };
  };
export default connect(mapStateToProps, undefined, mergeProps)(Selected);
