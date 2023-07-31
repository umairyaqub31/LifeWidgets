import * as React from 'react';
import { FlirtCandidates } from '@containers';


export default function FlirtCandidatesScreen({route,navigation}) {
  return (
      <FlirtCandidates navigation={navigation} route={route} />
  );
}
