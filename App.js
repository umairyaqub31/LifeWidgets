import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "@navigation";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "@redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { LogBox, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import { FirebaseConfig } from "@common";
//import Amplify, {Auth, Storage} from 'aws-amplify'
//import config from './src/aws-exports'
//Amplify.configure();
import ConnectyCube from "react-native-connectycube";
import appConfig from "./connectycube-config.json";
import * as RootNavigation from "./src/common/NavigationService";
import AuthService from "./src/services/auth-service";
import ChatService from "./src/services/chat-service";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import * as Sentry from "sentry-expo";
import { NavigationContainer } from "@react-navigation/native";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const persistConfig = {
  key: "lifeWidgets",
  blacklist: ["navigation"],
  storage: AsyncStorage,
};

const store = compose(applyMiddleware(thunk))(createStore)(
  persistReducer(persistConfig, reducers)
);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Sentry.init({
  dsn: "https://0ac4ed7fe16d4cb998b73fafdc5527c9@o695658.ingest.sentry.io/5776149",
  enableInExpoDevelopment: true,
  debug: true,
});
LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    getdata();
  }, []);

  const persistor = persistStore(store);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getdata = async () => {
    var value = await AsyncStorage.getItem("userdata");
    var parse = JSON.parse(value);

    ConnectyCube.init(...appConfig.connectyCubeConfig);
    AuthService.signIn(parse)
      .then(() => {
        ChatService.setUpListeners();
      })
      .catch((error) => {
        //alert(JSON.stringify(error))
        //console.log(JSON.stringify(error), 'errirriiiii')
      });
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <StatusBar /> */}
        <Provider store={store}>
          <PersistGate
            loading={
              <View style={{ flex: 1 }}>
                <Image
                  source={require("@images/splash.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            }
            persistor={persistor}
          >
            <NavigationContainer
              linking={LinkingConfiguration}
              ref={RootNavigation.navigationRef}
            >
              <Navigation colorScheme={colorScheme} />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}