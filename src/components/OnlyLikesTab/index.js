import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import colors from "../../config/color/color";
import { LifeWidget, Config } from "@common";
import { Capitalize } from "@helpers";

class OnlyLikesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    this.per_page = 10,this.page = 1, this.params = [];
  }

  fetchData = async () => {
    this.params["post_id"] = this.props.item.id;
    const data = await LifeWidget.getLikeUsers(
      this.per_page,
      this.page,
      this.params
    );
    if (data.data) {
      this.setState({ data: data.data });
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
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

export default OnlyLikesTab;

