import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import styles from "./styles";
import { Ionicons, Feather, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { FbGrid } from "@components";
import colors from "../../config/color/color";
import { Avatar, Divider, List } from "react-native-paper";
import { Config, LifeWidget } from "@common";
import moment from "moment";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import ImageViewer from "react-native-image-zoom-viewer";

class BarAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      visible: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>
            {this.props.route.params.item.name}
          </Text>
        </View>
      ),

      headerRight: () =>
        this.props.user.id === this.props.route.params.item.user.id ? (
          <TouchableOpacity
            style={styles.headRightOpacity}
            onPress={() =>
              this.props.navigation.navigate("AddCompany", {
                item: this.props.route.params.item,
              })
            }
          >
            <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
        ) : null,
    });
  }

  barCheckIn = async () => {
    this.props.route.params.item.is_check_in = true;
    this.forceUpdate();
    const json = await LifeWidget.barCheckIn(this.props.route.params.item.id);
    console.log(json);
  };

  barCheckOut = async () => {
    this.props.route.params.item.is_check_in = false;
    this.forceUpdate();
    const json = await LifeWidget.barCheckOut(this.props.route.params.item.id);
  };

  render() {
    const { item } = this.props.route.params;
    let banner =
      "https://images.all-free-download.com/images/graphiclarge/bar_wines_514430.jpg";
    let bannerObject = Object.assign({}, item.banner);
    if (bannerObject.attachment_url) {
      banner = Config.lifeWidget.url + "/" + bannerObject.attachment_url;
    }

    let logo =
      "https://images.all-free-download.com/images/graphicthumb/innocent_girl_608907.jpg";
    let logoObject = Object.assign({}, item.logo);
    if (logoObject.attachment_url) {
      logo = Config.lifeWidget.url + "/" + logoObject.attachment_url;
    }
    const photos = [];
    for (var i = 0; i < item.photos.length; i++) {
      photos[i] = OptimizeImage(
        item.photos[i].attachment_url,
        item.photos[i].type
      );
    }

    var attachments = [];
    if (item.photos && item.photos.length > 0) {
      item.photos.map((item, key) => {
        attachments.push({
          ...item,
          url: OptimizeImage(item.attachment_url),
        });
      });
    }

    let live = item.bar_services.some(
      (service) => service.service_code === "dot-circle"
    );

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={styles.barCoverImage}
            source={{ uri: banner }}
          >
            <View style={styles.overLay}></View>
            <View style={styles.barCoverImageBody}>
              <View style={styles.barInfo}>
                <TouchableOpacity style={styles.profileimage}>
                  <Avatar.Image
                    size={42}
                    source={{
                      uri: logo,
                    }}
                  />
                  {item.owner && (
                    <Text style={[styles.textWhite, { marginLeft: 10 }]}>
                      {item.owner.first_name}
                    </Text>
                  )}
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.changeImage}>
                        <MaterialCommunityIcons name="camera-plus" size={24} color={colors.white} />
                      </TouchableOpacity> */}
              </View>
              <Text style={styles.barTitle}>
                {item.name} - {item.city && <>{item.city}</>}
              </Text>
              <Text style={styles.textWhite}>
                {item.address}, {item.city}, {item.state} {item.postal_code},{" "}
                {item.country}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.scrolledview}>
            <View style={styles.headList}>
              <Text style={styles.heading}>Services</Text>
              <Ionicons name="ios-arrow-down" size={18} color="black" />
            </View>
            <View style={styles.servicesAvailableContainer}>
              {item.bar_services.length > 0 &&
                item.bar_services.map((item, key) => (
                  <View style={styles.serviceAvailable}>
                    <View style={styles.serviceName}>
                      <FontAwesome5
                        style={styles.barIcon}
                        name={item.service_code}
                        size={22}
                        color={colors.primary}
                      />
                      <Text style={styles.textBold}>{item.service_name}</Text>
                    </View>
                  </View>
                ))}
            </View>
            <Divider style={[styles.separator, styles.noMarginBottom]} />
            <List.Section style={styles.timeAccordion}>
              <List.Accordion
                titleStyle={styles.heading}
                style={{ padding: 0 }}
                title="Working Hours"
                description={
                  <Text>
                    <Text style={styles.OpenText}>Open</Text> <Text>-</Text>{" "}
                    <Text style={styles.textGray}>Monday</Text>
                  </Text>
                }
              >
                <View style={styles.list}>
                  <Ionicons
                    style={styles.listIcon}
                    name="ios-timer"
                    size={24}
                    color={colors.primary}
                  />
                  <View>
                    {item.bar_hours &&
                      item.bar_hours.map((item, key) => (
                        <View style={[styles.dayNtime]} key={key}>
                          <Text style={styles.textBold}>{item.day}:</Text>
                          {item.open === 1 ? (
                            <Text style={[styles.textGray, { marginLeft: 20 }]}>
                              {moment
                                .utc(item.open_time)
                                .local()
                                .format("hh:mm A")}{" "}
                              -{" "}
                              {moment
                                .utc(item.close_time)
                                .local()
                                .format("hh:mm A")}
                            </Text>
                          ) : (
                            <Text style={{ color: "red", marginLeft: 20 }}>
                              Close
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
            {!!photos && photos.length > 0 && (
              <>
                <Modal visible={this.state.visible} transparent={true}>
                  <TouchableOpacity
                    onPress={() => this.setState({ visible: false })}
                    style={styles.close}
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </TouchableOpacity>

                  <ImageViewer
                    useNativeDriver={true}
                    imageUrls={attachments}
                    index={this.state.index}
                    onChange={(index) => this.setState({ index })}
                  />
                </Modal>
                <View style={{ height: 250 }}>
                  <FbGrid
                    images={photos}
                    count={photos.length}
                    onPress={() => this.setState({ visible: true })}
                  />
                </View>
              </>
            )}

            {item.checkins.length > 0 && (
              <>
                <Divider style={[styles.separator, styles.noMarginTop]} />
                <Text style={styles.heading}>People who checked-In</Text>
                <View style={styles.friendsContainer}>
                  {item.checkins.map((item, key) => (
                    <>
                    {item.user && (
                    <TouchableOpacity
                      key={key}
                      style={[styles.friendsGrid, styles.boxShadow]}
                      onPress={() =>
                               this.props.navigation.navigate("Friends",
                                            {screen:"UserProfile", params:{
                                                        user_id: item.user.id,
                               }})}
                    >
                    {item.user.profile_photo ? (
                        <Image
                          style={styles.avatarimage}
                          source={{
                            uri: OptimizeImage(item.user.profile_photo),
                        }}
                        />
                        ):(
                          <Image
                            style={styles.avatarimage}
                            source={require("@images/avatar.png")}
                          />
                      )}
                      <View style={styles.friendsGridBody}>
                        <Text style={styles.username}>
                          {item.user.first_name} {item.user.last_name}
                          {item.user.verified && (
                            <AntDesign name="star" size={18} color={colors.gold} />
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    )}
                    </>
                  ))}
                </View>
              </>
            )}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (item.is_check_in) {
                    this.barCheckOut();
                  } else {
                    this.barCheckIn();
                  }
                }}
                style={[styles.fillBtn, styles.barClaim]}
              >
                <Text style={styles.fillBtnText}>
                  {item.is_check_in ? "Check-Out" : "Check-In"}
                </Text>
              </TouchableOpacity>
              {/*item.user.id !== this.props.user.id && (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("MyCompanyEdit", {
                      item: item,
                    })
                  }
                  style={[styles.fillBtn, styles.barClaim]}
                >
                  <Text style={styles.fillBtnText}>Claim bar</Text>
                </TouchableOpacity>
            )*/}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

export default connect(mapStateToProps)(BarAbout);
