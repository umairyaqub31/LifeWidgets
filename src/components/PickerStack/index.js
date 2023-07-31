import React from 'react'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import styles from './styles'
import {Picker} from '@react-native-picker/picker';

function PickerStack({label, value, onValueChange, options, customStyles}) {
  return (
    <View style={{...styles.pickerStack, ...customStyles}}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
      >
        {options.map((val) => (
          <Picker.Item key={val} label={String(val)} value={val} />
        ))}
      </Picker>
    </View>
  )
}

PickerStack.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  customStyles: PropTypes.object,
}

export default PickerStack
