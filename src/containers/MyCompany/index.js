import * as React from "react";
import * as Location from 'expo-location';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { OptimizeImage } from "@helpers";
import { CompanyOption, CachedImage } from "@components";
import {
  Entypo,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { connect } from "react-redux";

class MyCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.companyOptionRef = React.createRef();
    this.params = [];
    this.per_page = 10;
    this.page = 1;
  }


  componentDidMount() {
    
    this.params['my_company'] = true;
    this.props.fetchCompany(this.per_page, this.page, this.params);
  }

  addNew = () => {
    this.props.navigation.navigate("AddCompany", {new:true})
  }

  onRefresh = () => {
    this.page = 1;
    this.props.fetchCompany(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
        if (this.props.total > this.props.data.length) {
          this.page++;
          this.props.fetchCompany(this.per_page, this.page, this.params);
        }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Company</Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = (text) => {
    clearTimeout(this.barSearchEvent);
    this.barSearchEvent = setTimeout(() => {
      this.params["s"] = text;
      this.page = 1;
      this.props.fetchCompany(this.per_page, this.page, this.params);
    }, 500);
  };


  listHeaderComponent = () => {
    return (
      <>
        

        {/* <View style={styles.roundedfilterinputcontainer}>
          <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
            <Ionicons name="ios-search" size={24} color={colors.gray} />
            <TextInput
              style={styles.roundedtextinput}
              placeholder="Search for Bar"
              placeholderTextColor={colors.gray}
              onChangeText={this.onChangeText}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterIcon, styles.boxShadow]}
            onPress={() =>
              this.props.navigation.navigate("BarsFilter", {
                applyFilterServices: this.applyFilterServices,
                applyFilters: this.applyFilters,
                filters: this.state.filters,
                Distance: this.state.Distance,
                checked: this.state.checked,
              })
            }
          >
            <Feather name="sliders" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View> */}
      </>
    );
  };

  openTools = (item) => {
    this.companyOptionRef.current.open(item);
  }

  renderItem = ({ item, index }) => {
    let banner = "https://corvisio.com/wp-content/uploads/2020/03/Media-300x200.png";
    if(item.type==="bar"){
      banner = "https://images.all-free-download.com/images/graphiclarge/bar_wines_514430.jpg";
    }
    
    let bannerObject = Object.assign({}, item.banner);
    if (bannerObject.attachment_url) {
      banner = OptimizeImage(bannerObject.attachment_url);
    }
    return (
      <TouchableOpacity
        key={index}
        style={styles.restaurantsContainer}
        onPress={() =>
          this.props.navigation.navigate("ViewCompany", { item: item })
        }
      >
        <CachedImage
          isBackground={true}
          imageStyle={{ borderRadius: 8 }}
          style={styles.barImage}
          source={{ uri: banner }}
        >
          <View style={styles.labelFavList}>
            <View style={styles.startLabelContainer}>
              
                <View style={styles.primaryLabel}>
                  <Text style={styles.primaryLabelText}>{typeof item.business_type!=="undefined"?item.business_type.name:"Bar"}</Text>
                </View>
            </View>
            <TouchableOpacity
              style={{marginRight:10}}
              onPress={()=>this.openTools(item)}
            >
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

        </CachedImage>
        <View style={styles.barTitleRatingContainer}>
          <View style={styles.barTitleList}>
            <Text style={styles.barTitle}>{item.name}</Text>
            {item.city && (
              <>
                <View style={styles.barTitleDash} />
                <Text style={styles.barTitle}>{item.city}</Text>
              </>
            )}
          </View>
        </View>
        
      </TouchableOpacity>
    );
  };

  render() {
      return (
            <View style={styles.container}>
              <View style={styles.scrolledview}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  refreshControl={
                    <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
                  }
                  onEndReached={this.onEndReached}
                  ListEmptyComponent={this.renderEmptyContainer}
                  ListHeaderComponent={this.listHeaderComponent}
                  onEndReachedThreshold={0.5}
                  data={this.props.data}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() =>
                    this.props.isFetching ? (
                      <ActivityIndicator style={{ margin: 10 }} />
                    ) : null
                  }
                  renderItem={this.renderItem}
                />
              </View>
              <CompanyOption ref={this.companyOptionRef} />
            </View>

      );

  }
}

const mapStateToProps = ({ Company, User }) => {
  return {
    data: Company.data,
    isFetching: Company.isFetching,
    total: Company.total,
    user: typeof User.user !== "undefined" ? User.user : {},

  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchCompany: (per_page, page, params = []) => {
      console.log(params);
      actions.fetchCompany(dispatch, per_page, page, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MyCompany);