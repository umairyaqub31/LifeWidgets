import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import colors from "../../config/color/color";
import { Snackbar } from 'react-native-paper';


class SnackbarToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar_visible: false,
    };
    }

    snackbarHandler =()=>{
      this.setState(state => ({ snackbar_visible: !state.snackbar_visible }))
    }

    render() {
      return (
        <>
        <Snackbar
              duration={4000}
              visible={this.state.snackbar_visible}
              onDismiss={() => this.setState({ snackbar_visible: false })}
              action={{
                label: 'view',
                onPress: () => {this.props.navigation.navigate('SavedPost')},
              }}
              style={{backgroundColor: colors.black}}
            >
            <View><Text style={styles.whiteText}>You saved this post</Text></View>
        </Snackbar>
        </>
      );
  }
}



export default SnackbarToggle;