import * as React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { Divider } from 'react-native-paper';
import GroupsTabs from '../GroupsTabs'
import BarsTabs from '../BarsTabs'
import FriendsTabs from '../FriendsTabs'

class AllTabs extends React.Component {
    
      render() {
        return (
            <View style={styles.container} >
                <ScrollView style={styles.scrolledview}>
                
                    <GroupsTabs />
                    <Divider style={styles.separator}/>
                    <BarsTabs />
                    <Divider style={styles.separator}/>
                    <FriendsTabs />
                </ScrollView>
            </View>
        );
    }
}


export default AllTabs;

