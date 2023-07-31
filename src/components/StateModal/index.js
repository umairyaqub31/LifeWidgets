import * as React from "react";
import { Text, Modal, View, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import states from "./../../common/states.json";

class StateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      list: [],
      countryCode: "",
    };
    this.modalizeRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.countryCode !== state.countryCode) {
      let list = states.filter(
        (state) => state.country_code === props.countryCode
      );
      return {
        countryCode: props.countryCode,
        list: list,
      };
    }
    return null;
  }

  renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={[styles.item]}
        onPress={() => {
          this.props.addCompanyForm("b_state", item.name);
          this.setState({ visible: false });
        }}
      >
        <Text style={styles.textStyle}>{item.name}</Text>
      </Pressable>
    );
  };

  render() {
    const { list } = this.state;
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {
            this.setState({ visible: false });
          }}
        >
          <View style={styles.container}>
            <Pressable
              style={styles.close}
              onPress={() => this.setState({ visible: false })}
            >
              <Ionicons name="close-sharp" size={24} color="black" />
            </Pressable>
            <View style={styles.modalView}>
              <FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>
        <View style={this.props.style}>
          <Pressable
            onPress={() => {
              if (this.props.countryCode) {
                this.setState({ visible: true });
              }
            }}
          >
            <Text style={styles.textStyle}>
              {(this.props.b_state || this.props.b_state!=="")? this.props.b_state : "Select State"}
            </Text>
          </Pressable>
        </View>
      </>
    );
  }
}

export default StateModal;