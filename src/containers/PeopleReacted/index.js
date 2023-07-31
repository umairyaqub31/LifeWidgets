import * as React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  AllLikesTab,
  OnlyLikesTab,
  OnlyDislikesTab,
  ReactionTab,
} from "@components";
import { LifeWidget } from "@common";
import { AntDesign } from "@expo/vector-icons";

const initialLayout = { width: Dimensions.get("window").width };

const getTabBarIcon = (props, index, routes, data) => {
  const { route } = props;
  if (route.key === "all") {
    let tabIndex = routes.findIndex((data) => data.key === "all");
    return (
      <Text
        style={{
          color: index === tabIndex ? colors.primary : colors.gray,
          fontFamily: FontFamily.Regular,
          marginLeft: 5,
        }}
      >
        All
      </Text>
    );
  } else if (route.key === "absolutely") {
    let tabIndex = routes.findIndex((data) => data.key === "absolutely");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/100.png")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          {data.likes_count}
        </Text> */}
      </View>
    );
  } else if (route.key === "love") {
    let tabIndex = routes.findIndex((data) => data.key === "love");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/love.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          {data.dislikes_count}
        </Text> */}
      </View>
    );
  } else if (route.key === "haha") {
    let tabIndex = routes.findIndex((data) => data.key === "haha");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/haha.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          2
        </Text> */}
      </View>
    );
  } else if (route.key === "wow") {
    let tabIndex = routes.findIndex((data) => data.key === "wow");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/wow.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          2
        </Text> */}
      </View>
    );
  } else if (route.key === "sad") {
    let tabIndex = routes.findIndex((data) => data.key === "sad");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/sad.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          2
        </Text> */}
      </View>
    );
  } else if (route.key === "sarcasm") {
    let tabIndex = routes.findIndex((data) => data.key === "sarcasm");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/rolling.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          2
        </Text> */}
      </View>
    );
  } else if (route.key === "angry") {
    let tabIndex = routes.findIndex((data) => data.key === "angry");
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
            },
          ]}
          source={require("@images/reaction/angry.gif")}
        />
        {/* <Text
          style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Regular,
            marginLeft: 5,
          }}
        >
          2
        </Text> */}
      </View>
    );
  }
};

export default function PeopleReacted(props) {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchMyAPI() {
      const data = await LifeWidget.getPost(props.route.params.item.id);
      console.log(data);
      setData(data);
    }

    fetchMyAPI();
  }, []);
  const [routes] = React.useState([
    { key: "all", title: "All " },
    { key: "absolutely", title: "100" },
    { key: "love", title: "Love" },
    { key: "haha", title: "Haha" },
    { key: "wow", title: "Wow" },
    { key: "sad", title: "Sad" },
    { key: "sarcasm", title: "Sarcasm" },
    { key: "angry", title: "Angry" },
  ]);

  const All = () => <ReactionTab item={props.route.params.item} type="all" reaction_id={null} />;
  const Absolutely = () => (
    <ReactionTab item={props.route.params.item} type="100" reaction_id={1} />
  );
  const Love = () => (
    <ReactionTab item={props.route.params.item} type="love" reaction_id={2} />
  );
  const Haha = () => (
    <ReactionTab item={props.route.params.item} type="haha" reaction_id={3} />
  );
  const Wow = () => (
    <ReactionTab item={props.route.params.item} type="wow" reaction_id={4} />
  );
  const Sad = () => (
    <ReactionTab item={props.route.params.item} type="sad" reaction_id={5} />
  );
  const Sarcasm = () => (
    <ReactionTab
      item={props.route.params.item}
      type="sarcasm"
      reaction_id={6}
    />
  );
  const Angry = () => (
    <ReactionTab item={props.route.params.item} type="angry" reaction_id={7} />
  );

  const renderScene = SceneMap({
    all: All,
    absolutely: Absolutely,
    love: Love,
    haha: Haha,
    wow: Wow,
    sad: Sad,
    sarcasm: Sarcasm,
    angry: Angry,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: "white" }}
      renderLabel={false}
      renderIcon={(props) => getTabBarIcon(props, index, routes, data)}
    />
  );

  return (
    <TabView
      lazy={true}
      swipeEnabled
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      
    />
  );
}