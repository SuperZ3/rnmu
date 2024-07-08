import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { Button } from '@rnmu/components';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
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
