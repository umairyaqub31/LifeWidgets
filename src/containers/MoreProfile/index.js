import * as React from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Avatar, Divider } from "react-native-paper";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Config } from "@common";
import moment from "moment";
import { Capitalize, OptimizeImage } from "@helpers";
import { connect } from "react-redux";

class MoreProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View>
            {(data.address_privacy === 1 ||
              (data.address_privacy === 2 && data.is_friend)) &&
              !!data.city &&
              data.city != "null" && (
                <TouchableOpacity style={[styles.list, styles.firstList]}>
                  <FontAwesome
                    style={styles.listIcon}
                    name="home"
                    size={22}
                    color={colors.gray}
                  />
                  <View style={styles.listText}>
                    <Text style={styles.text}>
                      Lives in{" "}
                      <Text style={styles.textBold}>
                        {" "}
                        {data.city}, {data.country_code}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            <TouchableOpacity style={styles.list}>
              <AntDesign
                style={styles.listIcon}
                name="clockcircle"
                size={22}
                color={colors.gray}
              />
              <View style={styles.listText}>
                <Text style={styles.text}>
                  Joined {moment.utc(data.created_at).local().format("MMMM Y")}
                </Text>
              </View>
            </TouchableOpacity>
            {data.total_followers > 0 && (
              <TouchableOpacity style={styles.list}>
                <FontAwesome5
                  style={styles.listIcon}
                  name="user-check"
                  size={22}
                  color={colors.gray}
                />
                <View style={styles.listText}>
                  <Text style={styles.text}>
                    Followed by {data.total_followers} people
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Divider style={styles.separator} />
          {(data.gender_privacy === 1 ||
            (data.gender_privacy === 2 && data.is_friend) ||
            data.languages_privacy === 1 ||
            (data.languages_privacy === 2 && data.is_friend) ||
            data.date_of_birth_privacy === 1 ||
            (data.date_of_birth_privacy === 2 && data.is_friend)) && (
            <>
              <View>
                <View style={styles.editHeading}>
                  <Text style={styles.heading}>Basic Info</Text>
                </View>
                {(data.gender_privacy === 1 ||
                  (data.gender_privacy === 2 && data.is_friend)) && (
                  <TouchableOpacity style={styles.listContainer}>
                    <View style={styles.chipOpacity}>
                      <FontAwesome5
                        name="user-alt"
                        size={22}
                        color={colors.black}
                      />
                    </View>
                    <View style={styles.listContainerRight}>
                      <View style={styles.listtitleContainer}>
                        <Text style={styles.titleBold}>
                          {Capitalize(data.gender)}
                        </Text>
                        <Text style={styles.textGray}>Gender</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {(data.languages_privacy === 1 ||
                  (data.languages_privacy === 2 && data.is_friend)) &&
                  !!data.languages &&
                  data.languages != "null" && (
                    <TouchableOpacity style={styles.listContainer}>
                      <View style={styles.chipOpacity}>
                        <MaterialIcons
                          name="speaker-notes"
                          size={22}
                          color={colors.black}
                        />
                      </View>
                      <View style={styles.listContainerRight}>
                        <View style={styles.listtitleContainer}>
                          <Text style={styles.titleBold}>{data.languages}</Text>
                          <Text style={styles.textGray}>Languages</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                {(data.date_of_birth_privacy === 1 ||
                  (data.date_of_birth_privacy === 2 && data.is_friend)) && (
                  <TouchableOpacity style={styles.listContainer}>
                    <View style={styles.chipOpacity}>
                      <FontAwesome5
                        name="birthday-cake"
                        size={22}
                        color={colors.black}
                      />
                    </View>
                    <View
                      style={[
                        styles.listContainerRight,
                        styles.noBorder,
                        styles.noPadding,
                      ]}
                    >
                      <View style={styles.listtitleContainer}>
                        <Text style={styles.titleBold}>
                          {moment
                            .utc(data.date_of_birth)
                            .local()
                            .format("MMMM DD, Y")}
                        </Text>
                        <Text style={styles.textGray}>Birthday</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <Divider style={styles.separator} />
            </>
          )}
          {(data.phone_number_privacy === 1 ||
            (data.phone_number_privacy === 2 && data.is_friend) ||
            data.address_privacy === 1 ||
            (data.address_privacy === 2 && data.is_friend)) && (
            <View>
              <View style={styles.editHeading}>
                <Text style={styles.heading}>Contact Info</Text>
              </View>
              {(data.phone_number_privacy === 1 ||
                (data.phone_number_privacy === 2 && data.is_friend)) &&
                !!data.phone_number &&
                data.phone_number != "null" && (
                  <TouchableOpacity style={styles.listContainer}>
                    <View style={styles.chipOpacity}>
                      <FontAwesome
                        name="phone"
                        size={22}
                        color={colors.black}
                      />
                    </View>
                    <View style={styles.listContainerRight}>
                      <View style={styles.listtitleContainer}>
                        <Text style={styles.titleBold}>
                          {data.phone_number}
                        </Text>
                        <Text style={styles.textGray}>Mobile</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              {(data.address_privacy === 1 ||
                (data.address_privacy === 2 && data.is_friend)) &&
                !!data.street &&
                data.street != "null" && (
                  <TouchableOpacity style={styles.listContainer}>
                    <View style={styles.chipOpacity}>
                      <FontAwesome
                        name="map-marker"
                        size={22}
                        color={colors.black}
                      />
                    </View>
                    <View style={[styles.listContainerRight, styles.noBorder]}>
                      <View style={styles.listtitleContainer}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.titleBold}>
                            {Capitalize(data.street)}
                          </Text>
                          {!!data.city && data.city != "null" && (
                            <Text style={styles.titleBold}>
                              {", "}
                              {Capitalize(data.city)}
                            </Text>
                          )}
                          {!!data.zip_code && data.zip_code != "null" && (
                            <Text style={styles.titleBold}>
                              {", "}
                              {data.zip_code}
                            </Text>
                          )}
                          {!!data.country_code && data.country_code != "null" && (
                            <Text style={styles.titleBold}>
                              {", "}
                              {data.country_code}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.textGray}>Address</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              {/* <TouchableOpacity style={styles.listContainer}>
              <View style={styles.chipOpacity}>
                <MaterialIcons name="email" size={22} color={colors.black} />
              </View>
              <View
                style={[
                  styles.listContainerRight,
                  styles.noBorder,
                  styles.noPadding,
                ]}
              >
                <View style={styles.listtitleContainer}>
                  <Text style={styles.titleBold}>{data.email}</Text>
                  <Text style={styles.textGray}>Email</Text>
                </View>
              </View>
            </TouchableOpacity> */}
              <Divider style={styles.separator} />
            </View>
          )}

          {(data.marital_status_privacy === 1 ||
            (data.marital_status_privacy === 2 && data.is_friend)) && (
            <>
              <View>
                <View style={styles.editHeading}>
                  <Text style={styles.heading}>Relationship</Text>
                </View>
                <View style={styles.listContainer}>
                  <View style={styles.chipOpacity}>
                    <FontAwesome5
                      name="hand-holding-heart"
                      size={22}
                      color={colors.black}
                    />
                  </View>
                  <View
                    style={[
                      styles.listContainerRight,
                      styles.noBorder,
                      styles.noPadding,
                    ]}
                  >
                    <View style={styles.listtitleContainer}>
                      <Text style={styles.titleBold}>
                        {Capitalize(data.marital_status)}
                      </Text>
                      <Text style={styles.textGray}>Status</Text>
                    </View>

                    {data.marital_status === "in_relationship" &&
                      Object.keys(Object.assign({}, data.relationship)).length >
                        0 && (
                        <>
                          <View
                            style={[
                              styles.profileimage,
                              { alignItems: "center" },
                            ]}
                          >
                            {data.relationship.profile_photo ? (
                              <Avatar.Image
                                style={styles.avatarimage}
                                size={42}
                                source={{
                                  uri: OptimizeImage(
                                    data.relationship.profile_photo
                                  ),
                                }}
                              />
                            ) : (
                              <Avatar.Image
                                style={styles.avatarimage}
                                size={42}
                                source={require("@images/avatar.png")}
                              />
                            )}

                            <View>
                              <Text style={styles.username}>
                                {Capitalize(data.relationship.first_name)}{" "}
                                {Capitalize(data.relationship.last_name)}
                              </Text>
                            </View>
                          </View>
                        </>
                      )}
                  </View>
                </View>
              </View>
              <Divider style={styles.separator} />
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Profile }) => {
  return {
    data: Profile.user,
  };
};

export default connect(mapStateToProps)(MoreProfile);