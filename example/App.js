import { Button } from '@rnmu/theme';
import Ripple from './components/Ripple';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Button />
      <View style={{
        width: 200,
        height: 200,
        borderWidth: 1,
        borderStyle: 'solid',
        position: 'relative'
      }}>
        <Ripple />
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
