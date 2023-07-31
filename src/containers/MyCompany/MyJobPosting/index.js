import * as React from 'react';
import { Text,  View,  ScrollView } from 'react-native';
import styles from './styles';


class MyJobPosting extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <View style={styles.container}>
          <View style={styles.scrolledview}>
              <Text style={styles.heading}>Coming Soon</Text>
          </View>
      </View>
    )
  }
}

export default MyJobPosting;
