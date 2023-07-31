import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Feather , AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import colors from "../../config/color/color";

class OnlyFavoritesTab extends React.Component {
    constructor(props) {
        super(props);
    }
      render() {
        return (
            <View style={styles.container} >
                <ScrollView style={styles.scrolledview}>
                    <TouchableOpacity style={[styles.profileimagewithoption,{paddingTop:0}]}>
                        <View style={styles.profileimage}>
                            <View style={styles.avataroverly}>
                                <Avatar.Image size={42} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                                <View style={[styles.avataroverlyicon,styles.favorite]}>
                                    <AntDesign name="heart" size={15} color={colors.white} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.username}>John Charles</Text>
                             </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileimagewithoption}>
                        <View style={styles.profileimage}>
                             <View style={styles.avataroverly}>
                                <Avatar.Image size={42} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                                <View style={[styles.avataroverlyicon,styles.favorite]}>
                                    <AntDesign name="heart" size={15} color={colors.white} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.username}>John Charles</Text>
                                <Text style={styles.textgray}>2 mutual friend</Text>
                             </View>
                        </View>
                        <TouchableOpacity style={styles.primarybtn}>
                            <Feather name="user-plus" size={15} color={colors.white} />
                            <Text style={styles.primarybtntext}>Add Friend</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}


export default OnlyFavoritesTab;

