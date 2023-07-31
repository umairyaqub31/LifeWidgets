import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import {
  AllTabs,
  BarsTabs,
  FriendsTabs,
  GroupsTabs
 } from '@components';
 import { connect } from "react-redux";

const All = () => ( <AllTabs /> );
   
const Bars = () => ( <BarsTabs />);

const Groups = () => ( <GroupsTabs/>);

const Friends = () => ( <FriendsTabs />);

const initialLayout = { width: Dimensions.get('window').width };

const getTabBarIcon = (props, index, routes) => {
  const { route } = props;
  if (route.key === "all") {
    let tabIndex = routes.findIndex((data) => data.key === "all");
    return (
      <Text style={{
        color: index === tabIndex ? colors.primary : colors.gray,
        fontFamily: FontFamily.Medium,
        fontSize:16
      }}>All</Text>
    );
  } else if (route.key === "bars") {
    let tabIndex = routes.findIndex((data) => data.key === "bars");
    return (
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{
              color: index === tabIndex ? colors.primary : colors.gray,
              fontFamily: FontFamily.Medium,
              fontSize:16
            }}>Bars</Text>
      </View>
    );
  } else if (route.key === "groups") {
    let tabIndex = routes.findIndex((data) => data.key === "groups");
    return (
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{
            color: index === tabIndex ? colors.primary : colors.gray,
            fontFamily: FontFamily.Medium,
            fontSize:16
          }}>Groups</Text>
      </View>
    );
  } else if (route.key === "friends") {
    let tabIndex = routes.findIndex((data) => data.key === "friends");
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={{
          color: index === tabIndex ? colors.primary : colors.gray,
          fontFamily: FontFamily.Medium,
          fontSize:16,
        }}>People</Text>
      </View>
    );
  } 
};
 



function FeedFilter(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      // { key: 'all', title: 'All' },
      // { key: 'bars', title: 'Bars' },
      { key: 'friends', title: 'Friends' },
      { key: 'groups', title: 'Groups' },
      
    ]);

    React.useEffect(() => {
      props.selectTab("bar");
    },[]);

    const onIndexChange = (index) => {
      let tab = "people";
      if(index==1){
        tab = "group";
      }
      props.selectTab(tab);
      setIndex(index);
    }
   
    const renderScene = SceneMap({
        all: All,
        bars: Bars,
        groups:Groups,
        friends:Friends
    });

    const renderTabBar = props => (
        <TabBar
          {...props}
          scrollEnabled={false}
          indicatorStyle={{ backgroundColor: colors.primary}}
          style={{ backgroundColor: 'white'}}
          renderLabel={false}
          renderIcon={(props) => getTabBarIcon(props, index, routes)}
        />
      );
   
    return (
        <TabView    
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            renderTabBar={renderTabBar}
        />
    );
  }

  
  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { actions } = require("@redux/UserRedux");
    return {
      ...ownProps,
      ...stateProps,
      selectTab: (data) => {
        dispatch(actions.selectTab(data));
      },
    };
  };
  export default connect(undefined, undefined, mergeProps)(FeedFilter);