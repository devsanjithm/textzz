import React,{useState} from 'react';
import { View, ActivityIndicator, StyleSheet,Modal } from 'react-native';

export default function Loading(props) {
    
  return (
    <Modal
    transparent={true}
    animationType={'none'}
    visible={props.loading}
    onRequestClose={() => {console.log('close modal')}}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size = "large" color="#1e88e5"
          animating={props.loading} />
      </View>
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});