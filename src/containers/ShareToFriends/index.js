import * as React from 'react';
import { Text, TouchableOpacity, View, ScrollView , TextInput } from 'react-native';
import styles from './styles';
import { Avatar, Checkbox, Divider } from 'react-native-paper';
import { Ionicons  } from '@expo/vector-icons';
import colors from "../../config/color/color";



  
class ShareToFriends extends React.Component {
    constructor() {
        super();
        this.state = {
          checked: false,
          checked1: false,
          checked3: false,
          checked4: false,
        };
      }
    render() {
        const { checked,checked1,checked3,checked4 } = this.state;
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.roundedtextinputcontainer}>
                    <Ionicons name="ios-search" size={24} color={colors.gray} />
                    <TextInput
                        style={styles.roundedtextinput}
                        placeholder="Search Friends"
                    />
                </View>
                <View style ={styles.scrolledview}>
                    <Text style={styles.heading}>Select Friends</Text>
                    <Divider style={styles.separator}/>
                    <View style={styles.pendinginvitescontainer}>
                        <Avatar.Image size={48} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                        <View  style={styles.pendinginvitesnamecontainer}>
                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.username}>Tom Iosmo</Text>
                                </TouchableOpacity>
                                <Text style={styles.graytext}>16 mutual friends</Text>
                            </View>
                            <Checkbox.Android
                                uncheckedColor={colors.primary}
                                color={colors.primary}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: !checked }); }}
                            />
                        </View>
                    </View>
                    <View style={styles.pendinginvitescontainer}>
                        <Avatar.Image size={48} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                        <View  style={styles.pendinginvitesnamecontainer}>
                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.username}>Deel Pop</Text>
                                </TouchableOpacity>
                                <Text style={styles.graytext}>16 mutual friends</Text>
                            </View>
                            <Checkbox.Android
                                uncheckedColor={colors.primary}
                                color={colors.primary}
                                status={checked1 ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked1: !checked1 }); }}
                            />
                        </View>
                    </View>
                    <View style={styles.pendinginvitescontainer}>
                        <Avatar.Image size={48} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                        <View  style={styles.pendinginvitesnamecontainer}>
                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.username}>Koalta John</Text>
                                </TouchableOpacity>
                                <Text style={styles.graytext}>16 mutual friends</Text>
                            </View>
                            <Checkbox.Android
                                uncheckedColor={colors.primary}
                                color={colors.primary}
                                status={checked3 ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked3: !checked3 }); }}
                            />
                        </View>
                    </View>
                    <View style={styles.pendinginvitescontainer}>
                    <Avatar.Image size={48} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.username}>James Kon</Text>
                            </TouchableOpacity>
                            <Text style={styles.graytext}>16 mutual friends</Text>
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
            </ScrollView>
        </View>
    );
    }
}

export default ShareToFriends;