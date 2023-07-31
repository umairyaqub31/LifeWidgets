import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigator from "./DrawerNavigator";
import { Host } from 'react-native-portalize';
import { AuthStackNavigator } from "./StackNavigator";
import {AuthContext} from "./context"
import {connect} from 'react-redux';
import {LifeWidget, Config} from "@common";

class Navigation extends React.Component{

  UNSAFE_componentWillMount() {
    LifeWidget.init({
      url: Config.lifeWidget.endpoint,
    });

    if(this.props.User.token){
      LifeWidget.setClientToken(this.props.User.token);
    }
  }

  render(){
    return(
      
        <Host>
          {this.props.User.user? 
            <DrawerNavigator />
        :
           <AuthStackNavigator />
        }
        </Host>
    
    )
  }
}

const mapStateToProps = ({ User }) => ({ User });


export default connect(mapStateToProps,null)(Navigation);

