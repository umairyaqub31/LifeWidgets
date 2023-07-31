import * as React from 'react';
import {DeviceEventEmitter} from "react-native";
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from "react-redux";


class FeedFilterHeader extends React.Component {
    constructor(props) {
        super(props);
        this.peopleSearchEvent;
    }

    onChangeText = (search) => {
      clearTimeout(this.peopleSearchEvent);
        this.peopleSearchEvent = setTimeout(() => {
          DeviceEventEmitter.emit('event.people.search',search);
          DeviceEventEmitter.emit('event.group.search',search);
          //DeviceEventEmitter.emit('event.bar.search',search);
        }, 200);
      
    }

    render() {
      return (
        <TextInput placeholder='Search'  onChangeText={this.onChangeText} style={styles.searchInput}/>
      );
    }
}

const mapStateToProps = ({ People }) => {
  return { search:People.search };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    setPeopleSearch:(search) => {
        dispatch(actions.setPeopleSearch(search))
    }
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FeedFilterHeader);

