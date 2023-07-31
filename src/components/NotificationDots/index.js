import * as React from 'react';
import { Text, TouchableOpacity, View,Dimensions } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import colors from "../../config/color/color";


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class NotificationDots extends React.Component {
  constructor(props) {
    super(props);
   }
    render() {
      return (
        <TouchableOpacity style={styles.dotsOpacity} onPress={this.props.dotNotifyButton}>
            <Entypo name="dots-three-horizontal" size={20} color={colors.black} />
        </TouchableOpacity>
      );
  }
}

export default NotificationDots;