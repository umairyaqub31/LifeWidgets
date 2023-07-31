import * as React from 'react'
import {View, TouchableOpacity, Text, Image } from 'react-native'
import styles from './styles';
import { Ionicons, AntDesign,Octicons,MaterialIcons  } from '@expo/vector-icons';
import {
  FAB
} from 'react-native-paper';
export default class RenderUser extends React.Component {
  state = {
    isSelectedUser: false
  }

  toggleUserSelect() {
    const { selectUsers, user } = this.props
    console.log('userss',selectUsers);

    selectUsers(user)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUsers !== this.props.selectedUsers) {
      this.setState({ isSelectedUser: this.props.selectedUsers })
    }
  }

  render() {
    const { user, selectedUsers,dialogType } = this.props
    const { isSelectedUser } = this.state
    console.log(selectedUsers,'selectedUsers');
    console.log(user,'user');
    console.log(dialogType,'dialogType');
    return (
 

<TouchableOpacity onPress={() => this.toggleUserSelect()}>
<View style={styles.container}>
  <View style={styles.userContainer}>
    {user.profile_photo == '' ?

      <Image style={{borderRadius: 25, height: 50, width: 50, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} source={require('../../../assets/images/avatar.png')} />  

      :
      <Image style={{borderRadius: 25, height: 50, width: 50, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} source={{uri:user.profile_photo}} />  

}
    <Text style={styles.nameTitle}>{user.full_name}</Text>
  </View>
  <>
    {dialogType ? isSelectedUser || selectedUsers ? (
      <AntDesign name="checkcircle" size={24} color="green" />
    ) : (
      <MaterialIcons name="radio-button-unchecked" size={24} color="red" />
      ) : <AntDesign name="arrowright" size={24} color="black" />
    }
  </>

</View>
</TouchableOpacity>
    );
  }
}