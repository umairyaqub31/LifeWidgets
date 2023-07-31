import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import {
  CreateCollection,
} from "@components";
import { connect } from "react-redux";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Color } from "@common";

class SavedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    this.per_page = 10;
    this.page = 1;
    this.modalizeRef = React.createRef();
    this.createCollectionActionSheetRef = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={this.createCollection}
          style={[styles.headRight, styles.chipOpcity]}
        >
          <AntDesign name="pluscircle" size={18} color={Color.primary} />
        </TouchableOpacity>
      ),
    });
    this.props.fetchCollections(this.per_page, this.page);
  }

  createCollection = () => {
    this.createCollectionActionSheetRef.current.createCollection(null);
  };

  option = (id) => {
    this.setState({ id });
    this.modalizeRef.current?.open();
  };

  deleteCollection = () => {
    this.modalizeRef.current?.close();
    this.props.deleteCollection(this.state.id);
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchCollections(this.per_page, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No collection found</Text>
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
        style={styles.modallistcontainer}
        onPress={() => this.props.navigation.navigate("PostByCollection", {item:item})}
      >
        <View style={styles.modallistcontainerRight}>
          <View>
            <Text style={styles.modallist}>{item.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.opacityIcon}
            onPress={() => this.option(item.id)}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data, isFetching, isProcessing } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledView}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
            }
            onEndReached={this.onEndReached}
            ListEmptyComponent={this.renderEmptyContainer}
            onEndReachedThreshold={0.5}
            data={data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              isFetching ? (
                <ActivityIndicator color={Color.gray} style={{ margin: 10 }} />
              ) : null
            }
            renderItem={this.renderItem}
          />
        </View>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              <TouchableOpacity
                style={styles.modallistcontainerPortal}
                onPress={this.deleteCollection}
              >
                <View style={styles.customchipicons}>
                  <Feather name="trash" size={26} color={Color.black} />
                </View>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modallist}>Delete collection</Text>
                    <Text style={styles.graytext}>
                      Delete collection permanently
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Modalize>
        </Portal>
        <CreateCollection
          ref={this.createCollectionActionSheetRef}
          {...this.props}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ Collection }) => {
  return {
    data: Collection.data,
    isFetching: Collection.isFetching,
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
    deleteCollection: (id) => {
      actions.deleteCollection(dispatch, id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(SavedPost);