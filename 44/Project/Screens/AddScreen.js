import React, {useState} from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import QRCodeScanner from 'react-native-qrcode-scanner';


function AddScreen({navigation:{navigate}})
{
  const reference = firebase
  .app()
  .database('https://qrcodes-f1d98-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('/info')
  onSuccess = e => {
    console.log(e.data)

     const newRef = reference.push();
     newRef.set({
         id: newRef.key,
         itemName: e.data,
     })
     .then(() => console.log('Data inserted'))
     .catch(error=>console.log(error));
     
  };
    const animationStart=useRef(new Animated.Value(0)).current
    const animationStart2=useRef(new Animated.Value(0)).current
    const animationStart3=useRef(new Animated.Value(0)).current
    useEffect(()=>{
        animationStart.setValue(1);
        animationStart2.setValue(1);
        animationStart3.setValue(1);
          },[]);
          
    const SpringAnimation=(x)=>{
        x.setValue(0.8)
        Animated.spring(x,{
          toValue:1,
          bounciness:24,
          speed:20,
          useNativeDriver:true
        }).start();
      };
     
    return (
          
        <View style={styles.body}>
            <View style={styles.Main}>
            <QRCodeScanner
              onRead={this.onSuccess}
             // flashMode={RNCamera.Constants.FlashMode.torch}
      /> 
            </View>
         
            <View style={styles.ButonCh}>
                 <TouchableOpacity onPress={()=>[SpringAnimation(animationStart), navigate('Main Screen')]}>
                     <Animated.View style={[styles.ButtonStyle, {transform:[{scale:animationStart}]}]}>
                         <Text style={styles.ActiveText}>
                           See all
                         </Text>
                     </Animated.View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>SpringAnimation(animationStart2)}>
                     <Animated.View style={[styles.Button1Style, {transform:[{scale:animationStart2}]}]}>
                         <Text style={[styles.ActiveText,{marginLeft:10}]}>
                           Add new
                         </Text>
                     </Animated.View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>[SpringAnimation(animationStart3), navigate('Delete post')]}>
                     <Animated.View style={[styles.ButtonStyle, {transform:[{scale:animationStart3}]}]}>
                         <Text style={[styles.ActiveText,{marginLeft:15}]}>
                           Delete
                         </Text>
                     </Animated.View>
                 </TouchableOpacity>
            </View>
        </View>
       
      );
};
const styles = StyleSheet.create({
    body: {
      flexDirection: "column",
      flex: 1,
    },
    Main:{
      flex: 7,
      backgroundColor: '#FFF8DC'
    },
    ButonCh:{
      flex:1,
      backgroundColor: '#FFF8DC',
      flexDirection:'row',
    },
    ButtonStyle:{
        height: 80,
        width:93,
        backgroundColor: '#F0F055',
        borderWidth:3,
        borderColor: '#B048B5',
        borderRadius:50,
        margin:2,
        marginLeft:30
        },
     Button1Style:{
            height: 80,
            width:93,
            backgroundColor: '#FFF8DC',
            borderWidth:3,
            borderColor: '#FDC8FD',
            borderRadius:50,
            margin:2,
            marginLeft:30
            },
    ActiveText:{marginTop:25,
        marginLeft:15,
        color:'#B048B5',
        fontSize:20
         }
  });

export default AddScreen;