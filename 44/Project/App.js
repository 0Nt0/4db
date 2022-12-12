/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*import React, { cloneElement } from 'react';*/
import React, { Component } from 'react';
/*import type {Node} from 'react';*/
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScreen from './Screens/AddScreen';
import DeleteScreen from './Screens/DeleteScreen';
import SeeScreen from './Screens/SeeScreen';

const Stack = createNativeStackNavigator();


const config = {
    animation: 'spring',
    config: {
      stiffness: 1,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

class App extends Component {

  
  render(){

  return (
     
<NavigationContainer>
    <Stack.Navigator initialRouteName={SeeScreen} screenOptions={ {  gestureEnabled:true,
                       transitionSpec:{
                                         open: config,
                                         close: config,
                                      }
                  }
                }>
      <Stack.Screen name="Main Screen"
                    component={SeeScreen}
                    options={styles.optionsForStack}/>
      <Stack.Screen name="Add post" 
                    component={AddScreen} 
                    options={styles.optionsForStack}/>
      <Stack.Screen name="Delete post" 
                    component={DeleteScreen}
                    options={styles.optionsForStack}/>

    </Stack.Navigator>
    </NavigationContainer>
    
  );
  }
};

const styles = StyleSheet.create({
  optionsForStack:{
   headerStyle:{
   backgroundColor:'#F0F055',
   },
   headerTintColor:'#B048B5',
   headerTitleStyle:{
   fontWeight: 'normal',
   },
   headerTitleAlign:'center', 
   backgroundColor:'#FFF8DC'
  }
  

});

export default App;
