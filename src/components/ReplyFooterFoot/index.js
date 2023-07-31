import * as React from 'react';
import {  Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import colors from "../../config/color/color";


class ReplyFooterFoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
        };
        this.likeClick = this.likeClick.bind(this);
    }

    likeClick() {
        this.setState({
          liked: !this.state.liked,
        });
    }

    
  render() {
    const likedColor = !this.state.liked ? colors.gray : 'green';
  return (
    <View style={styles.replyfooter}>
        <TouchableOpacity style={[styles.replyfooticonopacity,styles.replyfooticonopacityleft]} onPress={this.likeClick}>
            <Text style={[styles.graytext,{color:likedColor}]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyfooticonopacity}>
            <Text style={styles.graytext}>Reply</Text>
        </TouchableOpacity>
    </View>
     );
    }
}

export default ReplyFooterFoot;
