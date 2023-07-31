import * as React from 'react';
import { Text, TouchableOpacity, View, Dimensions, TextInput, FlatList } from 'react-native';
import styles from './styles';
import { Ionicons,FontAwesome5,AntDesign } from '@expo/vector-icons';
import colors from "../../../config/color/color";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class AgeRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromValue:'18',
      toValue:'65 +'
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
             <RangeSlider min={18} max={65}
                  fromValueOnChange={(e)=>this.fromValueOnChange(e)}
                  toValueOnChange={(e)=>this.toValueOnChange(e)}
                  initialFromValue={18}
                  initialToValue={65}
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
              <Text style={styles.textBold}>{this.state.fromValue} Years</Text>
              <Text style={styles.textBold}>{this.state.toValue} + Years</Text>
            </View>
        </>
  );
  }
}


export default AgeRange;