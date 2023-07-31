import * as React from 'react';
import {RelationshipUser} from '@containers';


export default function RelationshipUserScreen({route,navigation}) {
  return (
      <RelationshipUser navigation={navigation} route={route} />
  );
}
