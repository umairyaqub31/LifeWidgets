import * as React from 'react';
import {  Text, View, Image, FlatList } from 'react-native';
import { connect } from "react-redux";
import styles from '../styles';
class FeedWelcome extends React.PureComponent {
  constructor(props) {
    super(props);
      this.state = {}
  }
  renderItem = ({item}) => {
      return (
          <View style={{flex:1}}>
          <Image
            style={{flex:1}}
            source={item}
          />
          </View>
      )
  }
  onEndReached = () => {
      this.props.welcomeDone(true);
  }
render() {
    const {feedWelcomeCompleted=false} = this.props.user ;
    const welcomeSteps = [require("../../../../assets/images/feedWelcome/0.png"),
                            require("../../../../assets/images/feedWelcome/1.png"),
                            require("../../../../assets/images/feedWelcome/2.png"),
                            require("../../../../assets/images/feedWelcome/3.png"),
                            require("../../../../assets/images/feedWelcome/4.png"),
                            require("../../../../assets/images/feedWelcome/5.png")]
      if (feedWelcomeCompleted) {
          return (null);
      }
      return (
        <View style={styles.container}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            data={welcomeSteps}
            renderItem={this.renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
          />
        </View>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.User,
    };
  };
  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { actions } = require("@redux/UserRedux");
    return {
      ...ownProps,
      ...stateProps,
      welcomeDone:(status) => {
        dispatch(actions.feedWelcomeDone(status))
      }
    };
  };
  export default connect(mapStateToProps, undefined, mergeProps)(FeedWelcome);
