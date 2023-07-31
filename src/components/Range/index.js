import * as React from 'react';
import { View, Text } from 'react-native';
import colors from "../../config/color/color";
import RangeSlider from 'react-native-range-slider-expo';
import styles from '../../containers/Flirt/FlirtSetting/styles';

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromValue:'50',
      toValue:'10'
    };
  }

  fromValueOnChange = (fromValue) =>{
     this.setState({fromValue})
  }
  toValueOnChange = (toValue) =>{
    this.setState({toValue})
  }
  render(){
      return (
        <>
        <View style={{height:60}}>
          <RangeSlider min={50} max={10}
            fromValueOnChange={(e)=>this.fromValueOnChange(e)}
            toValueOnChange={(e)=>this.toValueOnChange(e)}
            initialFromValue={0}
            initialToValue={10}
            step={1}
            inRangeBarColor={colors.primary}
            fromKnobColor={colors.primary}
            toKnobColor={colors.primary}
            valueLabelsBackgroundColor={colors.primary}
            outOfRangeBarColor={colors.gray}
            styleSize={22}
            showRangeLabels={false}
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.textBold}>{this.state.fromValue} Feet</Text>
          <Text style={styles.textBold}>{this.state.toValue} Miles</Text>
        </View>
        </>
  );
  }
}


export default Range;