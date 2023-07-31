import * as React from 'react';
import { Button } from 'react-native';
import FeedVertical from '@containers/Feed/FeedVertical';


export default function FeedScreen({route,navigation}) {
  return (
    <>
      <FeedVertical navigation={navigation} route={route} />
    </>
  );
}
