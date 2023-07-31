import * as React from 'react';
import {MyPictures} from '@containers';


export default function MyPicturesScreen({route,navigation}) {
  return (
      <MyPictures navigation={navigation} route={route} />
  );
}
