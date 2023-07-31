import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground
} from "react-native";
import styles from "./styles";
import { Avatar, Switch } from "react-native-paper";
import colors from "../../../config/color/color";
import { Ionicons, Feather,AntDesign } from '@expo/vector-icons';
import {connect} from 'react-redux';


class OpenFlirts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
            <View style={styles.candidateContainer}>
              <View style={[styles.candidateContainerGrid]}>
                  <View style={styles.candidateContainerBody}>
                    <Avatar.Image style={styles.avatarImg} size={142} source={{uri:'https://images.all-free-download.com/images/graphiclarge/hiphop_figure_picture_9_167936.jpg'}} />
                    <TouchableOpacity style={styles.primaryBtn}>
                        <Text style={styles.primaryBtnText}>View Profile</Text>
                      </TouchableOpacity>
                  </View>
                  <TextInput
                      multiline
                      numberOfLines={12}
                      style={styles.postTextarea}
                      placeholder="What's on your mind?"
                    />
                    <View style={styles.Footter}>
                      <TouchableOpacity>
                        <Feather name="user-plus" size={28} color="black" />
                      </TouchableOpacity>
                      <View style={styles.flirtList}>
                        <Text style={styles.textBold}>Open to meet</Text>
                        <Switch value={this.props.isSwitchOn} onValueChange={(e) => this.props.isSwitchOnClick(this.props.isSwitchOn)} />
                      </View>
                      <View style={styles.flirtList}>
                        <Text style={styles.textBold}>End</Text>
                        <Switch value={this.props.isSwitchOn} onValueChange={(e) => this.props.isSwitchOnClick(this.props.isSwitchOn)} />
                      </View>
                    </View>
              </View>
            </View> 
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSwitchOn   : state.PopupReducers.isSwitchOn,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    isSwitchOnClick : (event) => dispatch({type: "HANDLE_SWITCHCLICK_SUCCESS",payload:event}),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(OpenFlirts);