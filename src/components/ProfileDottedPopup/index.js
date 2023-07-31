import * as React from 'react';
import { Text, TouchableOpacity, View,  Animated, Dimensions,
} from 'react-native';
import styles from './styles';
import { FontAwesome5,Entypo,AntDesign,Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

class ProfileDottedPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:{}
    };
    this.modalizeRef = React.createRef();
   }

  profileDotsAction  = (item) => {
    this.setState({ item });
    this.modalizeRef.current?.open();
  };


  ReportScreen = () =>{
    this.modalizeRef.current.close();
    this.props.navigation.navigate('Report', {item:this.state.item})
  }
  
  MoreInfoScreen = () =>{
    this.modalizeRef.current.close();
    this.props.navigation.navigate('MoreProfile', {item:this.state.item})
  }
    render() {
      return (
        <Portal>
          <Modalize ref={this.modalizeRef}  adjustToContentHeight={true}>
              <View style={styles.scrolledView}>
              {/* <TouchableOpacity
                style={styles.primaryBtn}
                // onPress={() => this.props.sendFriendRequest(data.id)}
              >
                <Text style={styles.primaryBtnText}>Add Friend</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.modallistcontainer}
                onPress={this.MoreInfoScreen}
              >
                <View style={styles.customchipicons}>
                  <Entypo
                    style={styles.listIcon}
                    name="dots-three-horizontal"
                    size={22}
                    color={colors.gray}
                  />
                </View>
                <View  style={styles.pendinginvitesnamecontainer}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.modallist}>See more about</Text>
                    </View>
                </View>
              </TouchableOpacity>
                <TouchableOpacity style={styles.modallistcontainer} onPress={this.ReportScreen}>
                    <View style={styles.customchipicons}>
                      <AntDesign name="warning" size={26} color={colors.black} />
                    </View>
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Report profile</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.modallistcontainer}>
                      <View style={styles.customchipicons}>
                          <FontAwesome5 name="user-alt-slash" size={26} color={colors.black}/>
                      </View>
                      <View  style={styles.pendinginvitesnamecontainer}>
                          <View style={{marginLeft:10}}>
                              <Text style={styles.modallist}>Block</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modallistcontainer}>
                      <View style={styles.customchipicons}>
                          <Feather name="link" size={20} color={colors.black} />
                      </View>
                      <View  style={styles.pendinginvitesnamecontainer}>
                          <View style={{marginLeft:10}}>
                              <Text style={styles.modallist}>Copy profile link</Text>
                          </View>
                      </View>
                  </TouchableOpacity> */}
              </View>
          </Modalize>
        </Portal>         
      );
  }
}

export default ProfileDottedPopup;