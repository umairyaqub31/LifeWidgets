import * as React from 'react';
import {ChangePassword} from '@containers';


export default function ChangePasswordScreen({route,navigation}) {
  return (
      <ChangePassword navigation={navigation} route={route} />
  );
}
