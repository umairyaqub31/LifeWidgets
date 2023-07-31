import React, { Component } from 'react'
import { Image } from 'react-native'
import { getCbToken } from '../../helpers/file'

export default class ChatImage extends Component {

  render() {
    const { photo, width, height } = this.props
    let source = {}
    let localPath = false

    if (photo.startsWith('https://')) {
      localPath = false
      source = getCbToken(photo)
    } else {
      localPath = photo
    }

    return (localPath ?
      <Image
        style={{ width, height }}
        source={{ uri: localPath }}
      /> :
      <Image
        style={{ width, height }}
        source={source}
        key={photo}
      />
    )
  }

}


