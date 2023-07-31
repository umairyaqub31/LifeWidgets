import * as React from 'react';
import {MyCompany} from '@containers';


export default function MyCompanyScreen({route,navigation}) {
  return (
      <MyCompany navigation={navigation} route={route} />
  );
}
