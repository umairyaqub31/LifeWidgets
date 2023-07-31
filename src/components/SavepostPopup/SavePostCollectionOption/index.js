import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import colors from "../../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { RadioButton } from "react-native-paper";
import { connect } from "react-redux";
import { Color, LifeWidget } from "@common";

class SavePostCollectionOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: null,
    };
    this.modalizeRef = React.createRef();
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.fetchCollections(this.per_page, this.page);
  }

  SavepostOption = (post_id) => {
    this.setState({post_id:post_id});
    this.modalizeRef.current?.open();
  };
  snackbarHandler = () => {
    this.props.snackbarHandler();
    this.modalizeRef.current.close();
  };
  createCollection = () => {
    this.props.createCollection(this.state.post_id);
    this.modalizeRef.current.close();
  };

  onRefresh = () => {
      this.page = 1;
      this.props.fetchCollections(this.per_page, this.page);
    
  };

  submitCollection = async (save_id) => {
    const data = {post_id:this.state.post_id, save_id:save_id}
    this.snackbarHandler();
    const json = await LifeWidget.postSave(data);
  }

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>
            No collection found
          </Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchCollections(this.per_page, this.page, this.params);
      }
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.modallistcontainerRadio]}
        onPress={()=>this.submitCollection(item.id)}
      >
        {/* <Image style={styles.roundedImage} source={{uri:'https://images.all-free-download.com/images/graphicthumb/successful_people_standing_on_the_grass_stock_photo_170381.jpg'}} /> */}
        <View style={styles.modallistcontainerRight}>
          <View>
            <Text style={styles.modallist}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data, isFetching, isProcessing} = this.props;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              <TouchableOpacity
                style={styles.modallistcontainer}
                onPress={this.createCollection}
              >
                <View style={styles.customchipicons}>
                  <Feather name="plus" size={26} color={colors.black} />
                </View>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modallist}>New Collection</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.onRefresh}
                  />
                }
                onEndReached={this.onEndReached}
                ListEmptyComponent={this.renderEmptyContainer}
                onEndReachedThreshold={0.5}
                data={data}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() =>
                  isFetching ? (
                    <ActivityIndicator
                      color={Color.gray}
                      style={{ margin: 10 }}
                    />
                  ) : null
                }
                renderItem={this.renderItem}
              />
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = ({ Collection }) => {
  return {
    data: Collection.data,
    isFetching: Collection.isFetching,
    isProcessing: Collection.isProcessing,
    total: Collection.total,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CollectionRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchCollections: (per_page, page) => {
      actions.fetchCollections(dispatch, per_page, page);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(SavePostCollectionOption);