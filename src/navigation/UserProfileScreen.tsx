import * as React from 'react';
import {UserProfile} from '@containers';


export default function UserProfileScreen({route,navigation}) {
  return (
      <UserProfile navigation={navigation} route={route} />
  );
}
