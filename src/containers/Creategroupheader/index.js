import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,  Image,Animated,PanResponder } from 'react-native';
import styles from './styles';
import { MaterialCommunityIcons,FontAwesome5, Feather, AntDesign,MaterialIcons } from '@expo/vector-icons';



class Creategroupheader extends React.Component {
  constructor(props) {
      super(props);
    }
    render() {
      return (
        <View style={styles.creategroupheadercontainer}>
          <Text style={styles.heading}>Create Group</Text>
          <TouchableOpacity style={styles.customchipicons} onPress={() => this.props.navigation.navigate('CreateGroup')}>
              <AntDesign name="pluscircle" size={22} color="black" />
          </TouchableOpacity>
        </View>
      );
  }
}

export default Creategroupheader;