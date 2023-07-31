import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../config/color/color";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import EventItem from "./EventItem";

class MyEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myEventFlatlistRef = null;
  }

  componentDidMount() {
    let params = [];
    params["my"] = "*";
    this.props.fetchEvent(10, 1, params, "my");

    this.props.navigation.setOptions({
      headerTintColor: colors.primary,
      headerBackTitleStyle: { fontSize: 18 },
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomColor: "transparent",
        borderWidth: 0,
        elevation: 0,
      },
      headerTitle: () => (
        <View>
          <Text style={styles.headertitleText}>My Event</Text>
        </View>
      ),
    });
  }

  renderItems = ({ item, index }) => {
    const { navigation } = this.props;
    return <EventItem item={item} index={index} navigation={navigation} />;
  };

  renderEvents = () => {
    const { myEventData } = this.props;
    return (
      <FlatList
        ref={(ref) => {
          this.myEventFlatlistRef = ref;
        }}
        horizontal
        // onScrollEndDrag={this.onScrollEndDrag}
        contentContainerStyle={{ flexGrow: 1 }}
        pagingEnabled
        // extraData={data.data}
        showsHorizontalScrollIndicator={false}
        data={myEventData.data}
        onEndReachedThreshold={0.5}
        initialNumToRender={50}
        // onEndReached={this._onEndReached}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItems}
        disableVirtualization={false}
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
        // }
        // ListFooterComponent={() =>
        //   this.props.isFetching ? (
        //     <ActivityIndicator
        //       style={{ flex: 1, justifyContent: "center" }}
        //       size="large"
        //       color={Color.gray}
        //     />
        //   ) : null
        // }
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {/* <View style={styles.dateTagPanel}>
            <View
              style={[
                styles.boxShadow,
                styles.roundedContainer,
                styles.dateTag,
              ]}
            >
              <View style={styles.list}>
                <View style={styles.listInline}>
                  <View style={styles.listInlineIcon}>
                    <MaterialIcons
                      name="date-range"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.primaryText}>June</Text>
                </View>
              </View>
            </View>
          </View> */}
          <View style={styles.scrolledview}>
            <View style={styles.spacing} />

            {this.renderEvents()}

            <View style={styles.spacing} />
            <View style={styles.separator} />
            {/* <View style={[styles.boxShadow, styles.roundedContainer]}>
              <View style={styles.list}>
                <View style={styles.listInline}>
                  <View style={styles.listInlineIcon}>
                    <MaterialIcons
                      name="date-range"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.primaryText}>March</Text>
                </View>
              </View>
            </View> */}
            <View style={styles.spacingXL} />
            <View style={styles.spacing} />
            {/* {this.renderEvents()} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myEventData:
      typeof state.Event.myEventData !== "undefined"
        ? state.Event.myEventData
        : {},
    isFetching: state.Event.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions: eventActions } = require("@redux/EventRedux");

  return {
    fetchEvent: (per_page, page, params = [], type) => {
      eventActions.fetchEvent(dispatch, per_page, page, params, type);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyEvent);
