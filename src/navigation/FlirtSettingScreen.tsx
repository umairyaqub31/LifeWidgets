import * as React from 'react';
import { FlirtSetting } from '@containers';


export default function FlirtSettingScreen({route,navigation}) {
  return (
      <FlirtSetting navigation={navigation} route={route}/>
  );
}
