import React from 'react'
import {
  View,
} from 'react-native'
import PropTypes from 'prop-types';
import InViewPort from './InViewPort';

export default class FlatListItem extends React.PureComponent {
  static propTypes = {
    viewComponent: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
    this.viewProperties = {
      width: 0,
      height: 0,
    };
  }

  onLayout(evt) {
    this.viewProperties.width = evt.nativeEvent.layout.width;
    this.viewProperties.height = evt.nativeEvent.layout.height;
  }

  setVisibility(isVisible) {
    if (this.state.isVisible != isVisible) {
      if (isVisible == true) this.setState({ isVisible: true })
      else this.setState({ isVisible: false })
    }
  }

  render() {
    if (this.state.isVisible === false) {
      return (
            <InViewPort onChange={this.setVisibility.bind(this)}>
                <View style={{ width: this.viewProperties.width, height: this.viewProperties.height }} />
            </InViewPort>
        )
    }

    return (
      <InViewPort onChange={this.setVisibility.bind(this)}>
          <View onLayout={this.onLayout.bind(this)}>
            {this.props.viewComponent}
          </View>
      </InViewPort>
    )
  }
}
