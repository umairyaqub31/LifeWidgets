import * as React from "react";
import {
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Share,
  SafeAreaView,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { Config } from "@common";
import ImageViewer from "react-native-image-zoom-viewer";
import colors from "../../config/color/color";

const windowHeight = Dimensions.get("window").height;

class ShareUs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
    };
  }

  getShareText = (id) => {
    let $title = "";
    let $description = "";
    switch (id) {
      case 1:
        $title = "WHO WANTS TO JOIN ME?";
        $description =
          "I switched my social media to Life Widgets, you should too!";
        break;
      case 2:
        $title = "YOU'RE BEING A BABY";
        $description =
          "Stop complaining about Big Tech and switch your social platform like I did!";
        break;
      case 3:
        $title = "I DONUT CARE ABOUT ADS";
        $description =
          "So i switched my social media to Life Widgets, you should too!";
        break;
      case 4:
        $title = "EGGS-ACTLY HOW I FEEL";
        $description = "About Ads... so I switched my social media.";
        break;
      case 5:
        $title = "FINALLY! FREEDOM";
        $description =
          "I switched my social media to Life Widgets, you should too!";
        break;
      case 6:
        $title = "FOR FOX SAKE,SWITCH WITH ME";
        $description =
          "I switched my social media to Life Widgets, you should too!";
        break;
      case 7:
        $title = "GRANDMA ISN'T ON THIS ONE... YET";
        $description =
          "I switched my social media to Life Widgets, you should too!";
        break;
      case 8:
        $title = "I'M WITH THIS GUY";
        $description = "We switched over our social media platform!";
        break;
      case 9:
        $title = "HAVE YOU HEARD?";
        $description = "I switched my social media and want you to join me!";
        break;
      case 10:
        $title = "HAVE YOU HEARD?";
        $description = "I switched my social media and want you to join me!";
        break;
      case 11:
        $title = "ALL THAT JAZZ...";
        $description = "I switched my social media to the app that has it all!";
        break;
      case 12:
        $title = "A NO DRAMA, LLAMA";
        $description =
          "Stop complaining about Big Tech and switch your social platform like I did!";
        break;
      case 13:
        $title = "MONEY ISN'T EVERYTHING";
        $description =
          "But I switched my social media to the app that has everything!";
        break;
      case 14:
        $title = "I MUSTACHE YOU...";
        $description =
          "Will you switch your social media with me to Life Widgets";
        break;
      case 15:
        $title = "EVERYTHING BUT THE KITCHEN SINK";
        $description = "I switched my social media to the app that has it all!";
        break;
      case 16:
        $title = "TAKE A VACA FROM BIG TECH";
        $description =
          "I switched my social media to the Life Widgets, you should too!";
        break;
      case 17:
        $title = "THE WHOLE ENCHILADA...";
        $description = "I switched my social media to the app that has it all!";
        break;
      case 18:
        $title = "IT'S ALL I AVO NEED!";
        $description = "I switched my social media to the app that has it all!";
        break;
      case 19:
        $title = "THIS ONE ISN'T OVER BAKED...";
        $description =
          "I switched my social media to an app that's easy to use!";
        break;
      case 20:
        $title = "NOTHING IS BETTER THAN SUMMER...";
        $description = "But there is something just as hot!";
        break;
      case 21:
        $title = "HAPPY BIRTHDAY ...";
        $description = "You can have your cake and eat it too!";
        break;
      case 22:
        $title = "ROAM LIKE A GNOME...";
        $description = "Switch over to the app that has it all!";
        break;
      case 23:
        $title = "STOP OVERTHINKING YOUR POST CONTENT...";
        $description =
          "I switched my social media to an app that helps me stay connected!";
        break;
      case 24:
        $title = "IT'S NOT A POPULARITY CONTEST...";
        $description =
          "I switched my social media to an app that helps me stay connected!";
        break;

      default:
        $title = "Download Life Widgets";
        $description =
          "I switched my social media to Life Widgets, you should too!";
    }
    return $title + "\n" + $description;
  };

  async onShare(id) {
    if (!id) {
      id = this.state.index + 1;
    }
    let description = this.getShareText(id);
    try {
      const result = await Share.share({
        message: description + "\n" + "https://www.lifewidgets.com/share/" + id,
        url: "https://www.lifewidgets.com/share/" + id,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const attaches = [
      {
        url: "",
        props: {
          source: require("../../../assets/images/WhoWantstoJoin.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Beingababy.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/DonutCare.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Eggsactly.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Finally.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/FoxSake.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Grandma.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Guy.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/HaveYouHeard1.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/HaveYouHeard2.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Jazz.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Llama.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Money.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Mustache.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Sink.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/TakeaVaca.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/WholeEnchilada.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/AllIAvoNeed.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Baked.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Summer.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Birthday.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Gnome.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Overthinking.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../../assets/images/Popular2.png"),
        },
      },
    ];
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal visible={this.state.visible} transparent={false}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ visible: false })}
              style={styles.close}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>

            <ImageViewer
              useNativeDriver={true}
              imageUrls={attaches}
              index={this.state.index}
              onChange={(index) => this.setState({ index })}
            />
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => this.onShare(null)}
            >
              <Text style={styles.appButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.pillscontainer}>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(18);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 0 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/WhoWantstoJoin.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(2);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 1 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Beingababy.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(3);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 2 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/DonutCare.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(4);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 3 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Eggsactly.png")}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(5);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 4 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Finally.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(6);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 5 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/FoxSake.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(7);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 6 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Grandma.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(8);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 7 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Guy.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(9);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 8 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/HaveYouHeard1.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(10);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 9 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/HaveYouHeard2.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(11);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 10 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Jazz.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(12);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 11 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Llama.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(13);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 12 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Money.png")}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(14);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 13 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Mustache.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(15);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 14 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Sink.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(16);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 15 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/TakeaVaca.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(17);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 16 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/WholeEnchilada.png")}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(18);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 17 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/AllIAvoNeed.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(19);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 18 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Baked.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(20);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 19 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Summer.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(21);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 20 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Birthday.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(22);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 21 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Gnome.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(23);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 22 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Overthinking.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.menuscreenpills, styles.boxShadow]}>
                <TouchableOpacity
                  style={styles.ShareNow}
                  onPress={() => {
                    this.onShare(24);
                  }}
                >
                  <AntDesign name="sharealt" size={22} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ visible: true, index: 23 })}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Popular2.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ShareUs;