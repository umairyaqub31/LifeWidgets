import React, { Component } from 'react'
import {MaterialIcons ,Ionicons,AntDesign } from '@expo/vector-icons'
import {
  STATUS_DELIVERED,
  STATUS_PENDING,
  STATUS_READ,
  STATUS_SENT
} from '../../models/message'

export default class MessageSendState extends Component {
  render() {
    const { send_state } = this.props
    switch (send_state) {
      case STATUS_PENDING:
        return (<MaterialIcons name="query-builder" size={12} color="white" />)
      case STATUS_SENT:
        return (<AntDesign name="check" size={12} color="white" />
        )
      case STATUS_DELIVERED:
        return (<MaterialIcons name="done-all" size={12} color="#fc0000" />)
      case STATUS_READ:
        return (<MaterialIcons name="done-all" size={12} color="black" />)
    }
    return (null)
  }
}
