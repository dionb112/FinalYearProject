import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
 
 
const App = () => {
 return (
   <View style={styles.container}>
     <Text>
       We Will Start Here
     </Text>
   </View>
 );
}
 
export default App;
 
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
   padding: 8,
 },
});