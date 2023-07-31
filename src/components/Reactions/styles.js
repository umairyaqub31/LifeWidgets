import { StyleSheet, Platform } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
 // Container
 viewContainer: {
  flex: 1,
  flexDirection: 'column'
},

// Body
viewBody: {
  flex: 1,
  flexDirection: 'column'
},

// Top blank space
viewTopSpace: {
  width: '100%',
  height: 100
},

// Main content
viewContent: {
  borderWidth: 1,
  borderColor: 'red',
  flexDirection: 'column',
  height: 320,
  marginLeft: 10,
  marginRight: 10
},

// Box
viewBox: {
  borderRadius: 30,
  width: 320,
  height: 50,
  marginTop: 100,
  marginLeft: 20,
  position: 'absolute',
  // Has to set color for elevation
  backgroundColor: 'white'
  // elevation: 6,
},

// Button like
viewBtn: {
  flexDirection: 'row',
  width: 100,
  justifyContent: 'space-around',
  alignItems: 'center',
  borderWidth: 1,
  padding: 10,
  borderRadius: 3,
  marginTop: 170,
  backgroundColor: 'white'
},
textBtn: {
  color: 'grey',
  fontSize: 14,
  fontWeight: 'bold'
},
imgLikeInBtn: {
  width: 25,
  height: 25
},

// Group icon
viewWrapGroupIcon: {
  flexDirection: 'row',
  width: 320,
  height: 120,
  marginTop: 50,
  position: 'absolute',
  borderWidth: 1,
  borderColor: 'blue',
  alignItems: 'flex-end',
  justifyContent: 'space-around',
  paddingLeft: 5,
  paddingRight: 5
},
viewWrapIcon: {
  justifyContent: 'center',
  alignItems: 'center'
},
imgIcon: {
  width: 36,
  height: 36
},
viewWrapTextDescription: {
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  paddingLeft: 7,
  paddingRight: 7,
  paddingTop: 2,
  paddingBottom: 2,
  position: 'absolute'
},
textDescription: {
  color: 'white',
  fontSize: 8
},

// Group jump icon
viewWrapGroupJumpIcon: {
  flexDirection: 'row',
  width: 330,
  height: 140,
  borderWidth: 1,
  borderColor: 'green',
  marginTop: 30,
  marginLeft: 10,
  position: 'absolute',
  alignItems: 'flex-end'
}
  });
  
export default styles;