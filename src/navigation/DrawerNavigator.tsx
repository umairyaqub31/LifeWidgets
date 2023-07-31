import React from "react";
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import MenuScreen from "./MenuScreen";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator 
    
       drawerContent={MenuScreen} 
       drawerStyle={{ width: '80%' }}>
      <Drawer.Screen name="Home" component={TabNavigator} 
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;