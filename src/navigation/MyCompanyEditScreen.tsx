import * as React from 'react';
import {MyCompanyEdit} from '@containers';


export default function MyCompanyEditScreen({route,navigation}) {
  return (
      <MyCompanyEdit navigation={navigation} route={route} />
  );
}
