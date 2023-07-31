import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import colors from "../../config/color/color";
import {connect} from 'react-redux';


class CommentLikeReply extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const likedColor = !this.props.likedtext ? colors.black : 'green';
        return (
            <View style={styles.RecentCommentQuickReplyText}>
                <TouchableOpacity >
                    <Text style={[styles.text,styles.Medium,{color:likedColor}]}>Like</Text>
                </TouchableOpacity>
                {/* <View style={styles.dot}></View> */}
                {/* <TouchableOpacity >
                    <Text style={[styles.text,styles.Medium]}>Reply</Text>
                </TouchableOpacity> */}
                {/* <View style={styles.dot}></View> */}
                {/* <Text style={styles.graytext}>time</Text> */}
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        likedtext   : state.PopupReducers.likedtext,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        likeTextClick : (event) => dispatch({type: "HANDLE_LIKETEXTCLICK_SUCCESS",payload:event}),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentLikeReply);