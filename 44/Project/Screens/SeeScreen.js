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
  FlatList,
} from 'react-native';
import { firebase } from '@react-native-firebase/database';

function SeeScreen({navigation:{navigate}})
{

  const reference = firebase.app().database("https://qrcodes-f1d98-default-rtdb.europe-west1.firebasedatabase.app/");
  const[post,setPost]= useState([]);

  reference.ref('info')
    .on('value',(snapshot)=>
    {
        setPost([]);
        snapshot.forEach((child)=>
        {
            const newObj ={
                id: child.val().id,
                itemName: child.val().itemName,
            };
            setPost(emptyArray=>[...emptyArray,newObj]);
        })
    })

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
            <FlatList 
           data={post}
           renderItem={(item)=> {
             return(
             <View>
             <Text>
              {item.item.username}
              </Text>
                 </View>
               )
                                        }}
                                        />
            </View>
         
            <View style={styles.ButonCh}>
                 <TouchableOpacity onPress={()=>SpringAnimation(animationStart)}>
                     <Animated.View style={[styles.Button1Style, {transform:[{scale:animationStart}]}]}>
                         <Text style={styles.ActiveText}>
                           See all
                         </Text>
                     </Animated.View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>[SpringAnimation(animationStart2), navigate('Add post')]}>
                     <Animated.View style={[styles.ButtonStyle, {transform:[{scale:animationStart2}]}]}>
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

export default SeeScreen;