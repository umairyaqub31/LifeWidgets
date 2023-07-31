import * as React from 'react';
import {  Text, View, Image } from 'react-native';
import styles from './styles';
import CountDown from 'react-native-countdown-component';
import moment from "moment";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { connect } from "react-redux";

class FeedLocked extends React.Component {
  constructor(props) {
    super(props);
      this.state = {}
  }

  componentDidMount(){
    //this.props.addBreak(null)
    const {breakTime} = this.props.user;
    var now = moment(new Date());
    var end = moment(breakTime);
    var duration = moment.duration(end.diff(now));
    var asSeconds = duration.asSeconds();
    if(asSeconds<0){
      this.props.addBreak(null)
    }
  }
 

  render() {
    const {breakTime} = this.props.user;
    var now = moment(new Date());
    var end = moment(breakTime);
    var duration = moment.duration(end.diff(now));
    var asSeconds = duration.asSeconds();

    return (
      <View style={styles.container}>
      <View style={styles.scrolledView}>
          <View style={{alignItems:'center',marginTop:20}}>
            <Image style={styles.headerlogo} source={require('../../../../assets/images/logo.png')}/>
          </View>
          <View style={{flex:1}}>
            <View style={styles.setFeedLockedTime}>
              <View style={styles.spacing} />
              <Text style={styles.heading}>You have locked yourself out until:</Text>
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={styles.heading}>Time Remaining</Text>
                <View style={styles.spacing} />
                <CountDown
                    size={35}
                    until={asSeconds}
                    onFinish={() => this.props.addBreak(null)}
                    digitStyle={{backgroundColor: colors.primary}}
                    digitTxtStyle={{color: colors.white}}
                    timeLabelStyle={{color: colors.primary, fontSize: 15,fontFamily:FontFamily.Regular}}
                    separatorStyle={{color:  colors.primary}}
                    timeToShow={['D', 'H', 'M', 'S']}
                  />
              </View>
            </View>
            <View style={styles.spacing} />
          </View>
        
        </View>
      
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.Post,
    user: state.User,
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    addBreak:(data) => {
      dispatch(actions.addBreak(data))
    } 
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(FeedLocked);
