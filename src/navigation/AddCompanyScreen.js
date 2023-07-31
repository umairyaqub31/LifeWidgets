import * as React from 'react';
import {AddCompany} from '@containers';


export default function AddCompanyScreen({route,navigation}) {
  return (
      <AddCompany navigation={navigation} route={route} />
  );
}
