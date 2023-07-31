import * as React from 'react';
import { AccessInformation } from '@containers';


export default function AccessInformationScreen({route,navigation}) {
  return (
      <AccessInformation navigation={navigation} route={route} />
  );
}
