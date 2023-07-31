import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import colors from "../../config/color/color";
import {connect} from 'react-redux';


class RestaurantsFavorites extends React.Component{
  constructor(props) {
    super(props);
}

addFavourite = () => {
  if(this.props.item.is_favourite){
    this.props.item.is_favourite = false;
    this.props.removeBarFavourite(this.props.item)
  } else {
    this.props.item.is_favourite = true;
    this.props.addBarFavourite(this.props.item)
  }
  this.forceUpdate();
}

  render(){
    const favoriteColor = !this.props.item.is_favourite ? colors.gray : colors.primary;
    return(
        <TouchableOpacity style={styles.iconOpacity} onPress={this.addFavourite}>
            <AntDesign name="heart" size={24} color={favoriteColor} />
        </TouchableOpacity>
    )
  }
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    addBarFavourite:(item) => {
      actions.addBarFavourite(dispatch, item);
    },
    removeBarFavourite:(item) => {
      actions.removeBarFavourite(dispatch, item);
    }
  };
};
export default connect(undefined, undefined, mergeProps)(RestaurantsFavorites);