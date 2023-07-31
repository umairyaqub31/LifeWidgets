import * as React from 'react';
import {PeopleReacted} from '@containers';


export default function PeopleReactedScreen({route,navigation}) {
  return (
      <PeopleReacted navigation={navigation} route={route} />
  );
}
