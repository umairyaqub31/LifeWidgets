import * as React from 'react';
import {Groupcreate} from '@containers';

export default function GroupCreateScreen({navigation}) {
  // const [count, setCount] = React.useState(0);
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: (props) => (
  //       <TouchableOpacity style={{flex:1,padding:10}} onPress={onPressMoreButton}>
  //           <AntDesign name="pluscircle" size={20} color="black" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, setCount]);
  return (
      <Groupcreate navigation={navigation} />
  );
}
