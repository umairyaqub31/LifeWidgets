import * as React from 'react';
import {FeedDetail} from '@containers';



export default function FeedDetailScreen({route,navigation}) {
  return (
      <FeedDetail navigation={navigation} route={route}/>
      
  );
}
