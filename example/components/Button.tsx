import { Button as RNB, Icon } from '@rnmu/components';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const Button = () => {
  return (
    <SafeAreaView>
      <View style={styles.row}>
        <RNB onPress={() => {}}>Default</RNB>
        <RNB onPress={() => {}}>Custom</RNB>
        <RNB disabled onPress={() => {}}>
          Disabled
        </RNB>
        <RNB startIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon
        </RNB>
        <RNB loading onPress={() => {}}>
          Loading
        </RNB>
        <RNB endIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon right
        </RNB>
      </View>

      <View style={styles.row}>
        <RNB variant='filled' onPress={() => {}}>Default</RNB>
        <RNB variant='filled' onPress={() => {}} interactionEffect='highlight'>Custom</RNB>
        <RNB variant='filled' disabled onPress={() => {}}>
          Disabled
        </RNB>
        <RNB variant='filled' loading startIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon
        </RNB>
        <RNB variant='filled' loading loadingText='loading' onPress={() => {}}>
          Loading
        </RNB>
        <RNB variant='filled' loading endIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon right
        </RNB>
      </View>

      <View style={styles.row}>
        <RNB variant='outlined' onPress={() => {}}>Default</RNB>
        <RNB variant='outlined' onPress={() => {}}>Custom</RNB>
        <RNB variant='outlined' disabled onPress={() => {}}>
          Disabled
        </RNB>
        <RNB variant='outlined' startIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon
        </RNB>
        <RNB variant='outlined' loading onPress={() => {}}>
          Loading
        </RNB>
        <RNB variant='outlined' endIcon={<Icon source={'../assets/icon.png'} />} onPress={() => {}}>
          Icon right
        </RNB>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginVertical: 12,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'stretch'
  },
});

export default Button;
