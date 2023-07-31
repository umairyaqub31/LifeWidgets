import * as React from 'react';
import {RestaurantsFilters} from '@containers';


export default function RestaurantsFiltersScreen({route,navigation}) {
  return (
      <RestaurantsFilters navigation={navigation} route={route}/>
  );
}
