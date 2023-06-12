/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import CodePush from 'react-native-code-push';
import CodePushProvider from './CodePushProvider';
import Test from './Info';

function App(): JSX.Element {
  return (
    <CodePushProvider
      options={{
        rollbackRetryOptions: {
          delayInHours: 0,
          maxRetryAttempts: 1,
        },
        // installMode: CodePush.InstallMode.IMMEDIATE,
        deploymentKey: 'L9Iy1ruOjR4VQZTonDykGim8qSbrzgnsV2Q_r',
      }}>
      <Test />
    </CodePushProvider>
  );
}

class ClassApp extends Component<{}> {
  state = {
    status: null,
    progress: null,
  };

  codePushStatusDidChange(status: number) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({status: 'Checking for updates.'});
        console.log('Checking for updates.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({status: 'Downloading package.'});
        console.log('Downloading package.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({status: 'Installing update.'});
        console.log('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({status: 'Up-to-date.'});
        console.log('Up-to-date.');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({status: 'Update installed.'});
        console.log('Update installed.');
        break;
    }
  }

  codePushDownloadDidProgress(progress: {
    receivedBytes: number;
    totalBytes: number;
  }) {
    console.log(
      'progress',
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
    this.setState({
      progress:
        progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{this.state.status}</Text>
        <Text>{this.state.progress}</Text>
        <Text>v3</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default CodePush({
//   deploymentKey: 'L9Iy1ruOjR4VQZTonDykGim8qSbrzgnsV2Q_r',
// })(ClassApp);

export default App;
