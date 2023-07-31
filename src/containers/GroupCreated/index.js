import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./styles";
import {
  Feather
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar, Divider } from "react-native-paper";
import {
  GroupProfileHead,
  ToolsPopup,
} from "@components";

class GroupCreated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.actionSheetRef = React.createRef();
  }

  toolsPopupButton = () => {
    this.actionSheetRef.current.toolsPopupButton();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <GroupProfileHead toolsPopupButton={this.toolsPopupButton} {...this.props}/>
          <Divider />
          <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={[
                    {key: '1'},{key: '2'}, {key: '3'},{key: '4'},
                ]}  
              renderItem={({ item }) => (
                <View style={styles.pendinginvitescontainer}>
                    <Avatar.Image size={52} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.username}>John Doe</Text>
                            </TouchableOpacity>
                            <Text style={styles.graytext}>16 mutual friends</Text>
                        </View>
                        <TouchableOpacity style={styles.primarybtn}>
                          <Text style={styles.primarybtntext}><Feather name="plus" size={16} color={colors.white} />Invite</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              )}
            />
        </ScrollView>
        <ToolsPopup ref={this.actionSheetRef} />
      </View>
    );
  }
}

export default GroupCreated;
