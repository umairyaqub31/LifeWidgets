import * as React from "react";
import { connect } from "react-redux";
import { FAB } from 'react-native-paper';
import * as RootNavigation from "../../common/NavigationService";

class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  navigation = () => {
    RootNavigation.navigate(this.props.navigate);
  }

  render() {
    const { selected } = this.props;
    if(selected.length===0){
        return null;
    }
    return (
        <FAB
          style={{
            position: "absolute",
            margin: 30,
            right: 10,
            bottom: 0,
            backgroundColor: "#0d96ff",
          }}
          large
          icon="check"
          onPress={this.navigation}
        />
      );
  }
}

const mapStateToProps = (state) => {
  return {
    selected:typeof state.Message.selectedItems !== "undefined"?state.Message.selectedItems:[],
  };
};
export default connect(mapStateToProps)(CreateButton);