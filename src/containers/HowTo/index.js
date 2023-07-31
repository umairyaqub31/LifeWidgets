import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import styles from "./styles";
import { VideoPlayer } from "@components";
import { connect } from "react-redux";
import { Color } from "@common";
import { OptimizeImage } from "@helpers";

class HowTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    (this.page = 1), (this.per_page = 10);
  }

  componentDidMount() {
    this.props.fetch(this.per_page, this.page);
  }

  _onRefresh = () => {
    this.page = 1;
    this.props.fetch(this.per_page, this.page);
  };

  _onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.data.length < this.props.total) {
        this.page++;
        this.props.fetch(this.per_page, this.page);
      }
    }
  };
  _renderItems = ({ item, _ }) => {
    let uri = OptimizeImage(item.attachment_url, item.type);
    return (
      <View
        style={{
          padding:10,
          marginBottom: 10,
          backgroundColor:Color.lightGray,
          borderRadius:5
        }}
      >
        <VideoPlayer
          ref={(ref) =>
            (this.videoPlayerRef = {
              ...this.videoPlayerRef,
              [`REF-PLAYER${item.id}`]: ref,
            })
          }
          stopOtherPlayer={this._stopOtherPlayer}
          id={item.id}
          uri={uri}
        />
      </View>
    );
  };

  _stopOtherPlayer = (id) => {
    const { data } = this.props;
    data.forEach((item) => {
      if (item.id !== id) {
        if (
          typeof this.videoPlayerRef[`REF-PLAYER${item.id}`] !== "undefined" &&
          this.videoPlayerRef[`REF-PLAYER${item.id}`].isPlaying()
        ) {
          this.videoPlayerRef[`REF-PLAYER${item.id}`].videoPause();
        }
      }
    });
  };

  onViewableItemsChanged = (props) => {
    const changed = props.changed;
    changed.forEach((item) => {
      if (!item.isViewable) {
        if (
          typeof this.videoPlayerRef[`REF-PLAYER${item.item.id}`] !==
            "undefined" &&
          this.videoPlayerRef[`REF-PLAYER${item.item.id}`].isPlaying()
        ) {
          this.videoPlayerRef[`REF-PLAYER${item.item.id}`].videoPause();
        }
      }
    });
  };

  render() {
    const { data, total } = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.scrolledview}>
            <FlatList
              ref={(ref) => {
                this.feedFlatlistRef = ref;
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh}
                />
              }
              onViewableItemsChanged={this.onViewableItemsChanged}
              onEndReached={this._onEndReached}
              onEndReachedThreshold={0.5}
              data={data}
              ListFooterComponent={() =>
                this.props.isFetching ? (
                  <ActivityIndicator
                    style={{ margin: 10 }}
                    color={Color.gray}
                  />
                ) : null
              }
              renderItem={this._renderItems}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.User.tutorialVideos ?? [],
    total: state.User.tutorialVideosTotal ?? 0,
    isFetching: state.User.isFetching ?? false,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");

  return {
    fetch: (per_page, page) => {
      actions.fetchTutorialVideos(dispatch, per_page, page);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HowTo);