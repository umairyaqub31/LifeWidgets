import * as React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import { Footericons, Postdescription, Postimagesgallery,Profileimagegroupshare} from '@components';
import { Avatar } from 'react-native-paper';

export default class Grouppost extends React.Component{
    constructor(props) {
        super(props);
    }
  render(){
    return (
        <View>
            <View style={styles.postcontainer}>
                <Profileimagegroupshare {...this.props} />
                <View style={styles.grouppostshareoutline}>
                    <View style={styles.grouppostsharespaceing}>
                        <View style={styles.profileimagewithoption}>
                            <View style={styles.profileimage}>
                                <Avatar.Image size={38} style={styles.avatarimage} source={require('../../../assets/images/avatar2.png')} />
                                <View>
                                    <TouchableOpacity><Text style={styles.username}>John Doe</Text></TouchableOpacity>
                                    <View style={styles.timeslotstatus}>
                                        <Text style={styles.timeago}>15h</Text>
                                        <View style={styles.timeagodot}></View>
                                        <Image style={styles.timeagoearth} source={require('../../../assets/images/Earth.png')} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Postdescription {...this.props} />
                    </View>
                    <Postimagesgallery {...this.props} />
                </View>
                <Footericons {...this.props}/>
            </View>
            <View style={styles.postcontainer}>
                <Profileimagegroupshare {...this.props} />
                <Postdescription {...this.props} />
                <Postimagesgallery {...this.props} />
                <Footericons {...this.props} />
            </View>
        </View>
      );
  }
  
}

