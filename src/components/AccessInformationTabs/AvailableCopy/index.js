import * as React from "react";
import { Text, View, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import {Color} from "@common";
import moment from "moment";
import * as WebBrowser from 'expo-web-browser';
import { Config } from "@common";

class AvailableCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    (this.per_page = 10), (this.page = 1);
  }

  componentDidMount() {
    this.props.fetchAccessInformation(this.per_page, this.page);
  }

  downloadFile = async (uuid) => {
    let result = await WebBrowser.openBrowserAsync(Config.lifeWidget.url+"/download-copy/"+uuid);
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={{margin:10, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}} key={index}>
        <Text style={{color:Color.gray,}}>{moment.utc(item.created_at).local().format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
        <TouchableOpacity onPress={()=>this.downloadFile(item.uuid)} style={{backgroundColor:Color.primary, alignItems:"center", justifyContent:"center", borderRadius:10}}>
          <Text style={{color:Color.white, padding:10,}}>Download</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchAccessInformation(this.per_page, this.page);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchAccessInformation(this.per_page, this.page);
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={[styles.container, {marginTop:"25%", padding:20}]}>
          <View style={styles.noCopy}>
            <Text style={styles.textBold}>No available Copies</Text>
            <Text
              style={[styles.textGray, { textAlign: "center", marginTop: 5 }]}
            >
              You do not have any files to download yet. You can request a copy
              of your data in the pervious tab.
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          ListEmptyComponent={this.renderEmptyContainer}
          onEndReachedThreshold={0.5}
          data={this.props.data}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
        />
      </>
    );
  }
}
const mapStateToProps = ({ User }) => {
  return {
    data:
      typeof User.availableCopies !== "undefined" ? User.availableCopies : [],
    total:
      typeof User.totalAvailableCopies !== "undefined"
        ? User.totalAvailableCopies
        : 0,
    isFetching:
      typeof User.isFetchingCopies !== "undefined"
        ? User.isFetchingCopies
        : false,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchAccessInformation: (per_page, page) => {
      actions.fetchAccessInformation(dispatch, per_page, page);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AvailableCopy);