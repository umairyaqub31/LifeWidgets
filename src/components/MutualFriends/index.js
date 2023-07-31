import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { Avatar } from 'react-native-paper';


export default function MutualFriends({navigation}) {
  return (
    <View style={styles.mutualtextimagescontainer}>
        <View style={styles.mutualimagescontainer}>
            <Avatar.Image size={16} style={styles.mutualimages} source={require('../../../assets/images/avatar.png')} />
            <Avatar.Image size={16} style={[styles.mutualimages,{marginLeft:-2}]} source={require('../../../assets/images/avatar.png')} />
        </View>
        <Text style={styles.graytext}>16 mutual friends</Text>
    </View>
  );
}

