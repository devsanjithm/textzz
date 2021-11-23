import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[ backgroundColor]}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};

export default AppStatusBar;