import * as React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import colors from "../../config/color/color";

class Profileimagegroupshare extends React.Component {
    constructor(props) {
        super(props);
    }
      render() {
        return (
            <View style={styles.profileimagewithoption}>
                    <View style={styles.profileimage}>
                    <Avatar.Image size={48} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity><Text style={styles.username}>John Charles</Text></TouchableOpacity>
                            <MaterialIcons name="play-arrow" size={24} color={colors.gray} />
                            <TouchableOpacity><Text style={styles.username}>Domain Hub</Text></TouchableOpacity>
                        </View>
                        <View style={styles.timeslotstatus}>
                            <Text style={styles.timeago}>15h</Text>
                            <View style={styles.timeagodot}></View>
                            <Image style={styles.timeagoearth} source={require('../../../assets/images/Earth.png')} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.optionopacity} onPress={this.props.SavepostPopup}>
                    <Image style={styles.option} source={require('../../../assets/images/options.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}


export default Profileimagegroupshare;

