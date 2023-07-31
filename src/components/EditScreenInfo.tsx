import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <Text>
          Open up the code for this screen:
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  
});
