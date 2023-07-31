import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { Divider , Avatar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { ScrollView } from "react-native-gesture-handler";

class GroupDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
        <View style={styles.container}>
            <ScrollView style ={styles.scrolledview}>
                    <Text style={styles.heading}>About</Text>
                    <Text style={styles.text}>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                     Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci porta dapibus. 
                     Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                     Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.</Text>
                     <View style={styles.listcontainer}>
                        <Feather name="lock"  size={24} color={colors.gray} />
                        <View  style={styles.listcontainerright}>
                            <Text style={styles.labeltext}>Private</Text>
                            <Text style={styles.graytext}>Only members can see who's in the group and what they post.</Text>
                        </View>
                    </View>
                    <View style={styles.listcontainer}>
                        <Feather name="map-pin"  size={24} color={colors.gray} />
                        <View  style={[styles.listcontainerright,styles.grouplocation]}>
                            <Text style={styles.text}>This group is located in</Text>
                            <Text style={styles.labeltext}> Pakistan</Text>
                            <View style={styles.dot}></View>
                            <Text style={styles.labeltext}> Lahore, Pakistan</Text>
                        </View>
                    </View>
                    <Divider style={styles.separtor}/>
                    <Text style={styles.heading}>Group Rules from the admins</Text>
                        <View style={styles.listcontainer}>
                            <Text style={styles.graytext}>1</Text>
                            <View  style={styles.listcontainerright}>
                                <Text style={styles.rulelabeltext}>One</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                            </View>
                        </View>
                        <View style={styles.listcontainer}>
                            <Text style={styles.graytext}>2</Text>
                            <View  style={styles.listcontainerright}>
                                <Text style={styles.rulelabeltext}>TWO</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                            </View>
                        </View>
                        <View style={styles.listcontainer}>
                            <Text style={styles.graytext}>3</Text>
                            <View  style={styles.listcontainerright}>
                                <Text style={styles.rulelabeltext}>THREE</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                                <Text style={styles.graytext}>Vivamus suscipit accumsan id imperdiet et,tortor eget felis porttitor volutpat.</Text>
                            </View>
                        </View>
                        <Divider style={styles.separtor}/>
                            <View style={styles.seeallcontainer}>
                                <Text style={styles.heading}>Members</Text>
                                <TouchableOpacity style={styles.touchopacity} onPress={()=> this.props.navigation.navigate('GroupMembers')}>
                                    <Text style={styles.primarytext}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mutualimagescontainer}>
                                <Avatar.Image size={32} style={styles.mutualimages} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                                <Avatar.Image size={32} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar2.png')} />
                            </View>
                            <Text style={[styles.graytext,styles.lastcomponents]}>John Doe is an admin and 39 other are members</Text>
            </ScrollView>
        </View>
    );
  }
}

export default GroupDescription;
