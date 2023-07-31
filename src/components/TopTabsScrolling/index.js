import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import colors from "../../config/color/color";

class TopTabsScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }

  render() {
    return (
      <>
        <View style={[styles.list,{flex:1.5}]}> 
          <TouchableOpacity style={[styles.animtedTabs,{borderBottomWidth:2}]}>
            <Text style={[styles.animtedTabText,{color:colors.primary}]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.animtedTabs,{}]}>
            <Text style={styles.animtedTabText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.animtedTabs,{}]}>
            <Text style={styles.animtedTabText}>Recent</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}> 
          <TouchableOpacity style={[styles.chipOpcity]} onPress={this.props.topTabsShowPoup}> 
            <Feather name="sliders" size={17} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default TopTabsScrolling;
