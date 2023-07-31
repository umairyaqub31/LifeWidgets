import * as React from 'react';
import { TextInput, Text, View, ScrollView,FlatList  } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Avatar , Divider } from 'react-native-paper';




const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const CountryList = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  
    return(
      <View style={styles.container}>
           <ScrollView style={styles.scrolledview}>
                <View  style={[styles.roundedtextinputcontainer,styles.boxShadow]}>
                    <Ionicons name="ios-search" size={24} color={colors.gray} />
                    <TextInput
                        style={styles.roundedtextinput}
                        placeholder="Search country"
                    />
                </View>
                <Divider style={styles.separator} />
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
           </ScrollView>
      </View>
    )
}


export default CountryList;
