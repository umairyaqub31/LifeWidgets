import * as React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import { LeaderboardUsa, LeaderboardInternational } from "@components";
import { Reward } from "@containers";
import { Color } from "@common";
import FontFamily from "../../config/fonts/fontfamily";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Avatar } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";

class TopLeadboards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      index: 0,
      routes: [
        { key: "first", title: "US" },
        { key: "second", title: "International" },
      ],
    };
    this.modalizeRef = React.createRef();
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>Leaderboard</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.chipOpcity} onPress={this.modalizeOpen}>
          <Entypo name="dots-three-vertical" size={18} color={Color.primary} />
        </TouchableOpacity>
      ),
    });
  }
  modalizeOpen = () => {
    this.modalizeRef.current?.open();
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <LeaderboardUsa />;
      case "second":
        return <LeaderboardInternational />;
      default:
        return null;
    }
  };

  setIndex = (index) => {
    this.setState({ index }, this.setHeaderRight);
  };

  listHeaderComponent = () => {
    return (
      <Pressable onPress={this.modalizeOpen} style={{padding:15,paddingBottom:5}}>
        <LinearGradient
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#ECB042", "rgb(254,236,118)"]}
          style={styles.LinearGradient}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{ paddingLeft: 15, flex: 1, justifyContent: "center" }}
            >
              <Text style={styles.heading}>Two $1000 Winners </Text>
              <View style={styles.spacingXS} />
              <Text style={[styles.text, { fontSize: 12 }]}>
                One US Winner and One International Winnersd
              </Text>
              <View style={styles.spacingXS} />
              <Text style={[styles.text, { fontSize: 12 }]}>
                Ends on June 30th
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Feather name="gift" size={104} color={Color.gold} />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.spacing} />
        <Text style={styles.textBold}>Top 10</Text>
      </Pressable>
    );
  };
  render() {
    const { data, user } = this.props;
    const { index, routes } = this.state;
    if (user.is_reward_message == 1) {
      return <Reward />;
    }
    return (
      <>
        <View style={styles.container}>
          {this.listHeaderComponent()}
          <View
            style={{ flex: 1, borderWidth: 1, borderColor: Color.lightGray }}
          >
            <TabView
              swipeEnabled={true}
              tabBarPosition="top"
              navigationState={{ index, routes }}
              renderScene={this.renderScene}
              onIndexChange={this.setIndex}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  navigation={this.props.navigation}
                  tabStyle={{ borderTopWidth: 1, borderColor: Color.lightGray }}
                  indicatorStyle={{ backgroundColor: Color.primary }}
                  indicatorContainerStyle={{ backgroundColor: Color.white }}
                  activeColor={Color.primary}
                  inactiveColor={Color.black}
                  labelStyle={{ fontFamily: FontFamily.Medium, fontSize: 12 }}
                />
              )}
            />
          </View>
          <Portal>
            <Modalize
              ref={this.modalizeRef}
              adjustToContentHeight={true}
              modalTopOffset={30}
            >
              <ImageBackground
                source={require("../../../assets/images/winner.png")}
                style={styles.winnerBanner}
                imageStyle={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.modalizeRef.current?.close()}
                >
                  <Ionicons name="arrow-back" size={28} color={Color.white} />
                </TouchableOpacity>
              </ImageBackground>
              <View style={styles.modalBody}>
                <View style={styles.modalBodyHeader}>
                  <Text style={[styles.heading, { fontSize: 18 }]}>
                    $1000 Winner for May 2021
                  </Text>
                </View>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.listColumn}>
                    <Avatar.Image
                      style={styles.avatarimage}
                      size={102}
                      source={{
                        uri: OptimizeImage(
                          "uploads/729/profile/photo/1622642450.jpg"
                        ),
                      }}
                    />
                    <View style={styles.spacingXS} />
                    <Text style={[styles.heading, { color: Color.black }]}>
                      Monimoy Ghosh
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.spacing} />
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>Congratulations</Text> to
                    Monimoy Ghosh who won $1000 in May with 344 new friends
                    joined.
                  </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.text}>
                    I am pleased to announce we will run a similar contest for
                    the month of June.
                  </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.text}>
                    This month we will have two $1000 winners, as we will award
                    the prize to one US citizen and a duplicate prize to an
                    international citizen.
                  </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.text}>
                    The rules are simple, invite as many people as you can, when
                    they join, have them create a profile with a picture and
                    then add you as a friend.
                  </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.text}>
                    The first person they add as a friend will be awarded one
                    point. This contest will end on June 30th at midnight. Good
                    luck and welcome to Life Widgets!
                  </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.text}>
                    The first person they add as a friend will be awarded one
                    point. This contest will end on June 30th at midnight. Good
                    luck and welcome to Life Widgets!
                  </Text>
                </View>
              </View>
            </Modalize>
          </Portal>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user:state.User.user };
};
export default connect(mapStateToProps)(TopLeadboards);