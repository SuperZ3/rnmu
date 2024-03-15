import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Button,
  Ripple,
} from '../components';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = Drawer.Navigator

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Drawer.Screen name="Buttons" component={Button}></Drawer.Screen>
        <Drawer.Screen name="Ripple" component={Ripple}></Drawer.Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator
