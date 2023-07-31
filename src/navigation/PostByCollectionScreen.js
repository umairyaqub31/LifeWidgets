import * as React from 'react';
import {PostByCollection} from '@containers';


export default function PostByCollectionScreen({route,navigation}) {
  return (
      <PostByCollection navigation={navigation} route={route} />
  );
}
