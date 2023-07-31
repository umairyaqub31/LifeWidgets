import * as React from "react";
import {
  View,
} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { RequestCopy,AvailableCopy } from '@components'

const FirstRoute = () => (
  <RequestCopy />
);

const SecondRoute = () => (
  <AvailableCopy />
);

export default function AccessInformation(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Request Copy' },
    { key: 'second', title: 'Available Copies' },
  ]);

  React.useEffect(() => {
    if(typeof props.route.params !=="undefined"){
      if(props.route.params.is_ready){
        const timer = setTimeout(() => {
          setIndex(1);
        }, 1000);
        return () => clearTimeout(timer);

        
      }
    }
  }, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      indicatorContainerStyle={{ backgroundColor: colors.white }}
      activeColor={colors.primary}
      inactiveColor={colors.black }
      labelStyle={{fontFamily: FontFamily.Medium,fontSize:12}}
    />
  );
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
}

