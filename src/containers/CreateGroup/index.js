import * as React from  'react'
import { Alert, StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity,Image } from 'react-native'
import { connect } from 'react-redux'
// import User from './renderUser'
import {FriendsList, RenderUser} from '@components'
import { BTN_TYPE } from '../../helpers/constants'
import { Ionicons, AntDesign,Octicons ,MaterialIcons } from '@expo/vector-icons';
import {
  FAB
} from 'react-native-paper';
import ChatService from '../../services/chat-service'
import UsersService from '../../services/users-service'

class CreateGroup extends React.Component {
  isGroupDetails = false

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <FriendsList type="selection" />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
  searchUser: {
    margin: 10
  },
  searchInput: {
    fontSize: 18,
    fontWeight: '300',
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'grey',
    color: 'black',
    padding: 10,
  },
  dialogTypeContainer: {
    marginHorizontal: 12,
    paddingVertical: 10
  },
  dialogType: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialogTypeText: {
    marginHorizontal: 5,
    fontSize: 16
  },
  containerCeletedUsers: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    margin: 10
  },
  selectedUser: {
    width: 70,
    paddingBottom: 5,
    alignItems: 'center',
  },
  userNotFound: {
    fontSize: 17,
    marginTop: 20,
    textAlign: 'center'
  }
})

// const mapStateToProps = ({ dialogs }) => ({
//   dialogs
// })

// export default connect(mapStateToProps)(CreateGroup)
 export default (CreateGroup)
