import * as React from 'react';
import { Text, TouchableOpacity, View,Dimensions,TextInput, Platform,
  UIManager,Button,FlatList, } from 'react-native';
import styles from './styles';
import { FontAwesome,Ionicons,FontAwesome5,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Divider, Avatar } from 'react-native-paper';
import { ChoosePrivacyPost } from '@components'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class AddPostPrivacyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.modalizeRef = React.createRef();
   }

    modalizeOpen  = () => {
      this.modalizeRef.current?.open();
    };   

    render() {
      return (
        <Portal>
          <Modalize ref={this.modalizeRef} snapPoint={310}>
            <View style={styles.windowWidth}>
                <View style={styles.popUpHead}>
                <TouchableOpacity style={styles.touchOpacity} onPress={()=> this.modalizeRef.current?.close()}>
                    <AntDesign name="close" size={20} color={colors.black} />
                </TouchableOpacity>
                <Text style={styles.heading}>Select Privacy</Text>
                <TouchableOpacity style={styles.touchOpacity} onPress={()=> this.modalizeRef.current?.close()}>
                    <Text style={styles.textPrimary}>Done</Text>
                </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>

                <ChoosePrivacyPost {...this.props}/>
            </View>
          </Modalize>
        </Portal>
      );
  }
}

export default AddPostPrivacyStatus;