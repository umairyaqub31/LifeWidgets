import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView,FlatList ,TextInput} from 'react-native';
import styles from './styles';
import {Feather,Ionicons} from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Divider } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';


class ShareInGroup extends React.Component{
  constructor() {
    super();
    this.state = {
      checked: false,
      checked1: false,
      checked3: false,
      checked4: false,
    };
  }

  render(){
    const { checked,checked1,checked3,checked4 } = this.state;
    return(
      <View style={styles.container}>
      <ScrollView>
          <View style={styles.roundedtextinputcontainer}>
              <Ionicons name="ios-search" size={24} color={colors.gray} />
              <TextInput
                  style={styles.roundedtextinput}
                  placeholder="Search for groups"
              />
          </View>
          <View style={styles.scrolledview}>
            <Text style={styles.heading}>Select Groups</Text>
            <Divider style={styles.separator}/>
            <View style={styles.groupInvitefriendscontainer}>
              <View style={styles.profileimage}>
                <TouchableOpacity>
                  <Image style={styles.avatarimage} source={{uri:'https://images.all-free-download.com/images/graphiclarge/hd_pictures_of_animals_01_hd_picture_169003.jpg'}} />
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View  style={{flex:1}}>
                        <TouchableOpacity><Text style={styles.username}>All Information</Text></TouchableOpacity>
                        <Text style={styles.graytext}>Member since September 2015</Text>
                    </View>
                    <Checkbox.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: !checked }); }}
                    />
                </View>
              </View>
            </View>
            <View style={styles.groupInvitefriendscontainer}>
              <View style={styles.profileimage}>
                <TouchableOpacity>
                  <Image style={styles.avatarimage} source={require('../../../assets/images/food1.jpg')} />
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View  style={{flex:1}}>
                        <TouchableOpacity><Text style={styles.username}>Tools Group</Text></TouchableOpacity>
                        <Text style={styles.graytext}>Member since September 2015</Text>
                    </View>
                    <Checkbox.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      status={checked1 ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked1: !checked1 }); }}
                    />
                </View>
              </View>
            </View>
            <View style={styles.groupInvitefriendscontainer}>
              <View style={styles.profileimage}>
                <TouchableOpacity>
                  <Image style={styles.avatarimage} source={{uri:'https://images.all-free-download.com/images/graphiclarge/hd_pictures_of_animals_05_hd_picture_168999.jpg'}} />
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View  style={{flex:1}}>
                        <TouchableOpacity><Text style={styles.username}>Beautiful christmas</Text></TouchableOpacity>
                        <Text style={styles.graytext}>Member since September 2015</Text>
                    </View>
                    <Checkbox.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      status={checked3 ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked3: !checked3 }); }}
                    />
                </View>
              </View>
            </View>
            <View style={styles.groupInvitefriendscontainer}>
            <View style={styles.profileimage}>
              <TouchableOpacity>
                <Image style={styles.avatarimage} source={{uri:'https://images.all-free-download.com/images/graphiclarge/beautiful_christmas_design_elements_32_hd_picture_170649.jpg'}} />
              </TouchableOpacity>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View  style={{flex:1}}>
                      <TouchableOpacity><Text style={styles.username}>Marketing</Text></TouchableOpacity>
                      <Text style={styles.graytext}>Member since September 2015</Text>
                  </View>
                  <Checkbox.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={checked4 ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked4: !checked4 }); }}
                  />
              </View>
            </View>
          </View>
          </View>
      </ScrollView>

    </View>

    );
  }
}



export default ShareInGroup;