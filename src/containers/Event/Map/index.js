import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigationRef } from "../../../common/NavigationService";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { connect } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";

const marker = require("../../../../assets/images/marker.png");
Geocoder.init("AIzaSyBi1vr84ffSSHUhmtNdxea9sZNROw3QZho");

const Map = (props) => {
  const [latlng, setLatlng] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const mapRef = React.useRef();
  const [markers, setMarkers] = React.useState({
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    // key: id,
    color: "red",
  });
  const [loc, setLoc] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const addEventForm = (key, value) => {
    let form = Object.assign({}, props.form);
    form[key] = value;
    props.addEventForm(form);
  };

  React.useEffect(() => {
    props.navigation.setOptions({
      headerTintColor: colors.primary,
      headerBackTitleStyle: { fontSize: 18 },
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomColor: "transparent",
        borderWidth: 0,
        elevation: 0,
      },
      headerRight: () => (
        <TouchableOpacity style={styles.headRightOpacity} onPress={submitNext}>
          <Text style={styles.headRightText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const submitNext = () => {
    props.navigation.navigate("CreateCalenderEvent");
  };

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLoc(location);
    })();
  }, []);

  const selectLocation = (data, details) => {
    props.saveAddress(data.description);

    Geocoder.from(data.description)
      .then((json) => {
        var location = json.results[0].geometry.location;

        setLatlng({
          latitude: location.lat,
          longitude: location.lng,
        });

        setMarkers({
          coordinate: {
            latitude: location.lat,
            longitude: location.lng,
          },
        });

        addEventForm("lat_lng", { lat: location.lat, lng: location.lng });
        // setTimeout(() => addEventForm("latitude", location.lat), 1000);
        // setTimeout(() => addEventForm("longitude", location.lng), 500);

        gotToMyLocation(location);
      })
      .catch((error) => console.warn(error));
  };

  const gotToMyLocation = (location) => {
    if (mapRef) {
      mapRef.current.animateToRegion(
        {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        },
        2000
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: latlng.latitude,
          longitude: latlng.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}
        zoomEnabled={true}
        // onRegionChangeComplete={onRegionChange}
        // onPress={(e) => onMapPress(e)}
      >
        <GooglePlacesAutocomplete
          placeholder="Search Address"
          // currentLocation

          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            selectLocation(data, details);
          }}
          query={{
            key: "AIzaSyBi1vr84ffSSHUhmtNdxea9sZNROw3QZho",
            language: "en",
          }}
        />
        <Marker
          // key={markers.key}
          coordinate={markers.coordinate}
          pinColor={markers.color}
        >
          <Image style={{ height: 50, width: 50 }} source={marker} />
        </Marker>
      </MapView>
    </View>
  );
};

const mapStateToProps = ({ Event }) => {
  return {
    form: Event.form,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/EventRedux");
  return {
    ...ownProps,
    ...stateProps,
    addEventForm: (data) => {
      dispatch(actions.addEventForm(data));
    },
    saveAddress: (data) => {
      dispatch(actions.saveAddress(data));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headRightOpacity: {
    minWidth: 60,
    paddingRight: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headRightText: {
    fontFamily: FontFamily.Medium,
    color: colors.primary,
    fontSize: 15,
  },
});
