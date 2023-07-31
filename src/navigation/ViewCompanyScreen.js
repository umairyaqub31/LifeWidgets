import * as React from 'react';
import {ViewCompany} from '@containers';


export default function ViewCompanyScreen({route,navigation}) {
  return (
      <ViewCompany navigation={navigation} route={route} />
  );
}
