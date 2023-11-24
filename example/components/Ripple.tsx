import { Ripple as OriginRipple } from '@rnmu/theme';
import { Text, View } from 'react-native';

const Ripple = () => {
    return (
        <OriginRipple>
            <View style={{width: 200, height: 200, backgroundColor: 'red'}}></View>
        </OriginRipple>
    )
}

export default Ripple