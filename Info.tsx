import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useCodePush} from './CodePushProvider';

const Info = () => {
  const {status, progress, label} = useCodePush();

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{status}</Text>
      <Text>{progress}</Text>
      <Text>{label}</Text>
    </SafeAreaView>
  );
};

export default Info;
